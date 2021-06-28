import { navigate, customDispatcher, pipeMiddleware }  from 'olive-spa'
import { ACTIONS }                              from '../env'
import { fxDevLogger }                          from './fx/fxDevLogger'
import { fxNavigate }                           from './fx/fxNavigate'
import { Player }                               from '../models/player'
import { rxJumboSwitch }                        from './rx/rxJumboSwitch'
import { rxNavigate }                           from './rx/rxNavigate'
import { rxClientChoose }                       from './rx/rxClientChoose'
import { fxSocketEvents }                       from './fx/fxSocketEvents'
import { rxWssConnected }                       from './rx/rxWssConnected'
import { rxWssDisconnected }                    from './rx/rxWssDisconnected'
import { fxCheckId }                            from './fx/fxCheckId'
import { fxStoreId }                            from './fx/fxStoreId'
import { rxCheckIdSuccess }                     from './rx/rxCheckIdSuccess'
import { fxRequestRooms }                       from './fx/fxRequestRooms'
import { rxGotRooms }                           from './rx/rxGotRooms'
import { fxCreateGame }                         from './fx/fxCreateGame'
import { io }                                   from 'socket.io-client'

const SOCKET_URL = 'http://localhost:3000' 

export const CONNECT_STATE = {
    connected: 'ok',
    disconnected: '!',
    unknown: '-'
}

export const WALLET_STATUS = {
    not_connected: 'none',
    connected: 'connected'
}

export const CLIENT_SOCKET = io(SOCKET_URL) 

const DEFAULT = {
    path: '/', 
    loginStatus: WALLET_STATUS.not_connected,
    home: {
        jumboPanel: 0,
    },
    gamestate: {
        client: new Player('Client'),
        opponent: {},
        turnHistory: [],
    },
    editor: {
        title: '<title>',
        imgUrl: 'https://picsum.photos/500/700',
        components: [],
        curPts: 0,
        maxPts: 21 //for determining max effects
    },
    connected: CONNECT_STATE.unknown,
    lobby: {
        rooms: [],
        inProg: []
    }
}

const rx = (model, [k, data]) => 
    k === ACTIONS.TRY_NAVIGATE      ? rxNavigate(model, data)
:   k === ACTIONS.JUMBO_SWITCH      ? rxJumboSwitch(model, data)
:   k === ACTIONS.CLIENT_CHOOSE     ? rxClientChoose(model, data)
:   k === ACTIONS.WSS_CONNECTED     ? rxWssConnected(model, data)
:   k === ACTIONS.WSS_DISCONNECTED  ? rxWssDisconnected(model)
:   k === ACTIONS.CHECK_ID_SUCCESS  ? rxCheckIdSuccess(model, data)
:   k === ACTIONS.GOT_ROOMS         ? rxGotRooms(model, data)
:   k === ACTIONS.UPDATE_LOBBY      ? {...model, lobby: { ...model.lobby, rooms: data}}
:   /*default*/                       model

//add middleware here. (model, action) => action
const pipeline = pipeMiddleware(
    fxDevLogger,
    fxNavigate,
    fxSocketEvents,
    fxCheckId,
    fxStoreId,
    fxRequestRooms,
    fxCreateGame
)

//add pipeline when we have side effects to pipe.
export const store = customDispatcher({id: 'MainDispatcher', model:DEFAULT, reducer: rx, mw: pipeline})

