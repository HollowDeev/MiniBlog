/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import {collection, query, orderBy, onSnapshot, where, QuerySnapshot} from 'firebase/firestore'

export const useFetchPosts = (postCollection, search = null, uid = null) => {
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {

        const loadData = async () => {
            if(cancelled) return

            setLoading(true)

            const collectionRef = collection(db, postCollection)

            try {
                
                let q

                if(search){

                    q = await query(collectionRef, where('tagsArray', "array-contains", search), orderBy('createdAt', "desc"))

                } else {

                    q = await query(collectionRef, orderBy('createdAt', 'desc'))

                }

                await onSnapshot(q, (querySnapshot) => {

                    setPosts(
                        querySnapshot.docs.map((post) => ({
                            id: post.id,
                            ...post.data()
                        })) 
                    )
                    
                })

                setLoading(false)

            } catch (error) {
                console.log(error)
                setError(error.message)
                setLoading(false)
            }
        }

        loadData()

    }, [postCollection, search, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {posts, loading, error}
}