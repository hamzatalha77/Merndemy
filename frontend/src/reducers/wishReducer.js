import {
  WISH_CREATE_REQUEST,
  WISH_CREATE_SUCCESS,
  WISH_CREATE_FAIL,
  WISH_CREATE_RESET,
} from '../constants/wishConstants'
export const wishCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WISH_CREATE_REQUEST:
      return {
        loading: true,
      }
    case WISH_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        wish: action.payload,
      }
    case WISH_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case WISH_CREATE_RESET:
      return {}
    default:
      return state
  }
}
