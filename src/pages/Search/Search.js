import styles from './Search.module.css'
import useQuery from '../../hooks/useQuery'
import { useFetchPosts } from '../../hooks/useFetchDocuments'
import Post from '../../components/Post/Post'
import { Link } from 'react-router-dom'

export default function Search() {

    const query = useQuery()
    const search = query.get("q")

    const {posts} = useFetchPosts('posts', search)

  return (
    <div className={styles.search_container}>
        <h1>Search</h1>
        <div className={styles.search_noresults}>
            {posts && posts.length === 0 && (
                <>
                    <p>Não foram encontrados posts {search}</p>
                    <Link to='/' className='btn btn-dark'>Voltar</Link>
                </>
            )}
            
            {
                posts && posts.map((post) => (
                    <Post key={post.id} post={post}/>
                ))
            }
        </div>
    </div>
  )
}
