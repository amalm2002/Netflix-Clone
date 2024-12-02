import React,{ createContext,useContext,useState} from "react";
import { logout } from "../firebase";

const AuthContext =createContext()

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);

    const loginUser=(userdata)=>{
        setUser(userdata)
    }

    const logoutUser= async ()=>{
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <AuthContext.Provider value={{user,loginUser,logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)

