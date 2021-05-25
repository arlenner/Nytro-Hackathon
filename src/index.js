import { html, navigate } from 'olive-spa'
import { store } from './store'

//components
import { MyComponent } from './my-component'

//app definition
const App = () =>
    html()
        .use(store)
        .router({
            '/': MyComponent
        })

//app entry
App().mount('root')
navigate('/')