

export const fxDevLogger = (model, action) => {
    console.log(`Processing action [${action[0]}]${action[1] ? ` with data ${JSON.stringify(action[1], undefined, 2)}` : '.'}`)
    return action
}