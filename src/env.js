//App Data Goes Here

//tag route names below as string literal consts
export const 
            HOME_RT     = '/home',
            LIB_RT      = '/library',
            CREATE_RT   = '/create',
            PLAY_RT     = '/play' 

//add route names to this array
export const ROUTES = [
    HOME_RT, 
    PLAY_RT,
    LIB_RT, 
    CREATE_RT
]

export const ACTIONS = {
    //SPA NAVIGATION ---------------------------------
    TRY_NAVIGATE:   'Try Navigate',
    NAVIGATE:       'Navigate',

    //HOME SCREEN ACTIONS ----------------------------
    JUMBO_SWITCH:   'Switch Jumbotron',

    //GAME ACTIONS -----------------------------------
    CLIENT_READY:       'Client Ready',
    CLIENT_CHOOSE:      'Client Choice',
    OPP_CHOOSE:         'Opponent Choice',
    

}

//other constant data can get put in here
export const DATA = {}