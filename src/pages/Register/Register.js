import { useAuthentication } from '../../hooks/useAuthentication'
import { useEffect, useState } from 'react'
import styles from './Register.module.css'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const { createUser, error: authError, loading } = useAuthentication()

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')

        if (password !== confirmPassword) {
            setError('As senhas precisam ser iguais')
            console.log(error)
            return
        }

        const user = {
            name,
            email,
            password
        }

        const res = await createUser(user)
        console.log(res)
    }

    return (
        <div className={styles.register_container}>
            <h1>Cadastra-se para postar</h1>
            <p>Crie o seu usuário e compartilhe suas histórias</p>
            <form>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name='name'
                        required
                        placeholder='Qual o seu nome?'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
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
                <label>
                    <span>Confirme a sua senha:</span>
                    <input
                        type="password"
                        name='confirmPassword'
                        required
                        placeholder='Confirme a sua senha'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>
                {error && <p className='error'>{error}</p>}
                {loading ?
                    <button className='btn' disabled >
                        Processando...
                    </button>
                    :
                    <button className='btn' onClick={handleSubmit}>Cadastrar</button>}
            </form>
        </div>
    )
}
