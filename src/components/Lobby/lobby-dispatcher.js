import { customDispatcher, pipeMiddleware } from "olive-spa";
import { html } from "olive-spa/dist/html/html";
import { GLOBAL_SOCKET as socket } from "../../env";


export const UPDATE_LOBBY   = 'Update Lobby',
             TRY_JOIN_GAME  = 'Try Join Game',
             CREATE_GAME    = 'Create Game',
             WAIT_FOR_GAME  = 'Wait For Game',
             REQUEST_ROOMS  = 'Request Rooms'

const model = {
    rooms: []
}

const reducer = (model, [k, data]) => 
    model


const fxLobbyLogger = (model, action) => {
    const [k, data] = action
    console.log(`LobbyDispatcher processing action [${k}]${data ? ` with data ${JSON.stringify(data, null, 2)}` : ''}`)
    return action
}

const fxRequestRooms = (model, action) => {
    const [k, data] = action
    if(k === REQUEST_ROOMS) {
        socket.emit('request-rooms')
    }

    return action
}

const mw = pipeMiddleware(fxLobbyLogger, fxRequestRooms)

export const LobbyDispatcher = customDispatcher({
    id: 'LobbyDispatcher',
    model,
    reducer,
    mw
})