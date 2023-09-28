import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login, error: authError, loading } = useAuthentication()

    useEffect(() => {
        if(authError) {
            setError(authError)
        }
    }, [authError])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')

        const user = {
            email,
            password
        }

        const res = await login(user)
    }

  return (
    <div>
      <h1>Entre para postar</h1>
        <p>Entre para poder compartilhar suas historias</p>
        <form>
            <label>
                <span>Email:</span>
                <input 
                    type="text" 
                    name='email' 
                    required 
                    placeholder='Qual o seu email?'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>Senha:</span>
                <input 
                    type="password" 
                    name='password' 
                    required 
                    placeholder='Crie uma senha'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            
            {error && <p className='error'>{error}</p>}
            {loading ? 
                <button className='btn' disabled >
                    Processando...
                </button> 
                : 
                <button className='btn' onClick={handleSubmit}>Entrar</button> }
        </form>
    </div>
  )
}
