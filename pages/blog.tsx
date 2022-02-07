import Layout from 'components/Layout/Layout'
import PostFeed from 'components/Posts/PostFeed'
import SubscribeBox from 'components/CTAs/SubscribeBox'
import AdBoxes from 'components/CTAs/AdBoxes'
import Subnav from 'components/Layout/Subnav'
import Pagination from 'components/Posts/Pagination'

export default function browse({ posts, postCount, tags }) {
  return (
    <Layout subnav={<Subnav tags={tags}/>}>
      <PostFeed posts={posts} />
      <Pagination postCount={postCount}/>
      <SubscribeBox />
      <AdBoxes/>
      <br/>
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
