import React, {createContext, useEffect} from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config";
import { apiLogin, getProfile } from "../api";
import { ERRORS } from "../api/utils/errors.enum";
export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [user, setUser] = useState({});
    
    const login = async (user) => {
        setIsLoading(true)
        try {
            const {data} = await apiLogin(user)
            console.log(data)
            if(data.token && data.token !== null) {
                AsyncStorage.setItem('userToken', data.token)
            }
        } catch(e) {
            console.log("error" +e)
        }   
        setIsLoading(false)
    }

    const getUserProfile = async () => {
        //setIsLoading(true)
        try {
            const token = await AsyncStorage.getItem('userToken');
            const {data} = await getProfile(token);
            console.log(data)    
            setUser(data)
            //setIsLoading(false)
        } catch(e) {
            console.log('I GET AN ERROR')
            checkApiError(e)
            //setIsLoading(false)
        }
    }

    function checkApiError(error) {
        console.log('CHECK ERROR')
        console.log(error.message)
        if(error.message == ERRORS.JWT_EXPIRED) {
            console.log("LOGOUT")
            return logout();
        }
        throw error;
    }

    const logout = () => {
        setIsLoading(true)
            setUserToken(null)
            setUser({})
            AsyncStorage.removeItem('userToken')
            AsyncStorage.removeItem('user')
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            let userToken = await AsyncStorage.getItem('userToken')
            setUserToken(userToken);
        }catch(e) {
            console.log('isLoggedIn Error')
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, user, getUserProfile, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}