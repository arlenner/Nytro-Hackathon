import { html } from 'olive-spa'
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
            [UPDATE_LOBBY]: (hxa, {lobby}) => 
                hxa.replace(
                    html()
                        .ul()
                        .class('rooms-list')
                        .nest()
                            .each(lobby.rooms, (hx, room) => 
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
        .class('host-btn')
        .text('New Game...')
        .on('click', hx => hx.dispatch(CREATE_GAME, client))


export const Lobby = (model, rooms) => 
    html()
        .div()
        .class('rooms-container')
        .subscribe({
            [UPDATE_LOBBY]: (hx, { lobby }) => hx.replace(Lobby(model, lobby.rooms)),

            [WAIT_FOR_GAME]: hx => hx.delete()
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
            [UPDATE_LOBBY]: (hx, { lobby }) => hx.replace(Lobby(model, lobby.rooms))
        })            
        .tap(hx => hx.dispatch(REQUEST_ROOMS))
            