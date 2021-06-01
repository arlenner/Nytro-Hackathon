/**
 * Modifies `target`'s `stat` by `value` each turn.
 */
export const ModPerTurn = (stat, target, value) => ({
    tag: 'ModPerTurn',
    stat,
    target,
    value
})