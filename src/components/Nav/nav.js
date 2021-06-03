import { html, Html } from 'olive-spa'
import { getPublicKey } from '../../../session/publicKey'
import { ACTIONS, ROUTES } from '../../env'
import { store, WALLET_STATUS } from '../../store/store'
import './nav.css'



const AddressForm = () => {
    let address

    return html()
        .div()
            .class('lock-open')
            .subscribe({
                [ACTIONS.OPEN_LOCK]: hx => hx.replace(Lock()),
                [ACTIONS.WALLET_CONNECTED]: hx => hx.delete()
            })
            .open()
            .section().open()
                .button().class('close-x').text('X')
                    .on('click', hx => hx.dispatch(ACTIONS.OPEN_LOCK))
                .h1().class('form-h1').text('Enter your Public NYZO Identifier:')
                .input().placeholder('id__00000000000000000000000000000000000000000000000').type('text')
                    .on('input', hx => hx.dispatch(ACTIONS.CHECK_ID, (address=hx.value(),hx.value())))
                .button().class('submit').text('---').disabled()
                    .on('click', hx => hx.dispatch(ACTIONS.WALLET_CONNECTED))
                    .subscribe({
                        [ACTIONS.CHECK_ID_SUCCESS]: hx => hx.text('CONNECT').removeAttr('disabled'),
                        [ACTIONS.CHECK_ID_FAIL]: hx => hx.disabled().text('---')
                    })
}

const Lock = () => 
    html()
        .div().class('lock')
            .on('click', hx => hx.dispatch(ACTIONS.OPEN_LOCK))
            .subscribe({
                [ACTIONS.WALLET_CONNECTED]: hx => hx.delete(),
                [ACTIONS.OPEN_LOCK]: hx => hx.replace(AddressForm())
            })


const NavLocked = () => 
    html()
        .nav().open()
            .each(ROUTES, (hx, rt) => 
                hx.a().class('disabled-link')
                    .css({cursor: 'not-allowed'})
                    .text(rt.slice(1).toUpperCase())
                    .href('#')
                    .on(
                        'click', 
                        htmlx => 
                            store.state().loginStatus === WALLET_STATUS.connected 
                                ? htmlx.dispatch(ACTIONS.TRY_NAVIGATE, rt)
                                : htmlx
                    )
                    .subscribe({
                        [ACTIONS.TRY_NAVIGATE]: (hx, {path}) => 
                            rt === path ? hx.class('selected') : hx.removeClass('selected'),
                        [ACTIONS.WALLET_CONNECTED]: (hx) => hx.class('enabled-link').removeClass('disabled-link').css({cursor: 'pointer'}),
                    })
            )
            .concat(Lock())

const NavUnlocked = () => {
    store.state().loginStatus = WALLET_STATUS.connected
    
    return html()
        .nav().open()
            .each(ROUTES, (hx, rt) => 
                hx.a().class('enabled-link')
                    .text(rt.slice(1).toUpperCase())
                    .href('#')
                    .on(
                        'click', 
                        htmlx => 
                            store.state().loginStatus === WALLET_STATUS.connected 
                                ? htmlx.dispatch(ACTIONS.TRY_NAVIGATE, rt)
                                : htmlx
                    )
                    .subscribe({
                        [ACTIONS.TRY_NAVIGATE]: (hx, {path}) => 
                            rt === path ? hx.class('selected') : hx.removeClass('selected'),
                        [ACTIONS.WALLET_CONNECTED]: (hx) => hx.class('enabled-link').removeClass('disabled-link').css({cursor: 'pointer'}),
                    })
            )
}

export const Nav = () => 
    getPublicKey() ? NavUnlocked() : NavLocked()