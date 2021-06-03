import { WALLET_STATUS } from "../store";

export const rxCheckIdSuccess = (model, data) => ({
    ...model, loginStatus: WALLET_STATUS.connected
})