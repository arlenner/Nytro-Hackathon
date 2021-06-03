//App Data Goes Here

export const NYZO_API_URL = 'https://tokens.nyzo.today/api'

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
    TRY_NAVIGATE:       'Try Navigate',
    NAVIGATE:           'Navigate',

    //WALLET ----------------------------------------
    CHECK_ID:           'Check ID',
    CHECK_ID_SUCCESS:   'Check ID Success',
    CHECK_ID_FAILED:    'Check ID Failed',
    TRY_CONNECT_WALLET: 'Try Connect Wallet',
    WALLET_CONNECTED:   'Wallet Connected',
    OPEN_LOCK:          'Open Lock',

    //SOCKET.IO --------------------------------------
    TRY_CONNECT_WSS:    'Try Connect WSS',
    WSS_CONNECTED:      'WSS Connected',
    WSS_DISCONNECTED:   'WSS Disconnected',

    //HOME SCREEN ACTIONS ----------------------------
    JUMBO_SWITCH:       'Switch Jumbotron',

    //GAME ACTIONS -----------------------------------
    CLIENT_READY:       'Client Ready',
    CLIENT_CHOOSE:      'Client Choice',
    OPP_CHOOSE:         'Opponent Choice',
    

}

export const SOCKET_MSG = {

}

//other constant data can get put in here
export const DATA = {}