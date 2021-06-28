import { Player } from '../../models/player'
import { CONNECT_STATE } from '../../store/store'

export const rxWssConnected = (model, data) => ({    
    ...model,
    connected: CONNECT_STATE.connected,
    gamestate: {
        ...model.gamestate,
        client: new Player(data, data)
    }
})