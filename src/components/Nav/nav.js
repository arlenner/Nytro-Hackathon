import { customDispatcher, html, Html } from 'olive-spa'
import { getPublicKey } from '../../../session/publicKey'
import { SHARED_ACTIONS, ROUTES } from '../../env'
import { 
    NavDispatcher,
    TRY_CONNECT_WALLET,
    CHECK_ID,
    CHECK_ID_FAIL,
    CHECK_ID_SUCCESS,
    OPEN_LOCK,
    WALLET_CONNECTED,
    NAVIGATE,
    WAIT_FOR_GAME
} from './nav-dispatcher'
import './nav.css'



const AddressForm = () => 
    html()
        .div()
        .use(NavDispatcher)
        .class('lock-open')
        .subscribe({
            [OPEN_LOCK]: hx => hx.replaceWith(Lock()),

            [WALLET_CONNECTED]: hx => hx.remove()
        })
        .nest()
        
            .section()
            .nest()

                .button()
                .use(NavDispatcher)
                .class('close-x')
                .text('X')
                .on('click', hx => hx.dispatch(OPEN_LOCK))

                .h1()
                .class('form-h1')
                .text('Enter your Public NYZO Identifier:')

                .input()
                .use(NavDispatcher)
                .placeholderAttr('id__00000000000000000000000000000000000000000000000000')
                .typeAttr('text')
                .on('input', hx => hx.dispatch(CHECK_ID, hx.valueAttr()))

                .button()
                .use(NavDispatcher)
                .class('submit')
                .text('---')
                .disabledAttr(true)                    
                .on('click', hx => hx.dispatch(WALLET_CONNECTED, null))
                .subscribe({
                    [CHECK_ID_SUCCESS]: hx => 
                        hx
                        .text('CONNECT')
                        .removeAttr('disabled'),

                    [CHECK_ID_FAIL]: hx => hx.disabledAttr(true).text('---')
                })

const Lock = () => 
    html()
        .div()
        .use(NavDispatcher)
        .class('lock')
        .on('click', hx => hx.dispatch(OPEN_LOCK))
        .subscribe({
            [WALLET_CONNECTED]: hx => hx.remove(),

            [OPEN_LOCK]: hx => hx.replaceWith(AddressForm())
        })


const NavLocked = () => 
    html()
        .nav()
        .nest()
        .each(ROUTES, (hx, rt) => 
            hx
            .a()
            .use(NavDispatcher)
            .class('disabled-link')
            .css({cursor: 'not-allowed'})
            .text(rt.slice(1).toUpperCase())
            .hrefAttr('#')
            .on('click',  hy => hy.dispatch(NAVIGATE, rt))
            .subscribe({
                [NAVIGATE]: (hz, {path}) => 
                    rt === path 
                        ? hz.class('selected') 
                        : hz.removeClass('selected'),

                [WALLET_CONNECTED]: hz => 
                    hz
                    .class('enabled-link')
                    .removeClass('disabled-link')
                    .css({cursor: 'pointer'})
            })
        )
        .concat(Lock())

const NavUnlocked = () => {
    // loginStatus = WALLET_STATUS.connected

    return html()
        .nav()
        .use(NavDispatcher)
        .subscribe({
            [WAIT_FOR_GAME]: hx => hx.class('hide-high')
        })
        .nest()
            .each(ROUTES, (hx, rt) => 
                hx
                .a()
                .use(NavDispatcher)
                .class('enabled-link')
                .text(rt.slice(1).toUpperCase())
                .hrefAttr('#')
                .on(
                    'click', 
                    htmlx => htmlx.dispatch(NAVIGATE, rt)
                )
                .subscribe({
                    [NAVIGATE]: (hx, {path}) => 
                        rt === path 
                            ? hx.class('selected') 
                            : hx.removeClass('selected'),

                    [WALLET_CONNECTED]: (hx) => 
                        hx
                        .class('enabled-link')
                        .removeClass('disabled-link')
                        .css({cursor: 'pointer'})
                })
        )
}

export const Nav = () =>
    html()
        .concat(
            getPublicKey() 
                ? NavUnlocked() 
                : NavLocked()
        )