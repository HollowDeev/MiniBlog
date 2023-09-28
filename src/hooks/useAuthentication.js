
// eslint-disable-next-line no-unused-vars
import  { db } from "../firebase/config"   

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useEffect, useState } from 'react'

export const useAuthentication = () => {
    const [ error, setError] = useState(null)
    const [ loading, setLoading] = useState(null)

    //* Cleanup
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        } 
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            
            const {user} = await createUserWithEmailAndPassword(
                auth, 
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.name
            })

            setLoading(false)

            return user

        } catch (error) {
            
            let systemErrorMessage 

            if(error.message.includes("Password")){
                systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres'
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "Email já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, tente mais tarde"
                
            }

            setError(systemErrorMessage)
        }

        setLoading(false)
    }

    const logout = () => {

        checkIfIsCancelled()

        signOut(auth)
    }

    useEffect(()=> {
        return () => setCancelled(true)
    }, [])

    return {
        auth, 
        createUser,
        error,
        loading,
        logout
    }
}