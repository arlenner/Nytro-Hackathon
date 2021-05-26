import { navigate, makeStore, pipeMiddleware } from 'olive-spa'
import { ACTIONS } from './env'
import { fxDevLogger } from './fx/fxDevLogger'
import { fxNavigate } from './fx/fxNavigate'
import { rxNavigate } from './rx/rxNavigate'

const DEFAULT = {
    path: '/'
}

//add cases. Use separate functions for each reducer, then compose them here. return passed-in model as default
/*
assuming you have these funcs defined for reducers
Ex:
const rx = (model, [k, data]) =>
        k === ACTIONS.NEXT_BIO      ? rxNextBio(model)
    :   k === ACTIONS.NEXT_PROJ     ? rxNextProject(model)
    :   k === ACTIONS.SELECT_PATH   ? rxSelectPath(model, data)
    :                                 model //default returns original
*/
const rx = (model, [k, data]) => 
    k === ACTIONS.TRY_NAVIGATE  ? rxNavigate(model, data)
:   /*default*/                   model

//add middleware here. (model, action) => action
const pipeline = pipeMiddleware(fxDevLogger, fxNavigate)

//add pipeline when we have side effects to pipe.
export const store = makeStore(DEFAULT, rx, pipeline)

