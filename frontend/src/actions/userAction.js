import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
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
    // console.log("data", data);
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

// logout user request
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/logout`);
    // console.log("first", data)
    !data.error
      ? dispatch({ type: LOGOUT_SUCCESS })
      : dispatch({ type: LOGOUT_FAIL, payload: data.message });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// load user request
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(`/api/v1/me`);
    // console.log("data", data);
    !data.error
      ? dispatch({
          type: LOAD_USER_SUCCESS,
          payload: data.user,
        })
      : dispatch({ type: LOAD_USER_FAIL, payload: data.message });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  // console.log(Object.fromEntries(userData));
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/me/update`,
      Object.fromEntries(userData),
      config
    );
    // console.log("data", data);
    !data.error
      ? dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })
      : dispatch({
          type: UPDATE_PROFILE_FAIL,
          payload: data.message,
        });
    // dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Update Profile
export const updatePassword = (passwords) => async (dispatch) => {
  // console.log(Object.fromEntries(userData));
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update`,
      Object.fromEntries(passwords),
      config
    );
    // console.log("data", data);
    !data.error
      ? dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })
      : dispatch({
          type: UPDATE_PASSWORD_FAIL,
          payload: data.message,
        });
    // dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      { email },
      config
    );
    // console.log("data", data);
    !data.error
      ? dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: data.message,
        })
      : dispatch({ type: FORGOT_PASSWORD_FAIL, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reser  password
export const resetPassword = (token, formData) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      { password: formData.get("password") },
      config
    );
    // console.log("data", data);
    !data.error
      ? dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: data.success,
        })
      : dispatch({ type: RESET_PASSWORD_FAIL, payload: data.message });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
