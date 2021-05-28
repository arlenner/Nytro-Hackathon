import { html, navigate } from 'olive-spa'
import { store } from './store'
import { CREATE_RT, HOME_RT, LIB_RT, PLAY_RT } from './env'
//components
import { Nav } from './components/Nav/nav'
import { Lib } from './components/Library/library'
import { Create } from './components/Create/create'
import { Home } from './components/Home/home'
import './style.css'
import { buildKey } from './nyzo-wallet'
import { NyzoKey } from './nyzo-wallet/NyzoKey'
import { Play } from './components/Play/play'

// import * as buffer from 'buffer'
// window.Buffer = buffer

//app definition
const App = () =>
    html()
        .use(store)
        .concat(Nav())
        .router({
            '/':            Home,
            [HOME_RT]:      Home,
            [LIB_RT]:       Lib,
            [CREATE_RT]:    Create,
            [PLAY_RT]:      Play
        })

//app entry
App().mount('root')
navigate(HOME_RT)

window.buildKey = buildKey
window.NyzoKey = NyzoKey