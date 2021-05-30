
/**
 * Player data model constructor
 * @param {string} name 
 */
export const Player = name => ({
    name,
    stats: {
        ec: 2,
        mi: 2,
        so: 2
    }
})