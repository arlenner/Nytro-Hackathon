export const rxClientChoose = (model, data) => ({
    ...model,
    gamestate: {
        ...model.gamestate,
        client: {
            ...model.gamestate.client,
            currentSelection: data  
        }
    }
})