import { join } from 'path'
import { readFileSync, readdirSync, writeFileSync } from 'fs'

import { markdownToHtml } from './markdown.mjs'
import { renderMDX } from './mdx.mjs'

import matter from 'gray-matter'
import slugify from 'slugify'

import config from '../../config.json'

export async function getPosts(postsdir, category) {
  let posts = []
  let allTags = []
  for (const postFileName of readdirSync(postsdir)) {
    // console.log('Processing Post', postFileName)
    const postText = readFileSync(join(postsdir, postFileName), 'utf8')
    const { data: frontmatter, content } = matter(postText)
    if (process.env.NODE_ENV === 'production' && frontmatter.draft) continue // skip drafts
    if (!postFileName.includes('.md')) continue // skip .DS_Store
    let titleFromFilename = postFileName.replace('.md', '')
    // If the file name starts with a number (like 999, used for ordering), remove it
    if (!isNaN(parseInt(titleFromFilename.split(' ')[0]))) {
      titleFromFilename = titleFromFilename.substring(postFileName.indexOf(' ') + 1)
    }
    const title = frontmatter.title || titleFromFilename
    const slug = frontmatter.slug || slugify(title, { lower: true, strict: true })
    const url = frontmatter.directLink || `/post/${slug}`
    let tags = []
    if (frontmatter.tags) {
      tags = frontmatter.tags.map((tag) => ({
        name: tag,
        slug: slugify(tag, { lower: true }),
      }))
    }
    if (frontmatter.draft) {
      tags.unshift({ name: 'Draft', slug: 'draft' }) // add to the beginning
    }

    const post = {
      title,
      slug,
      url,
      tags,
      category,
      description: frontmatter.description || '',
      thumbnail: frontmatter.thumbnail || null,
      headerImage: frontmatter.headerImage || null,
      social: frontmatter.social || frontmatter.thumbnail || `/post/${slug}/social.jpg` || null,
      comments: frontmatter.comments || null,
      relatedPosts: frontmatter.relatedPosts || null,
      markdown: content, // for search
      html: await markdownToHtml(content), // for RSS feed
      body: await renderMDX(content),
      date: frontmatter.date || null,
      score: frontmatter.score || 0,
      wordCount: content.split(' ').length,
    }
    posts.push(post)
    if (tags) allTags = [...allTags, ...tags]
    console.log(`Processed ${category}:`, post.title)
  }
  // Related Posts
  for (const post of posts) {
    if (!post.relatedPosts) continue
    const relatedPosts = []
    for (const relatedSlug of post.relatedPosts) {
      const relatedPost = posts.find((p) => p.slug === relatedSlug)
      if (!relatedPost) {
        console.log(`Couldn't find the related post with slug ${relatedSlug} `)
        continue
      }
      const { title, slug, url, description, tags, comments } = relatedPost
      relatedPosts.push({ title, slug, url, description, tags, comments })
    }
    post.relatedPosts = relatedPosts
  }

  allTags = deduplicateTags(allTags)
  allTags.sort((a, b) => b.postCount - a.postCount)
  return { posts, allTags }
}

export async function processPosts(category) {
  const postsdir = join(config.contentdir, 'posts', category) // pages, posts, adventures
  console.log('postsdir', postsdir);
  const { posts, allTags } = await getPosts(postsdir, category)
  // posts.map((post) => console.log(post.title, post.draft))
  writeFileSync(`${process.cwd()}/backend/json/${category}/posts.json`, JSON.stringify(posts))
  writeFileSync(`${process.cwd()}/backend/json/${category}/allTags.json`, JSON.stringify(allTags))
  console.log(`[processPosts] Success! ${category} converted to json.`)
}


function deduplicateTags(tags) {
  let uniqueTags = []
  for (let tag of tags) {
    const foundTag = uniqueTags.find((t) => t.slug === tag.slug)
    if (!foundTag) {
      uniqueTags.push({ ...tag, postCount: 1 })
    } else {
      foundTag.postCount += 1
    }
  }
  return uniqueTags
}
