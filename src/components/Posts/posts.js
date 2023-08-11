
import { PostCard } from "../PostCard/postCard";
import './post.css'

export const Posts = ({ posts }) => (
  <div className='posts'>
    {posts.map(post => (
      <PostCard
        key={post.id}
        post={post}
      />
    ))}
  </div>
)

