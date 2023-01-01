import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
} from "../constants/userConstant";

// user login actions
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    console.log("data", data);
    !data.error
      ? dispatch({
          type: LOGIN_SUCCESS,
          payload: data.user,
        })
      : dispatch({ type: LOGIN_FAIL, payload: data.message });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
// user registration actions
export const register = (userData) => async (dispatch) => {
  // console.log(Object.fromEntries(userData));
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/register`,
      Object.fromEntries(userData),
      config
    );
    // console.log("data", data);
    !data.error
      ? dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
      : dispatch({
          type: REGISTER_USER_FAIL,
          payload: data.message,
        });
    // dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
