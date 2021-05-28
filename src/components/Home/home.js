import { html } from 'olive-spa'
import './home.css'

const panels = [
    { 
        title: 'NFTs Are On Their Way to Nyzo',
        content: 'A digital, community developed trading card game is trying to make NFTs on the Nyzo chain a thing.'
    },
    // {
    //     title: 'Join a Community Developed Experience!',
    //     content: 'Those who invest in digital trading cards may end up holding a valuable asset...'
    // },
    // {
    //     title: 'Build to Suit Your Style',
    //     content: 'Customize everything from the effects that a card has when played, to the title and background image.'
    // }
]

const Jumbotron = () => 
    html()
        .div().class('jumbo').open()
            .each(panels, (hx, {title, content}) =>
                hx.div().class('jumbo-panel').open()
                    .h2().text(title)
                    .h4().text(content)
            )
            .concat(Dots())
                                                
const Dots = () => 
    html()
        .div().class('dot-container').open()
            .range(panels.length, hx => hx.div().class('dot'))

export const Home = () => 
    html()
        .section().class('outlet-main').open()
            .concat(Jumbotron())