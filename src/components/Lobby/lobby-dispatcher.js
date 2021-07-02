import { customDispatcher, pipeMiddleware } from "olive-spa";

export const UPDATE_LOBBY   = 'Update Lobby',
             TRY_JOIN_GAME  = 'Try Join Game',
             CREATE_GAME    = 'Create Game',
             WAIT_FOR_GAME  = 'Wait For Game',
             REQUEST_ROOMS  = 'Request Rooms'

const model = {
    games: []
}

//reducer always has this format
//const myReducer = (model, [k, data]) =>
//  k === ACTION ? reducerForAction(k, data)
//: /*else*/       model
const reducer = (model, [k, data]) => 
    model

const fxLobbyLogger = (model, action) => {
    const [k, data] = action
    console.log(`LobbyDispatcher processing action [${k}]${data ? ` with data ${JSON.stringify(data, null, 2)}` : ''}`)
    return action
}

const mw = pipeMiddleware(fxLobbyLogger)

export const LobbyDispatcher = customDispatcher({
    id: 'LobbyDispatcher',
    model,
    reducer,
    mw
})