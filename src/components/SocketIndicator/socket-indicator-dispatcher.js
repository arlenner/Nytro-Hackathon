import { customDispatcher } from "olive-spa"

export const WSS_CONNECTED = 'WebSocket Connected'
export const WSS_DISCONNECTED = 'WebSocket Disconnected'

export const SocketIndicatorDispatcher = customDispatcher({
    id: 'SocketIndicatorDispatcher'
})

