export const rxJumboSwitch = (model, data) => ({
    ...model,
    home: {
        jumboPanel: (++model.home.jumboPanel) % 3
    }
})