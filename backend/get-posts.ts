import articles from 'backend/json/articles/posts.json'
import adventures from 'backend/json/adventures/posts.json'
import moment from 'moment'
import config from 'config.json'

export function getPosts({ category, tagSlug, searchString, sort, skip, take }) {
  let posts = adventures
  if (category === 'articles') posts = articles
  posts = search(posts, searchString)
  posts = filterByTag(posts, tagSlug)
  if (sort === 'top') {
    posts = sortByScore(posts)
  } else {
    posts = sortByDate(posts)
  }
  const postCount = posts.length
  posts = paginate(posts, skip, take)
  return { posts, postCount }
}

function filterByTag(posts, tagSlug) {
  let filteredPosts = posts
  if (tagSlug) {
    filteredPosts = filteredPosts.filter(post => {
      const hasTag = post.tags.some(tag => tag.slug === tagSlug)
      return hasTag
    })
  }
  return filteredPosts
}

function search(posts, searchString) {
  let filteredPosts = posts
  if (searchString) {
    filteredPosts = filteredPosts.filter(post => {
      const foundInTitle = post.title.toLowerCase().includes(searchString.toLowerCase())
      const foundInBody = post.markdown.toLowerCase().includes(searchString.toLowerCase())
      const foundInDescription = post.description.toLowerCase().includes(searchString.toLowerCase())
      const foundInTags = post.tags.some(tag => tag.name.toLowerCase().includes(searchString.toLowerCase()))
      let foundInDate = false
      if (post.date) {
        foundInDate = moment(post.date).format('YYYY-MM-DD').toLowerCase().includes(searchString.toLowerCase())
      }
      if (foundInTitle || foundInBody || foundInDescription || foundInTags || foundInDate) return true
      return false
    })
  }
  return filteredPosts
}

function paginate(array, skip, take) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice(skip, skip + take)
}

function sortByDate(posts) {
  let sortedPosts = [...posts]
  sortedPosts.sort((a, b) => {
    let adate = a.date || '2001-01-01'
    let bdate = b.date || '2001-01-01'

    return moment(bdate).diff(moment(adate))
  })
  return sortedPosts
}

function sortByScore(posts) {
  let sortedPosts = [...posts]
  sortedPosts.sort((a, b) => {
    let adate = a.date || '2001-01-01'
    let bdate = b.date || '2001-01-01'
    // Sort by score, if two scores are teh same - sort by date
    return b.score - a.score || moment(bdate).diff(moment(adate))
  })
  return sortedPosts
}
