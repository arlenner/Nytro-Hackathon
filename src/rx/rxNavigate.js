export const rxNavigate = (model, data) => {
    if(data === model.path) return model
    return {
        ...model,
        path: data
    }
}