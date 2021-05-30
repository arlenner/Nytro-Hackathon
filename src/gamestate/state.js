/**
 * Constructor for a Game State. For use with the PDA state machine.
 * @param {string} name string identifier for this State
 * @param {Object} param1 configuration object. define any of `enter`, `exit`, `pause`, `resume`, `update` functions
 */
export function State(name, {
    enter  = logger(`${name} entered.`), 
    exit   = logger(`${name} exited.`),
    pause  = logger(`${name} paused.`),
    resume = logger(`${name} resume.`), 
    update = logger(`${name} update.`)
  } = {}) {
    const subscriptions = []
    const html = {}
    
    this.enter = enter
    this.exit = () => {
        exit.call(this)
        subscriptions.forEach(d => d())
        Object.keys(html).forEach(k => delete html[k])
    }
    this.pause = pause
    this.resume = resume 
    this.update = update
    this.subscribe = function(fn) {
        subscriptions.push(fn())
    }
    
    //inspired by react hooks
    this.useContext = (init) => {
        let internal = deepCopy(init)
        const setter = value => {
            internal = deepCopy(value)
        }
        const getter = () => {
            return internal
        }
        return [getter, setter]
    }
    
    this.useReducer = (init, rx) => {
        let internal = deepCopy(init)
        const view = () => internal
        const disp = action => internal = rx(internal, action)
        return [view, disp]
    }
    
    this.useEffect = fn => {
        this.subscribe(fn)
    }
    
    this.useHtml = sel => {
        if(html[sel]) return html[sel]
        const el = document.querySelector(sel)
        html[sel] = el
        return this.useHtml(sel)
    }
}