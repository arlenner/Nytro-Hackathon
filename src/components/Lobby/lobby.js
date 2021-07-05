import { html } from 'olive-spa'
import { PlayDispatcher } from '../Play/play-dispatcher'
import { LobbyDispatcher, TRY_JOIN_GAME, UPDATE_LOBBY, CREATE_GAME, REQUEST_ROOMS, WAIT_FOR_GAME } from './lobby-dispatcher'
import './lobby.css'

const RoomsList = () => {
    console.log('called rooms list renderer')
    
    return html()
        .h2()
        .text('Available Games:')
        .ul()
        .use(LobbyDispatcher)
        .class('rooms-list')
        .subscribe({
            [UPDATE_LOBBY]: (hx, rooms) => 
                hx.replace(
                    html()
                        .ul()
                        .class('rooms-list')
                        .nest()
                            .each(rooms, (hx, room) => 
                                hx.li()
                                .class('rooms-item')
                                .nest()
                                    .div()
                                    .class('room-host')
                                    .text(room.id)

                                    .button()
                                    .use(LobbyDispatcher)
                                    .class('join-btn')
                                    .text('=>')
                                    .on('click', hx => hx.dispatch(TRY_JOIN_GAME, room))
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
        .use(LobbyDispatcher)
        .class('host-btn')
        .text('New Game...')
        .on('click', hx => hx.dispatch(CREATE_GAME, client))


export const Lobby = rooms => 
    html()
        .div()
        .use(LobbyDispatcher)
        .class('rooms-container')
        .subscribe({
            [UPDATE_LOBBY]: (hx, { rooms }) => hx.replaceWith(Lobby(rooms)),

            [WAIT_FOR_GAME]: hx => hx.remove()
        })
        .nest()
            .concat(
                rooms.length > 0 
                    ? RoomsList() 
                    : RoomsListEmpty()
            )
            .concat(HostButton(PlayDispatcher.state().client))

Lobby.Loader = () =>
    html()
        .div()
        .use(LobbyDispatcher)
        .class('spinner')           
        .subscribe({
            [UPDATE_LOBBY]: (hx, { rooms }) => hx.replaceWith(Lobby(rooms))
        })            
        .tap(hx => hx.dispatch(REQUEST_ROOMS))
            