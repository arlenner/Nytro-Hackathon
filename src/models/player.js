
export function PartialPlayer() {
    this.currentSelection = { key: 'no' }
    this.ready = false
    this.stats = [
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
    ]
    this.cards = []
}

/** 
 * Player data model constructor
 * @param {string} name 
 */
export function Player(name, id) {
    this.socketId = id
    this.name = name
    PartialPlayer.call(this)
}


