import { customDispatcher, html } from 'olive-spa'
import { SHARED_ACTIONS } from '../../env'
import { fxDevLogger } from '../../store/fx/fxDevLogger'
import { JUMBO_SWITCH, HomeDispatcher } from './home-dispatcher'
import './home.css'



const panels = [
    { 
        title: 'NFTs Are On Their Way to Nyzo',
        content: 'A group developing a digital, community-driven trading card game is trying to make NFTs on the Nyzo chain a thing.'
    },
    {
        title: 'Join a Community Developed Experience!',
        content: 'Those who invest in digital trading cards may end up holding a valuable asset...'
    },
    {
        title: 'Build to Suit Your Style',
        content: `Customize everything from the card's effects, to the title and background image. Make it your own with Nyzo.`
    }
]

const JumboPanel = i => {

    const { title, content } = panels[i % panels.length]

    return html() 
        .div()
        .class('jumbo-panel')
        .timer(8000, hx => hx.dispatch(JUMBO_SWITCH, i+1))
        .subscribe({
            [JUMBO_SWITCH]: (hx, i) => hx.replace(JumboPanel(i))
        })
        .nest()

            .h2()
            .class('fade')
            .text(title)
            .timer(500, h2 => h2.removeClass('fade').class('in'))
            .timer(7000, h2 => h2.removeClass('in').class('right'))

            .p()
            .class('fade')
            .text(content)
            .timer(1000, p => p.removeClass('fade').class('in'))
            .timer(7500, p => p.removeClass('in').class('right'))
}

const Jumbotron = i => 
    html()
        .div()
        .class('jumbo')
        .nest()
            .concat(JumboPanel(i))
            

const Dot = i =>
    html()
        .div()
        .class(i === HomeDispatcher.state() ? 'dot-sel' : 'dot')
        .subscribe({
            [JUMBO_SWITCH]: (hx, n) =>
                n === i     ? hx.removeClass('dot').class('dot-sel')
            :   n !== i     ? hx.removeClass('dot-sel').class('dot')
            :                 hx.removeClass('dot-sel').class('dot')
        })

const Dots = () => 
    html()
        .div()
        .class('dot-container')
        .nest()
            .each(panels, (hx, _,  i) => hx.concat(Dot(i)))

export const Home = () => 
    html()  //here's a stupid glitch. If an element has a dispatch function and it is rendered before a dependent of that function, 
            //the late-rendered element will not update on the first update loop. This is fixed here by rendering in reverse and
            //adding 'column-reverse' flex direction to the 'outlet-main' class element. (try reordering Jumbo and Dots - dots updates funny.)
        .section()
        .use(HomeDispatcher)
        .class('outlet-main')
        .css({flexDirection: 'column-reverse'})
        .nest()
            .concat(Dots())
            .concat(Jumbotron(HomeDispatcher.state().panelIndex))