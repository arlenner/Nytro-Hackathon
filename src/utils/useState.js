export const useState = init => {
    let state = init
    let set = value => state = value
    let get = () => state
    return [get, set]
}