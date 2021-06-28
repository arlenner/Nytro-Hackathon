import { navigate } from 'olive-spa'
import { ACTIONS } from "../../env"
import { store } from '../store'
import { html } from 'olive-spa'

/**
 * Side-Effect - Action Splitter type. Dispatches a navigate success action, then does the navigating on the second run
 */
export const fxNavigate = (model, action) => {
    const noop = () => {}
    const [k, data] = action
    const { path } = model

        k === ACTIONS.TRY_NAVIGATE  ? html().dispatch(ACTIONS.NAVIGATE)
    :   k === ACTIONS.NAVIGATE      ? navigate(path, data)
    :                                 noop()

    return action
} 
