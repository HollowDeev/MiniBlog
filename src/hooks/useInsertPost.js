import { useEffect, useReducer, useState } from 'react'

import  { db } from "../firebase/config"   
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null
}

const insertReducerFunction = (state, action) => {
    switch(action.type){
        case 'LOADING':
            return {loading: true, error: null}
        case "INSERTED_POST":
            return {loading: false, error: null}
        case 'ERROR':
            console.log(action.payload)
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useInsertPost = (docCollection) => {
    
    const [cancelled, setCancelled] = useState(false)

    const [state, dispatch] = useReducer(insertReducerFunction, initialState)

    const checkCancelBeforeDispatch = (action) => {

        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertPost = async (post) => {
        try {
            

            checkCancelBeforeDispatch({
                type: "LOADING",
            })

            const newPost = { ...post, createdAt: Timestamp.now() }
            const insertedPost = await addDoc(
                collection(db, docCollection),
                // eslint-disable-next-line no-undef
                newPost
            )

            checkCancelBeforeDispatch({
                type: "INSERTED_POST",
                payload: insertedPost
            })

        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }


    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    }, [])

    return {insertPost, state}
}