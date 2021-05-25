import { navigate, makeStore, pipeMiddleware } from 'olive-spa'
import { ACTIONS } from './env'

const DEFAULT = {
    //default app state data
}

//add cases. Use separate functions for each reducer, then compose them here. return passed-in model as default
/*
assuming you have these funcs defined for reducers
Ex:
const rx = (model, [k, data]) =>
        k === ACTIONS.NEXT_BIO      ? rxNextBio(model)
    :   k === ACTIONS.NEXT_PROJ     ? rxNextProject(model)
    :   k === ACTIONS.SELECT_PATH   ? rxSelectPath(model, data)
    :                                 model
*/
const rx = (model, [k, data]) => model

//add middleware here. (model, action) => action
const pipeline = pipeMiddleware(/*...args*/)

//add pipeline when we have side effects to pipe.
export const store = makeStore(DEFAULT, rx, /*pipeline*/)

