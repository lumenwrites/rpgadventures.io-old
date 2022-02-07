import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/CTAs/SubscribeBox'
import AdBoxes from 'components/CTAs/AdBoxes'
import MDXComponents from 'components/Elements/MDXComponents'
import config from 'config.json'
import PostFooter from 'components/Posts/PostFooter'
import TwitterFooter from 'components/Posts/ImageCaptureFooter'
import ImageCaptureWrappers from 'components/Posts/ImageCaptureWrappers'

export default function Post({ post }) {
  return (
    <Layout>
      <ImageCaptureWrappers post={post}>
        <div className={`post text ${post.category === 'articles' ? 'theme-default' : 'theme-adventure'}`}>
          {post.headerImage && <img className="post-header-image" src={post.headerImage} />}
          <div className="post-header-text">
            <h1>{post.title}</h1>
            {post.subtitle && <h2>{post.subtitle}</h2>}
          </div>
          <MDXRemote {...post.body} components={MDXComponents} />
          {/* <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}
          <PostFooter post={post} />
          <TwitterFooter />
        </div>
      </ImageCaptureWrappers>
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={`${post.title}`} key="ogtitle" />
        <meta name="twitter:title" content={`${post.title}`} key="ogtitle" />
        <meta property="og:description" content={post.description} key="ogdesc" />
        <meta name="twitter:description" content={post.description} />
        {post.social && <meta property="og:image" content={`${config.domain}${post.social}`} key="ogimage" />}
        {post.social && <meta name="twitter:image" content={`${config.domain}${post.social}`} />}
      </Head>
      <AdBoxes />
      <SubscribeBox />
      <RelatedPosts post={post} />
      <br />
    </Layout>
  )
}
import { PostCard } from 'components/Posts/PostFeed'

function RelatedPosts({ post }) {
  if (!post.relatedPosts || !post.relatedPosts.length) return null
  return (
    <div className="related-posts">
      <h2>Related Posts</h2>
      {post.relatedPosts.map((p) => (
        <PostCard key={p.slug} post={p} />
      ))}
    </div>
  )
}

import articles from 'backend/json/articles/posts.json'
import adventures from 'backend/json/adventures/posts.json'
import ideas from 'backend/json/ideas/posts.json'

export async function getStaticProps({ params }) {
  const post = [...articles, ...adventures, ...ideas].find((post) => post.slug == params.postSlug)
  return { props: { post } }
}

export async function getStaticPaths() {
  return {
    paths: [...articles, ...adventures, ...ideas].map((post) => ({
      params: { postSlug: post.slug },
    })),
    fallback: false,
  }
}
