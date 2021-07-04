import { html } from 'olive-spa'

export const Lib = () => 
    html()
        .section()
        .class('outlet-main')
        .nest()
            .h2()
            .text('this is the Lib component')