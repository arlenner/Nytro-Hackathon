import { CONNECT_STATE } from "../../store/store";

export const rxWssDisconnected = model => ({
    ...model,
    connected: CONNECT_STATE.disconnected
})