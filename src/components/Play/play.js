import { html } from 'olive-spa'
import './play.css'
import { ACTIONS } from '../../env'

const controls = [
    {
        key: 'ec',
        display: 'Economy'
    },
    {
        key: 'mi',
        display: 'Military'
    },
    {
        key: 'so',
        display: 'Society'
    },
]

const getStat = (gs, k) => gs.client.stats.find(x => x.name === k)
const isNoSelection = selection => selection && selection.key && selection.key === 'no'

const ReadyButton = ({client}) => 
    html()
        .button()
            .class('ready')
            .text('Choose...')
            .disabled()
            .on('click', hx => hx.dispatch(ACTIONS.CLIENT_READY))
            .subscribe({
                [ACTIONS.CLIENT_CHOOSE]: (hx) =>
                    isNoSelection(client.currentSelection) ? hx.text('Ready!').removeAttr('disabled') : hx.text('Choose...').attr('disabled')
            })

const InterfaceBar = (gamestate) => 
    html()
        .footer().open()
            .each(controls, (hx, {display, key}) => 
                hx.button().class('btn-ctrl')
                    .on('click', hxa => hxa.dispatch(ACTIONS.CLIENT_CHOOSE, getStat(gamestate, key)))
                    .subscribe({
                        [ACTIONS.CLIENT_CHOOSE]: (hx, {gamestate}) => 
                            gamestate.client.currentSelection.name === key ? hx.class('btn-ctrl-selected')
                        :   /*else*/                                         hx.removeClass('btn-ctrl-selected')
                    })
                    .open()
                        .div().class(key+'-icon', 'btn-bg').open()
                            .div().class('btn-txt').text(`${display} | ${getStat(gamestate, key).value}`)
            )

const HUD = () => 
    html()
        .div().class('hud')

export const Play = ({gamestate}) => 
    html()
        .section().class('outlet-main').open()
            .concat(HUD(gamestate))                                 
            .concat(InterfaceBar(gamestate))
            .concat(ReadyButton(gamestate))