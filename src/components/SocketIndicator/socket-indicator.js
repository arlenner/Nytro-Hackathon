import { customDispatcher, html } from 'olive-spa'
import { SHARED_ACTIONS } from '../../env'
import { WSS_CONNECTED, WSS_DISCONNECTED } from './socket-indicator-dispatcher'
import './socket-indicator.css'



export const SocketIndicator = () =>
    html()
        .div()
        .use(customDispatcher({
            id: 'SocketIndicatorDispatcher'
        }))
        .class('socket-indicator', 'connect-unknown')
        .subscribe({
            [WSS_CONNECTED]: (hx, connected) => 
                hx.text(connected)
                    .class('connect-ok')
                    .removeClass('connect-unknown', 'connect-failed'),

            [WSS_DISCONNECTED]: (hx, connected) =>
                hx.text(connected)
                    .class('connect-failed')
                    .removeClass('connect-unknown', 'connect-ok')
        })