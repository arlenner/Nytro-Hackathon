//App Data Goes Here

export const NYZO_API_URL   = 'https://tokens.nyzo.today/api'
export const SERVER_URL     = 'http://localhost:3000'

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

export const SHARED_ACTIONS = {
    //SPA NAVIGATION ---------------------------------
    TRY_NAVIGATE:       'Try Navigate',
    NAVIGATE:           'Navigate',

    //CREATE -----------------------------------------
    ADD_CARD_COMPONENT: 'Add Card Component',

    //SOCKET.IO --------------------------------------
    TRY_CONNECT_WSS:    'Try Connect WSS',
    WSS_CONNECTED:      'WSS Connected',
    WSS_DISCONNECTED:   'WSS Disconnected',
    //find-game
    TRY_FIND_GAME:      'Try Find Game',
    FOUND_GAME:         'Found Game',
    NO_GAME_FOUND:      'No Game Found',
    TRY_JOIN_GAME:      'Try Join Game',
    JOINED_GAME:        'Joined Game',
    JOIN_GAME_FAIL:     'Join Game Fail',
    CREATE_GAME:        'Create Game',   
    REQUEST_ROOMS:      'Request Rooms',
    GOT_ROOMS:          'Got Rooms', 
    UPDATE_LOBBY:       'Update Lobby',
    WAIT_FOR_GAME:      'Wait For Game',

    //GAME ACTIONS -----------------------------------
    CLIENT_READY:       'Client Ready',
    CLIENT_CHOOSE:      'Client Choice',
    OPP_CHOOSE:         'Opponent Choice',
    

}

export const SOCKET_MSG = {

}

//other constant data can get put in here
export const DATA = {}