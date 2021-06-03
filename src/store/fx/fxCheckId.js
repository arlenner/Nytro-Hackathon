import { html } from 'olive-spa'
import { ACTIONS, NYZO_API_URL } from "../../env"

export const fxCheckId = (model, action) => {
    if(action[0] !== ACTIONS.CHECK_ID) return action

    const id = action[1]
    
    fetch(NYZO_API_URL + '/balances/' +id, {
        mode: 'no-cors',
    })
    .then(res => html().dispatch(res === "Error: Wrong params" ? ACTIONS.CHECK_ID_FAILED : ACTIONS.CHECK_ID_SUCCESS, res))

    return action
} 