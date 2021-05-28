import { html } from 'olive-spa'
import { ACTIONS, ROUTES } from '../../env'
import './nav.css'

export const Nav = () =>
    html()
        .nav().open()
            .each(ROUTES, (hx, rt) => 
                hx.a()
                    .text(rt.slice(1).toUpperCase())
                    .href('#')
                    .on('click', htmlx => htmlx.dispatch(ACTIONS.TRY_NAVIGATE, rt))
            )