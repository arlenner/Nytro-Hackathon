

export const fxDevLogger = (model, action) => {
    console.log(`Processing action ${action[0]}${action[1] ? ` with data ${action[1]}` : '.'}`)
    return action
}