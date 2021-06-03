import { CONNECT_STATE } from '../../store/store'

export const rxWssConnected = model => ({
    ...model,
    connected: CONNECT_STATE.connected
})