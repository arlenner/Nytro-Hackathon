import { html } from 'olive-spa'
import './play.css'
import { ACTIONS } from '../../env'

const controls = [
    {
        key: 'ec',
        display: 'Economy',
        action: ACTIONS.CLIENT_CHOOSE_EC
    },
    {
        key: 'mi',
        display: 'Military',
        action: ACTIONS.CLIENT_CHOOSE_MI
    },
    {
        key: 'so',
        display: 'Society',
        action: ACTIONS.CLIENT_CHOOSE_SO
    },
]

const InterfaceBar = (gamestate) => 
    html()
        .footer().open()
            .each(controls, (hx, {display, key, action}) => 
                hx.button()
                    .text(display)
                    .on('click', hxa => hxa.dispatch(action, gamestate.client[key]))
            )

export const Play = ({gamestate}) => 
    html()
        .section().class('outlet-main').open()
            .concat(InterfaceBar(gamestate))