import { html } from 'olive-spa'

export const Lib = () => 
    html()
        .section().class('outlet-main').open()
            .h2().text('this is the Lib component')