/**
 * Constructor for the Pushdown Automaton state machine. Stores states as a stack.
 * ```js
 *  const pda = new PDA()
 *  pda.push(new State('state A'))  //=> state A entered.
 *  pda.push(new State('state B'))  //=> state A paused. state B entered.
 *  pda.pop()                       //=> state B exited. State A resumed.
 *  pda.pop()                       //=> state A exited. Stack empty.
 * ```
 */
export function PDA() {
    let _state   = null,
        _stack   = [],
        _last    = 0,
        _frameCt = 0,
        _paused  = false,
        _running = false,
        _frameId
    
    this.isPaused = () => _paused
    
    this.isRunning = () => _running
    
    //pause the current process and switch to the pause loop
    this.pause = () => {
        if(this.isPaused()) return
        _state.pause()
        _paused = true
    }
    
    //resume the current process
    this.resume = () => {
    if(!this.isPaused()) return
        _state.resume()
        _paused = false
    }
    
    //push a new state onto the stack
    this.push = s => {
        _state?.pause()
        _stack.push(s)
        _state = s
        _state.enter()
    }
    
    //pop the last state off the stack, calling its exit().
    //if there is a new head state, call its resume()
    this.pop = () => {
        _state.exit()
        _state = _stack.pop()
        _state?.resume()
        if(!_state) {
            console.warn('Nothing left on the stack, stopping PDA.')
            this.stop()
        }
    }
    
    //set the current state without effecting the stack.
    this.set = s => {
        _state?.exit()
        _state = s
        _state.enter()
    }
    
    const pauseloop = _ => {
        if(!_paused) {
            _frameId = requestAnimationFrame(this.start)
            return
        }
        
        _frameId = requestAnimationFrame(pauseloop)
    }
    
    this.getFrame = () => _frameCt
    
    //start the state machine. Whatever process is on top of the stack will begin being updated
    this.start = time => {
        ++_frameCt
        _running = true
        if(_paused) {
            _frameId = requestAnimationFrame(pauseloop)
            return
        }
        
        const delta = time - _last
        _last = time
        if(_frameCt % 30 === 0) {
            console.log('Frame# '+_frameCt, (1000 / delta))
        }
        _state?.update(delta)
        //shut down if stopped in update
        if(!_running) {
            this.stop()
            return
        }
        _frameId = requestAnimationFrame(this.start)
    }
        
    //stop all processes, reset the state machine
    this.stop = () => {
        while(_state) {
            this.pop()
        }
        _state   = null
        _stack   = []
        _last    = 0
        _frameCt = 0
        _paused  = false
        _running = false
        cancelAnimationFrame(_frameId)
    }
}