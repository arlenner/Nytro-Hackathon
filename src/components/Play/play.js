import { html } from 'olive-spa'
import './play.css'

const InterfaceBar = () => 
    html()
        .footer().open()
            .range()

export const Play = () => 
    html()
        .section().class('outlet-main').open()
            .h2().text('This is the Play Component')