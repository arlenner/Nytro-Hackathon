import { navigate } from 'olive-spa'
import { ACTIONS } from "../env"
import { store } from '../store'

/**
 * Side-Effect - Action Splitter type. Dispatches a navigate success action, then does the navigating on the second run
 */
export const fxNavigate = (model, action) => {
    const noop = () => {}
    const [k,] = action
    const { path } = model

        k === ACTIONS.TRY_NAVIGATE  ? store.dispatch([ACTIONS.NAVIGATE])
    :   k === ACTIONS.NAVIGATE      ? navigate(path, model)
    :                                 noop()

    return action
} 
