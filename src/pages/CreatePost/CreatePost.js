import { useNavigate } from 'react-router-dom'
import styles from './CreatePost.module.css'
import { useEffect, useState } from 'react'
import { useInsertPost } from '../../hooks/useInsertPost'
import { useAuthValue } from '../../context/AuthContext'


export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  const {user} = useAuthValue()

  const navigate = useNavigate()

  const {insertPost, state} = useInsertPost('posts')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    //* Validar image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError('A imagem precisa ser uma URL')
    }


    //* Criar array de tags
    const tagsArray = tags.split(',').map(
      tag => tag.trim().toLowerCase()
    )


    //* Checar se todos os valores vieram
    if(!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos!')
      return
    }

    if(formError) return


    insertPost({
      title, 
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // navigate('/')
  }

  return (
    <div>
      <h1>Publicar</h1>
      <p>Escreva e compartilhe o seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name='title'
            required
            placeholder='Qual o título do seu post?'
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Imagem:</span>
          <input
            type="text"
            name='urlImage'
            required
            placeholder='Insira a URL da sua imagem'
            onChange={e => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder='O que gostaria de compartilhar?'
            onChange={e => setBody(e.target.value)}
            value={body}
          >
          </textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name='tags'
            required
            placeholder='Insira as tags separadas por vírgula'
            onChange={e => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {state.error && <p className='error'>{state.error}</p>}
        {formError && <p className='error'>{formError}</p>}
        {state.loading ?
          <button className='btn' disabled >
            Processando...
          </button>
          :
          <button className='btn' type="submit">Publicar</button>}
      </form>
    </div>
  )
}
