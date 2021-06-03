import { setPublicKey } from "../../../session/publicKey"
import { ACTIONS } from "../../env"

export const fxStoreId = (model, action) => {
    if(action[0] !== ACTIONS.WALLET_CONNECTED) return action

    const id = action[1]

    setPublicKey(id)

    return action
}