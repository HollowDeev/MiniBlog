import { Link } from 'react-router-dom'
import styles from './Post.module.css'

export default function Post({post}) {
  return (
    <div className={styles.post}>
        <img src={post.image} alt={post.title} />
        <h1>{post.title}</h1>
        <p className={styles.createdBy}>{post.createdBy}</p>
        <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}
