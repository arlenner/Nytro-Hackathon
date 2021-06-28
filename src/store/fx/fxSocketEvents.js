import { ACTIONS } from "../../env"
import { html } from 'olive-spa'
import { CLIENT_SOCKET as socket } from '../store'

export const fxSocketEvents = (model, action) => {

    const [k] = action

    const dispatcher = html()

    if(k === ACTIONS.TRY_CONNECT_WSS) {
        //connect
        socket.on('connect', () => {
            console.log(`Socket client ${socket.id} connected.`)
            dispatcher.dispatch(ACTIONS.WSS_CONNECTED, socket.id)
        })

        socket.on('update-lobby', waitList => {
            dispatcher.dispatch(ACTIONS.UPDATE_LOBBY, waitList)
        })
    }

    return action
}