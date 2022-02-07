// @ts-nocheck
import Link from 'components/Elements/Link'
import Image from 'next/image'
import PostFooter from './PostFooter'

export default function PostGrid ({ posts }) {
  // console.log(posts)
  if (posts.length === 0) {
    return (
      <div className="no-results">
        <div className="flex-center">No posts here yet.</div>
      </div>
    )
  }
  return (
    <div className="post-grid">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

function PostCard({ post }) {
  // Don't show comments in the post card footer
  const { comments, ...postWithoutComments } = post
  
  return (
    <div className={`post-card-box ${post.tags.length == 0 ? 'no-tags' : ''}`}>
      <Link className="thumbnail" href={post.url}>
        {post.thumbnail && <Image src={post.thumbnail} width={320} height={180} layout="responsive" />}
        {post.draft && <div className="draft">Draft</div>}
      </Link>
      <div className="description">
        <Link className="title" href={post.url}>
          {post.title}
        </Link>
        <div className="summary">{post.description}</div>
      </div>
      {post.tags.length && <PostFooter post={postWithoutComments} />}
      {/* Footer */}
      {/* {post.tags.length ? (
        <div className="post-footer">
          <div className="tags">
            {post.tags.map((tag) => (
              <Link className="tag" key={tag.slug} href={`/tag/${tag.slug}`}>
                {tag.name}
              </Link>
            ))}
            <div className="clearfix" />
          </div>
        </div>
      ) : null} */}
    </div>
  )
}
