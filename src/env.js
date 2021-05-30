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
    //add redux-like action tags here
    TRY_NAVIGATE:   'Try Navigate',
    NAVIGATE:       'Navigate',

    //HOME SCREEN ACTIONS ----------------
    JUMBO_SWITCH:   'Switch Jumbotron',

    //GAME ACTIONS -----------------------
    CLIENT_CHOOSE_EC:   'Client Economy Choice',
    CLIENT_CHOOSE_MI:   'Client Military Choice',
    CLIENT_CHOOSE_SO:   'Client Societal Choice',
    OPP_CHOOSE_EC:      'Opponent Economy Choice',
    OPP_CHOOSE_MI:      'Opponent Military Choice',
    OPP_CHOOSE_SO:      'Opponent Societal Choice',
    

}

//other constant data can get put in here
export const DATA = {}