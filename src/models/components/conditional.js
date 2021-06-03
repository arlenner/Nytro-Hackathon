/**
 * Describes a Conditional effect. If `condition` is met, `components` are used.
 */
export const Conditional = ({target = 'none', stat = 'none', min = 0, max = 0, onChoice = false, onTurnNum = -1}, ...components) => ({
    condition: {
        target, stat, min, max, onChoice, onTurnNum
    },
    components
})