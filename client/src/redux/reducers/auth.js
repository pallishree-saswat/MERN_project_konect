import { Result } from 'express-validator';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,

  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    forgotPasswordErrors: {},
    forgotPasswordHelperFlag: false,
    updatePasswordErrors: {}
    
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:  
        localStorage.setItem('token', payload.token)
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };

       case REGISTER_FAIL:
      case AUTH_ERROR:
       case LOGIN_FAIL: 
       case LOGOUT:
         case ACCOUNT_DELETED:
         localStorage.removeItem('token')
         return{
           ...state,
           token:null,
           isAuthenticated:false,
           loading:false,
        
         }

      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case "ACCOUNT_DELETED":
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
        case "SET_FORGOT_PASSWORD_ERRORS":
          return {
              ...state,
              forgotPasswordErrors: action.payload
          }
      case "SET_FORGOT_PASSWORD_HELPER_FLAG":
          return {
              ...state,
              forgotPasswordHelperFlag: action.payload
          }
          case "SET_UPDATE_PASSWORD_ERROR":
            return {
                ...state,
                updatePasswordErrors: action.payload
            }
       case "ADD_PIC":
         localStorage.setItem("user" , payload.pic )
         return {
           ...state,
           ...payload,
           loading:false
         }
      default:
        return state;
    }
  }