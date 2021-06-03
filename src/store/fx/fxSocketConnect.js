import { ACTIONS } from "../../env"
import { io } from 'socket.io-client'
import { html } from 'olive-spa'
import { store } from "../store"

const URL = 'http://localhost:3000/'

export const fxSocketConnect = (model, action) => {

    const [k] = action

    if(k === ACTIONS.TRY_CONNECT_WSS) {
        const socket = io(URL)

        try {
            socket.on('connect', () => {
                console.log(`Socket client ${socket.id} connected.`)
                html().dispatch(ACTIONS.WSS_CONNECTED)
            })
        } catch {
            html().dispatch(ACTIONS.WSS_DISCONNECTED)
        }
    }

    return action
}