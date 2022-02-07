// @ts-nocheck
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'
import PostFooter from './PostFooter'

export function PostCard({ post }) {
  const showFooter = post.tags.length || post.comments
  return (
    <div className={`post-card ${!showFooter ? 'no-tags' : ''}`}>
      <div className="description">
        <Link href={post.url}>
          <h1 className="title">{post.title}</h1>
        </Link>
        {/* <Link className="title" href={post.url}>
          {post.title}
        </Link> */}
        <div className="summary">{post.description}</div>
      </div>
      {showFooter && <PostFooter post={post} />}
    </div>
  )
}

const Browse = ({ posts }) => {
  // console.log(posts)
  if (posts.length === 0) {
    return (
      <div className="no-results">
        <div className="flex-center">No posts here yet.</div>
      </div>
    )
  }
  return (
    <div className="post-feed">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

export default Browse
