export const rxGotRooms = (model, data) => ({
    ...model,
    lobby: {
        ...model.lobby,
        rooms: data
    }
})