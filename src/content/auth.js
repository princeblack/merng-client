import React, { useReducer, createContext } from "react";
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null
}
if (localStorage.getItem("jwtToken")){
   const decodeToken = jwtDecode(localStorage.getItem("jwtToken"));

   if(decodeToken.exp * 1000 < Date.now()){
     localStorage.removeItem('jwtToken')
   }else{
     initialState.user = decodeToken;
   }
}
const AuthContent = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = (userData) => {
    localStorage.setItem("jwtToken", userData.token)
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem("jwtToken")
    dispatch({
      type: "LOGOUT",
    });
  };
  return(
      <AuthContent.Provider
        value={{user: state.user, login, logout}}
        {...props}
        />
  )
}

export { AuthContent, AuthProvider}