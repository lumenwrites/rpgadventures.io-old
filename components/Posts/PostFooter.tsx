import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'

export default function PostFooter({ post, isPostCard }) {
  const router = useRouter()
  const showFooter = post.tags.length || post.comments
  if (!showFooter) return null

  // When I'm viewing the post, I want clicking on tag to redirect to /
  let { postSlug, ...baseQuery } = router.query
  let pathname = router.pathname
  if (postSlug) {
    if (post.category === 'adventures') pathname = '/'
    if (post.category === 'articles') pathname = '/blog'
  } 

  return (
    <div className={`post-footer ${isPostCard ? "is-post-card" : ""}`}>
      <div className="tags">
        {post.tags.map((tag) => (
          <button
            className="tag"
            key={tag.slug}
            onClick={() => router.push({ query: { ...baseQuery, tag: tag.slug }, pathname })}
          >
            {tag.name}
          </button>
        ))}
        <div className="right">
          {post.comments && (
            <a href={post.comments} className="tag post-comments" target="_blank" rel="noopener noreferrer">
              {post.comments.includes('twitter') ? (
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              ) : (
                <FontAwesomeIcon icon={['fas', 'comment-alt']} />
              )}
              {!isPostCard ? "Comments" : ""}
            </a>
          )}
        </div>
        <div className="clearfix" />
      </div>
    </div>
  )
}
