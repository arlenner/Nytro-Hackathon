import { customDispatcher, pipeMiddleware } from "olive-spa";
import { html } from "olive-spa/dist/html/html";
import { GLOBAL_SOCKET as socket } from "../../env";
import { PlayDispatcher } from "../Play/play-dispatcher";


export const UPDATE_LOBBY   = 'Update Lobby',
             TRY_JOIN_GAME  = 'Try Join Game',
             CREATE_GAME    = 'Create Game',
             CREATE_SUCCESS = 'Create Game Success',
             CREATE_FAILED  = 'Create Game Failed',
             WAIT_FOR_GAME  = 'Wait For Game',
             REQUEST_ROOMS  = 'Request Rooms'


// // // // // // // // // // // // //
//  REDUCER                         //
// // // // // // // // // // // // //

const model = {
    rooms: [],
    inGame: false
}

const rxCreateSuccess = (model, _) => ({ ...model, inGame: true })

const rxUpdateLobby = (model, data) => ({ ...model, rooms: data })

const reducer = (model, [k, data]) => 
    k === CREATE_SUCCESS    ? rxCreateSuccess(model)
:   k === UPDATE_LOBBY      ? rxUpdateLobby(model, data)
:   /*else*/                  model

// // // // // // // // // // // // //
//  SIDE FX                         //
// // // // // // // // // // // // //

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

const fxCreateGame = (mode, action) => {
    const [k, data] = action
    if(k === CREATE_GAME) {
        socket.emit('create-game', PlayDispatcher.state().client)
        html().dispatch(WAIT_FOR_GAME, null, [LobbyDispatcher, PlayDispatcher])
    }
    return action
}

const mw = pipeMiddleware(fxLobbyLogger, fxRequestRooms, fxCreateGame)

// // // // // // // // // // // // //
//  DISPATCHER                      //
// // // // // // // // // // // // //

export const LobbyDispatcher = customDispatcher({
    id: 'LobbyDispatcher',
    model,
    reducer,
    mw
})