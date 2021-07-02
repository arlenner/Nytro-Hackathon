
import { html } from 'olive-spa/dist/html/html'
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
    console.log(i)
    const { title, content } = panels[i % panels.length]

    return html() 
        .div()
        .use(HomeDispatcher)
        .class('jumbo-panel')
        .timer(8000, hx => hx.dispatch(JUMBO_SWITCH, i+1))
        .subscribe({
            [JUMBO_SWITCH]: (hx, {panelIndex}) => hx.replaceWith(JumboPanel(panelIndex))
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

const Jumbotron = ({panelIndex}) => 
    html()
        .div()
        .class('jumbo')
        .nest()
            .concat(JumboPanel(panelIndex))
            

const Dot = i =>
    html()
        .div()
        .use(HomeDispatcher)
        .class(i === HomeDispatcher.state().panelIndex % panels.length ? 'dot-sel' : 'dot')
        .subscribe({
            [JUMBO_SWITCH]: (hx, {panelIndex}) =>
                panelIndex % panels.length === i    ? hx.removeClass('dot').class('dot-sel')
            :   panelIndex % panels.length !== i    ? hx.removeClass('dot-sel').class('dot')
            :                                         hx.removeClass('dot-sel').class('dot')
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
        .class('outlet-main')
        // .css({flexDirection: 'column-reverse'})
        .nest()
        .concat(Jumbotron(HomeDispatcher.state()))
        .concat(Dots())