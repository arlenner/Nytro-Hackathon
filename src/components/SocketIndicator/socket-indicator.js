import { html } from 'olive-spa'
import { ACTIONS } from '../../env'
import './socket-indicator.css'

export const SocketIndicator = () =>
    html()
        .div()
            .class('socket-indicator', 'connect-unknown')
            .subscribe({
                [ACTIONS.WSS_CONNECTED]: (hx, {connected}) => 
                    hx.text(connected)
                        .class('connect-ok')
                        .removeClass('connect-unknown', 'connect-failed'),

                [ACTIONS.WSS_DISCONNECTED]: (hx, {connected}) =>
                    hx.text(connected)
                        .class('connect-failed')
                        .removeClass('connect-unknown', 'connect-ok')
            })