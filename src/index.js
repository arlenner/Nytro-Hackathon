import { html, navigate } from 'olive-spa'
import { store } from './store/store'
import { SHARED_ACTIONS, CREATE_RT, HOME_RT, LIB_RT, PLAY_RT } from './env'
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


//app definition
const App = () =>
    html()        
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
// navigate('/home')


//TODO: REMOVE THESE BEFORE RELEASE
window.buildKey = buildKey
window.NyzoKey = NyzoKey
window.html = html

