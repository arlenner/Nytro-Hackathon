import { html, navigate } from 'olive-spa'
import { store } from './store'
import { CREATE_RT, HOME_RT, LIB_RT } from './env'

//components
import { MyComponent } from './components/my-component'
import { Nav } from './components/nav'
import { Lib } from './components/library'
import { Create } from './components/create'
import { Home } from './components/home'

//app definition
const App = () =>
    html()
        .use(store)
        .concat(Nav())
        .router({
            '/':            Home,
            [HOME_RT]:      Home,
            [LIB_RT]:       Lib,
            [CREATE_RT]:    Create
        })

//app entry
App().mount('root')
navigate(HOME_RT)