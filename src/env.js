import { customDispatcher, html } from 'olive-spa'
import { io } from 'socket.io-client'
import { CREATE_SUCCESS, LobbyDispatcher, UPDATE_LOBBY } from './components/Lobby/lobby-dispatcher'

//App Data Goes Here

export const NYZO_API_URL   = 'http://localhost:8010/proxy'
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


//SOCKET STUFF
export const GLOBAL_SOCKET = io(SERVER_URL)
GLOBAL_SOCKET.on('update-lobby', (lobby) => html().dispatch(UPDATE_LOBBY, lobby, [LobbyDispatcher]))
GLOBAL_SOCKET.on('created-game', () => html().dispatch(CREATE_SUCCESS, null, [LobbyDispatcher]))


export const SOCKET_MSG = {

}

//other constant data can get put in here
export const DATA = {}