import Layout from 'components/Layout/Layout'
import PostFeed from 'components/Posts/PostFeed'
import SubscribeBox from 'components/CTAs/SubscribeBox'
import AdBoxes from 'components/CTAs/AdBoxes'
import Subnav from 'components/Layout/Subnav'
import Pagination from 'components/Posts/Pagination'
import Head from 'next/head'

const TITLE = 'Storytelling and Improv for Game Masters'
const DESCRIPTION = 'Storytelling, improvisation, and roleplay advice for Game Masters.'
const THUMBNAIL = 'https://rpgadventures.io/img/articles-social.png'

export default function browse({ posts, postCount, tags }) {
  return (
    <Layout subnav={<Subnav tags={tags}/>}>
      <PostFeed posts={posts} />
      <Pagination postCount={postCount}/>
      <SubscribeBox />
      <AdBoxes/>
      <br />
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} key="ogtitle" />
        <meta property="og:description" content={DESCRIPTION} key="ogdesc" />
        <meta name="twitter:title" content={TITLE} key="ogtitle" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta property="og:image" content={THUMBNAIL} key="ogimage" />
        <meta name="twitter:image" content={THUMBNAIL} />
      </Head>
    </Layout>
  )
}


import { getPosts } from 'backend/get-posts'
import tags from 'backend/json/articles/allTags.json'
import config from 'config.json'

export async function getServerSideProps({ req, query }) {
  const { sort, tag, search } = query
  const { posts, postCount } = await getPosts({
    category: 'articles',
    searchString: search,
    tagSlug: tag,
    sort: sort,
    skip: config.postsPerPage * (parseInt(query.page?.toString()) - 1 || 0),
    take: config.postsPerPage,
  })
  return { props: { posts, postCount, tags } }
}
