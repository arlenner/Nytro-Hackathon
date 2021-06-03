import { html, navigate } from 'olive-spa'
import { store } from './store/store'
import { ACTIONS, CREATE_RT, HOME_RT, LIB_RT, PLAY_RT } from './env'
//components
import { Nav } from './components/Nav/nav'
import { Lib } from './components/Library/library'
import { Create } from './components/Create/create'
import { Home } from './components/Home/home'
import './style.css'
import { buildKey } from './nyzo-wallet'
import { NyzoKey } from './nyzo-wallet/NyzoKey'
import { Play } from './components/Play/play'
import { SocketIndicator } from './components/SocketIndicator/socket-indicator'

const PARENT = Symbol.for('parent-elem'),
      TARGET = Symbol.for('target-elem')

//polyfill for missing function when I want input's value from the context
html().__proto__.value = function() {
    if(arguments.length > 0) {
        this[TARGET].value = arguments[0]
        return this
    }
    return this[TARGET].value
}

// import * as buffer from 'buffer'
// window.Buffer = buffer

//app definition
const App = () =>
    html()
        .use(store)
        .concat(Nav())
        .concat(SocketIndicator())
        .router({
            '/':            Home,
            [HOME_RT]:      Home,
            [LIB_RT]:       Lib,
            [CREATE_RT]:    Create,
            [PLAY_RT]:      Play
        })

//app entry
App().mount('root')
html().dispatch(ACTIONS.TRY_NAVIGATE, HOME_RT)
html().dispatch(ACTIONS.TRY_CONNECT_WSS)


//TODO: REMOVE THESE BEFORE RELEASE
window.buildKey = buildKey
window.NyzoKey = NyzoKey
window.html = html

