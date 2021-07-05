import { Html, customDispatcher, pipeMiddleware, navigate } from 'olive-spa'
import { html } from 'olive-spa/dist/html/html'
import { setPublicKey } from '../../../session/publicKey'
import { NYZO_API_URL } from '../../env'

export const NAVIGATE           = 'Navigate'
export const TRY_NAVIGATE       = 'Try Navigate'
export const TRY_CONNECT_WALLET = 'Try Connect Wallet'
export const WALLET_CONNECTED   = 'Wallet Connected'
export const OPEN_LOCK          = 'Open Lock'
export const CHECK_ID           = 'Check ID'
export const CHECK_ID_FAIL      = 'Check ID Fail'
export const CHECK_ID_SUCCESS   = 'Check ID Success'
export const WAIT_FOR_GAME      = 'Wait For Game'

const fxNavigate = (model, action) => {
    const [k, data] = action
       
    if(k === NAVIGATE) {
        navigate(data)
    }

    return action
} 

const fxCheckId = (model, action) => {
    const [k, id] = action
    if(k !== CHECK_ID) return action

    fetch(NYZO_API_URL + '/balances/' +id)
    .then(res => res.json())
    .then(json => {
        console.log(json)
        html().dispatch(json !== "Error: Wrong params" ? CHECK_ID_SUCCESS : CHECK_ID_FAIL, json, ['NavDispatcher'])
    })

    return action
}

const fxStoreId = (model, action) => {
    const [k, id] = action
    if(k !== CHECK_ID_SUCCESS) return action

    console.log('storing ID')
    setPublicKey(id)

    return action
}

const fxConnectWallet = (model, action) => {
    if(action[0] !== TRY_CONNECT_WALLET) return

    const hx = Html.from(document.querySelector('.wallet-input'))
    
    return action
}

const reducer = (model, [k, data]) =>
    k === CHECK_ID_SUCCESS ? { ...model, locked: false }
:   k === NAVIGATE         ? { ...model, path: data }
:   /*else*/                 model

const mw = pipeMiddleware(fxNavigate, fxCheckId, fxStoreId)

export const NavDispatcher = customDispatcher({
    id: 'NavDispatcher',
    model: {
        locked: true, 
        path: '/home'       
    },
    reducer,
    mw
})
