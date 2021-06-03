import { navigate, makeStore, pipeMiddleware }  from 'olive-spa'
import { ACTIONS }                              from '../env'
import { fxDevLogger }                          from './fx/fxDevLogger'
import { fxNavigate }                           from './fx/fxNavigate'
import { Player }                               from '../models/player'
import { rxJumboSwitch }                        from './rx/rxJumboSwitch'
import { rxNavigate }                           from './rx/rxNavigate'
import { rxClientChoose }                       from './rx/rxClientChoose'
import { fxSocketConnect }                      from './fx/fxSocketConnect'
import { rxWssConnected }                       from './rx/rxWssConnected'
import { rxWssDisconnected }                    from './rx/rxWssDisconnected'
import { fxCheckId }                            from './fx/fxCheckId'
import { fxStoreId } from './fx/fxStoreId'
import { rxCheckIdSuccess } from './rx/rxCheckIdSuccess'

export const CONNECT_STATE = {
    connected: 'ok',
    disconnected: '!',
    unknown: '-'
}

export const WALLET_STATUS = {
    not_connected: 'none',
    connected: 'connected'
}

const DEFAULT = {
    path: '/',
    loginStatus: WALLET_STATUS.not_connected,
    home: {
        jumboPanel: 0,
    },
    gamestate: {
        client: Player('Client'),
        opponent: Player('Opponent'),
        turnHistory: [],
    },
    editor: {
        title: '<title>',
        imgUrl: '',
        components: [],
        curPts: 0,
        maxPts: 21 //for determining max effects
    },
    connected: CONNECT_STATE.unknown
}

const rx = (model, [k, data]) => 
    k === ACTIONS.TRY_NAVIGATE      ? rxNavigate(model, data)
:   k === ACTIONS.JUMBO_SWITCH      ? rxJumboSwitch(model, data)
:   k === ACTIONS.CLIENT_CHOOSE     ? rxClientChoose(model, data)
:   k === ACTIONS.WSS_CONNECTED     ? rxWssConnected(model)
:   k === ACTIONS.WSS_DISCONNECTED  ? rxWssDisconnected(model)
:   k === ACTIONS.CHECK_ID_SUCCESS  ? rxCheckIdSuccess(model, data)
:   /*default*/                       model

//add middleware here. (model, action) => action
const pipeline = pipeMiddleware(
    fxDevLogger,
    fxNavigate,
    fxSocketConnect,
    fxCheckId,
    fxStoreId
)

//add pipeline when we have side effects to pipe.
export const store = makeStore(DEFAULT, rx, pipeline)

