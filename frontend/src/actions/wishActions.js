import axios from 'axios'
import {
  WISH_CREATE_REQUEST,
  WISH_CREATE_SUCCESS,
  WISH_CREATE_FAIL,
} from '../constants/wishConstants'
import { logout } from './userActions'
export const createWish = (wish) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WISH_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/wish`, wish, config)

    dispatch({
      type: WISH_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: WISH_CREATE_FAIL,
      payload: message,
    })
  }
}
