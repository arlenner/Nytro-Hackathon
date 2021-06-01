import { html } from 'olive-spa'
import { ACTIONS } from '../../env'
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

const JumboPanel = (jumboPanel) => {

    const { title, content } = panels[jumboPanel]

    return html() 
        .div().class('jumbo-panel')
            .timer(8000, hx => hx.dispatch(ACTIONS.JUMBO_SWITCH))
            .subscribe({
                [ACTIONS.JUMBO_SWITCH]: (hx, {home}) => hx.replace(JumboPanel(home.jumboPanel))
            })
            .open()
                .h2().class('fade').text(title)
                    .timer(500, h2 => h2.removeClass('fade').class('in'))
                    .timer(7000, h2 => h2.removeClass('in').class('right'))
                .p().class('fade').text(content)
                    .timer(1000, p => p.removeClass('fade').class('in'))
                    .timer(7500, p => p.removeClass('in').class('right'))
}

const Jumbotron = ({jumboPanel}) => 
    html()
        .div().class('jumbo').open()
            .concat(JumboPanel(jumboPanel))
            

const Dot = (i, jumboPanel) =>
    html()
        .div().class(i === jumboPanel ? 'dot-sel' : 'dot')
            .subscribe({
                [ACTIONS.JUMBO_SWITCH]: (hx, { home }) =>
                    home.jumboPanel === i ? hx.removeClass('dot').class('dot-sel')
                :   home.jumboPanel !== i ? hx.removeClass('dot-sel').class('dot')
                :                           hx.removeClass('dot-sel').class('dot')
            })

const Dots = (jumboPanel) => 
    html()
        .div().class('dot-container').open()
            .each(panels, (hx, _,  i) => hx.concat(Dot(i, jumboPanel)))

export const Home = (model) => 
    html()  //here's a stupid glitch. If an element has a dispatch function and it is rendered before a dependent of that function, 
            //the late-rendered element will not update on the first update loop. This is fixed here by rendering in reverse and
            //adding 'column-reverse' flex direction to the 'outlet-main' class element. (try reordering Jumbo and Dots - dots updates funny.)
        .section().class('outlet-main').css({flexDirection: 'column-reverse'}).open()
            .concat(Dots(model.home.jumboPanel))
            .concat(Jumbotron(model.home))