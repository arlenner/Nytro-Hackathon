import { html } from 'olive-spa'
import './play.css'
import { SHARED_ACTIONS } from '../../env'
import { Lobby } from '../Lobby/lobby'

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
            .class('ready', 'hide-low')
            .text('Choose...')
            .disabled()
            .on('click', (hx) => hx.dispatch(SHARED_ACTIONS.CLIENT_READY))
            .subscribe({
                [SHARED_ACTIONS.CLIENT_CHOOSE]: (hx) =>
                    isNoSelection(client.currentSelection) 
                        ? hx.text('Ready!').removeAttr('disabled') 
                        : hx.text('Choose...').attr('disabled'),

                [SHARED_ACTIONS.WAIT_FOR_GAME]: (hx) => hx.removeClass('hide-low')
            })

const InterfaceBar = (gamestate) => 
    html()
        .footer()
        .class('hide-low')
        .subscribe({
            [SHARED_ACTIONS.WAIT_FOR_GAME]: (hx) => hx.removeClass('hide-low')
        })
        .open()
            .each(controls, (html, {display, key}) => 
                html.button()
                    .class('btn-ctrl')
                    .on('click', (hx) => 
                        hx.dispatch(SHARED_ACTIONS.CLIENT_CHOOSE, getStat(gamestate, key))
                    )
                    .subscribe({
                        [SHARED_ACTIONS.CLIENT_CHOOSE]: (hx, {gamestate}) => 
                            gamestate.client.currentSelection.name === key ? hx.class('btn-ctrl-selected')
                        :   /*else*/                                         hx.removeClass('btn-ctrl-selected')
                    })
                    .open()
                        .div()
                        .class(key+'-icon', 'btn-bg')
                        .open()
                            .div()
                            .class('btn-txt')
                            .text(`${display} | ${getStat(gamestate, key).value}`)
            )

const HUD = () => 
    html()
        .div()
        .class('hud', 'hide-low')
        .subscribe({
            [SHARED_ACTIONS.WAIT_FOR_GAME]: hx => hx.removeClass('hide-low')
        })


export const Play = ({gamestate}) => 
    html()
        .section().class('outlet-main').open()
            .concat(HUD(gamestate))                                 
            .concat(InterfaceBar(gamestate))
            .concat(ReadyButton(gamestate))
            .concat(Lobby.Loader(gamestate))