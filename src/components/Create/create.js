import { html } from 'olive-spa'
import './create.css'

export const Create = () => 
    html()
        .section().class('outlet-main').open()
            .h2().text('this is the Create component')