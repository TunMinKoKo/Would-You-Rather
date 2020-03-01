import { SET_AUTHED_USER, UNSET_AUTHED_USER, GET_AUTHED_USER } from '../actions/authedUser'

export default function authedUser (state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER :
        case GET_AUTHED_USER :
        case UNSET_AUTHED_USER :
            return action.id
        default :
            return state
    }
}