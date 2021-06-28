import { SHARED_ACTIONS } from "../../env"


export const fxDevLogger = (model, action) => {
    const [k, data] = action
    
    if(action[0] === SHARED_ACTIONS.WSS_CONNECTED) {
        console.log(`Processing action [${k}]. Socket ID: ${data.id}.`)
    }
    else console.log(`Processing action [${k}]${data ? ` with data ${JSON.stringify(data, undefined, 2)}` : '.'}`)
    return action
}