import { Html, customDispatcher, pipeMiddleware } from 'olive-spa'
import { NYZO_API_URL } from '../../env'
import { fxDevLogger } from '../../store/fx/fxDevLogger'

export const NAVIGATE           = 'Navigate'
export const TRY_NAVIGATE       = 'Try Navigate'
export const TRY_CONNECT_WALLET = 'Try Connect Wallet'
export const WALLET_CONNECTED   = 'Wallet Connected'
export const OPEN_LOCK          = 'Open Lock'
export const CHECK_ID           = 'Check ID'
export const CHECK_ID_FAIL      = 'Check ID Fail'
export const CHECK_ID_SUCCESS   = 'Check ID Success'

const fxNavigate = (model, action) => {
    const noop = () => {}
    const [k, data] = action
    const { path } = model

        k === TRY_NAVIGATE  ? html().dispatch(NAVIGATE)
    :   k === NAVIGATE      ? navigate(path, data)
    :                         noop()

    return action
} 

const fxCheckId = (model, action) => {
    const [k, id] = action
    console.log(id)
    if(k !== CHECK_ID) return action

    
    fetch(NYZO_API_URL + '/balances/' +id, {
        mode: 'no-cors',
    })
    .then(res => {
        console.log(res)
        html().dispatch(res.status !== 200 ? CHECK_ID_FAIL : CHECK_ID_SUCCESS, res)
    })

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

const mw = pipeMiddleware(fxCheckId, fxNavigate)

export const NavDispatcher = customDispatcher({
    id: 'NavDispatcher',
    model: {
        locked: true, 
        path: '/'       
    },
    reducer,
    mw
})
