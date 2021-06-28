import { html } from 'olive-spa'
import { SHARED_ACTIONS } from '../../env'
import './socket-indicator.css'

const WSS_CONNECTED = 'WebSocket Connected'
const WSS_DISCONNECTED = 'WebSocket Disconnected'

export const SocketIndicator = () =>
    html()
        .div()
        .class('socket-indicator', 'connect-unknown')
        .subscribe({
            [WSS_CONNECTED]: (hx, {connected}) => 
                hx.text(connected)
                    .class('connect-ok')
                    .removeClass('connect-unknown', 'connect-failed'),

            [WSS_DISCONNECTED]: (hx, {connected}) =>
                hx.text(connected)
                    .class('connect-failed')
                    .removeClass('connect-unknown', 'connect-ok')
        })