"use client"

import { createContext } from "react"
import { auth } from "./firebaseConfig"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"

export const authContext = createContext({
    user: null,
    loading: false,
    googleloginHandler: async () => { },
    logout: async () => { },
})

export default function AuthContextProvider({ children }) {
    const [user, loading] = useAuthState(auth)


    const googleProvider = new GoogleAuthProvider(auth)

    const googleloginHandler = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            if (error.code === "auth/popup-closed-by-user") {
                console.log("User closed the popup before completing sign-in.");
            } else {
                console.error(error);
            }
        }
    }

    const logout = () => {
        signOut(auth)
    }

    const values = {
        user,
        loading,
        googleloginHandler,
        logout,
    }

    return < authContext.Provider value={values}> {children}</authContext.Provider >
}