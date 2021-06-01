
/**
 * Player data model constructor
 * @param {string} name 
 */
export const Player = name => ({
    name,
    currentSelection: { key: 'no' },
    stats: [
        {
            name: 'ec',
            display: 'Economy',
            value: 2
        },
        {
            name: 'mi',
            display: 'Military',
            value: 2
        },
        {
            name: 'so',
            display: 'Society',
            value: 2
        },
    ],
    cards: []
})