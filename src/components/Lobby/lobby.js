import { html } from 'olive-spa'
import { getMaxListeners, hasUncaughtExceptionCaptureCallback } from 'process'
import { SHARED_ACTIONS } from '../../env'
import { CLIENT_SOCKET } from '../../store/store'
import { useState } from '../../utils/useState'
import { Spinner } from '../Spinner/spinner'
import './lobby.css'

const RoomsList = () => {
    console.log('called rooms list renderer')
    
    return html()
        .h2()
        .text('Available Games:')
        .ul()
        .class('rooms-list')
        .subscribe({
            [UPDATE_LOBBY]: (hxa, {lobby}) => 
                hxa.replace(
                    html()
                        .ul()
                        .class('rooms-list')
                        .open()
                            .each(lobby.rooms, (hx, room) => 
                                hx.li()
                                .class('rooms-item')
                                .open()
                                    .div()
                                    .class('room-host')
                                    .text(room.id)

                                    .button()
                                    .class('join-btn')
                                    .text('=>')
                                    .on('click', hx => hx.dispatch(ACTIONS.TRY_JOIN_GAME, room))
                            )
                ),
        })
        
    }

const RoomsListEmpty = () => 
    html()
        .h2()
        .text('No games available...')
        .ul()
        .class('rooms-list')
    
const HostButton = (client) =>
    html()
        .button()
        .class('host-btn')
        .text('New Game...')
        .on('click', hx => hx.dispatch(ACTIONS.CREATE_GAME, client))


export const Lobby = (model, rooms) => 
    html()
        .div()
        .class('rooms-container')
        .subscribe({
            [ACTIONS.UPDATE_LOBBY]: (hx, { lobby }) => hx.replace(Lobby(model, lobby.rooms)),

            [ACTIONS.WAIT_FOR_GAME]: hx => hx.delete()
        })
        .open()
            .concat(
                rooms.length > 0 ? RoomsList() : RoomsListEmpty()
            )
            .concat(HostButton(model.client))

Lobby.Loader = model =>
    html()
        .div()
        .class('spinner')           
        .subscribe({
            [ACTIONS.UPDATE_LOBBY]: (hx, { lobby }) => hx.replace(Lobby(model, lobby.rooms))
        })            
        .tap(hx => hx.dispatch(ACTIONS.REQUEST_ROOMS))
            