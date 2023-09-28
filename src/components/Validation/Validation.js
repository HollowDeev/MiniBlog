import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useEffect } from "react"

export default function Validation({children, mode}) {

    const {user} = useAuthValue()
    const navigate = useNavigate()

    useEffect(()=> {
      if(mode === 'notLogged' && user){
        navigate('/')
      } else if(mode === 'logged' && !user){
        navigate('/login')
      }
    }, [user, navigate, mode])

  return (mode === 'logged' && user) || (mode === 'notLogged' && !user) ? children : null
}
