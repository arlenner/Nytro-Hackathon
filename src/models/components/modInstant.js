/**
 * Instantly modify a stat by `value`. `value` can be negative. `target` can be `'self'` or `'other'`.
 */
export const ModInstant = (stat, target, value) => ({
    tag: 'ModInstant',
    stat,
    target,
    value
})