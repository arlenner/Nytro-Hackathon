
import { ACTIONS } from "../../env"
import { CLIENT_SOCKET as socket } from '../store' 
import { html } from 'olive-spa'

export const fxCreateGame = (model, action) => {

    const [k, player] = action

    if(k !== ACTIONS.CREATE_GAME) return action

    socket.emit('create-game', player)
    
    html().dispatch(ACTIONS.WAIT_FOR_GAME)

    return action
}