import { useState } from "react"
import styles from "./Home.module.css"
import { Link } from "react-router-dom"
import { useFetchPosts } from "../../hooks/useFetchDocuments"
import Posts from "../../components/Post/Post"
import Post from "../../components/Post/Post"

export default function Home() {
  const [query, setQuery] = useState('')

  const { posts, loading } = useFetchPosts("posts")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main className={styles.home}>
      <h1>Posts Recentes</h1>
      <form className={styles.search_form}>
        <input
          type="text"
          placeholder="Buscar por tags..."
          onSubmit={handleSubmit}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark" type="submit">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}

        {posts && posts.map((post) => <Post key={post.id} post={post} />)}

        {(posts && posts.length === 0) && (
          <div className={styles.noPosts}>
            <p>Não foram encontrados posts</p>
            <Link to='/posts/create' className="btn">Criar primeiro post</Link>
          </div>
        )}
      </div>
    </main>
  )
}
