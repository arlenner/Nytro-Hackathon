import { html } from 'olive-spa'
import { Lobby } from '../Lobby/lobby'
import { PlayDispatcher, CLIENT_CHOOSE, WAIT_FOR_GAME, CLIENT_READY} from './play-dispatcher'
import './play.css'

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
        .use(PlayDispatcher)
        .class('ready', 'hide-low')
        .text('Choose...')
        .attr('disabled')
        .on('click', (hx) => hx.dispatch(CLIENT_READY))
        .subscribe({
            [CLIENT_CHOOSE]: (hx) =>
                isNoSelection(client.currentSelection) 
                    ? hx.text('Ready!').removeAttr('disabled') 
                    : hx.text('Choose...').attr('disabled'),

            [WAIT_FOR_GAME]: (hx) => hx.removeClass('hide-low')
        })

const InterfaceBar = (gamestate) => 
    html()
        .footer()
        .class('hide-low')
        .subscribe({
            [WAIT_FOR_GAME]: (hx) => hx.removeClass('hide-low')
        })
        .nest()
            .each(controls, (hx, {display, key}) => 
                hx
                .button()
                .class('btn-ctrl')
                .on('click', (hx) => 
                    hx.dispatch(CLIENT_CHOOSE, getStat(gamestate, key))
                )
                .subscribe({
                    [CLIENT_CHOOSE]: (hx, {gamestate}) => 
                        gamestate.client.currentSelection.name === key ? hx.class('btn-ctrl-selected')
                    :   /*else*/                                         hx.removeClass('btn-ctrl-selected')
                })
                .nest()                    
                    .div()
                    .class(key+'-icon', 'btn-bg')
                    .nest()
                        .div()
                        .class('btn-txt')
                        .text(`${display} | ${getStat(gamestate, key).value}`)
            )

const HUD = () => 
    html()
        .div()
        .class('hud', 'hide-low')
        .subscribe({
            [WAIT_FOR_GAME]: hx => hx.removeClass('hide-low')
        })


export const Play = () => {
    const gamestate = PlayDispatcher.state()

    return html()
        .section()
        .class('outlet-main')
        .nest()
            .concat(HUD(gamestate))                                 
            .concat(InterfaceBar(gamestate))
            .concat(ReadyButton(gamestate))
            .concat(Lobby.Loader(gamestate))
}