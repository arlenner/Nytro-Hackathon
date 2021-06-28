import { ACTIONS, SERVER_URL } from "../../env"
import { html } from 'olive-spa'
import { CLIENT_SOCKET as socket } from "../store"



export const fxRequestRooms = (model, action) => {
    if(action[0] !== ACTIONS.REQUEST_ROOMS) return action

    socket.emit('request-rooms')

    return action
}