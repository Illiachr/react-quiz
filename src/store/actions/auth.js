import axios from "axios";
import { USER_AUTH_SUCCESS, AUTH_LOGOUT } from "./actionTypes";


export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        const postUrl = isLogin
                        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAUYCrXubYm18gb93tIN0GFAy8wqGegN8'
                        : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAUYCrXubYm18gb93tIN0GFAy8wqGegN8'

        try {
            const res = await axios.post(postUrl, authData)
            const userData = {
                    idToken: res.data.idToken,
                    localId: res.data.localId,
                    expiresIn: res.data.expiresIn * 1000,
                    expTime: new Date(new Date().getTime() + this.expiresIn)
                }

            localStorage.userData = JSON.stringify(userData)
            dispatch(authSuccess(userData.idToken))
            dispatch(userLogout(userData.expiresIn))
        } catch (e) { console.warn(e); }
    }
}

export function authSuccess(tokenId) {
    console.log(tokenId);
    return {
        type: USER_AUTH_SUCCESS,
        token: tokenId
    }
}

export function userLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time)
    }
}

export function logout() {
    localStorage.removeItem('userData')
    return {
        type: AUTH_LOGOUT
    }
}