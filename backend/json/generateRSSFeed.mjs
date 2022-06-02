// https://ashleemboyer.com/blog/how-i-added-an-rss-feed-to-my-nextjs-site
// https://github.com/jpmonette/feed
import moment from 'moment'
import { Feed } from 'feed'
import config from '../../config.json' assert { type: 'json' }
import articles from './articles/posts.json'
import adventures from './adventures/posts.json'
import ideas from './ideas/posts.json'
import { writeFileSync } from 'fs'

export const generateRSSFeed = () => {
  let allPosts = [...articles, ...adventures, ...ideas]
  allPosts = sortByDate(allPosts)
  console.log(`Generating rss feed for ${allPosts.length} posts`)
  const author = {
    name: 'lumenwrites',
    // email: 'lumenwrites@gmail.com',
    // link: 'https://twitter.com/lumenwrites',
  }

  // Construct a new Feed object
  const feed = new Feed({
    title: config.title,
    description: config.description,
    id: config.domain,
    link: config.domain,
    language: 'en',
    feedLinks: {
      rss2: `${config.domain}/rss.xml`,
    },
    author,
  })

  // Add each article to the feed
  allPosts.forEach((post) => {
    const url = `${config.domain}/post/${post.slug}`
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.description,
      content: post.html,
      author: [author],
      date: post.date ? new Date(post.date) : new Date('2020-01-01'),
    })
  })
  // Write the RSS output to a public file, making it
  // accessible at ashleemboyer.com/rss.xml
  writeFileSync('public/rss.xml', feed.rss2())
}

function sortByDate(posts) {
  let sortedPosts = [...posts]
  sortedPosts.sort((a, b) => {
    let adate = a.date ? new Date(a.date) : new Date('2001-01-01')
    let bdate = b.date ? new Date(b.date) : new Date('2001-01-01')
    return moment(bdate).diff(moment(adate))
  })
  return sortedPosts
}
