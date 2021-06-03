
const NYZO_PUB_KEY = 'nycards-nyzo-public-identifier'

export const setPublicKey = key => sessionStorage.setItem(NYZO_PUB_KEY, key)

export const getPublicKey = () => sessionStorage.getItem(NYZO_PUB_KEY)
