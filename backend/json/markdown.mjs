import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// import remarkHtml from 'remark-html'
import rehypeSanitize from 'rehype-sanitize'
import remarkRemoveComments from 'remark-remove-comments'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug' // adds id's to headers so you could link to them
import rehypeCodeTitles from 'rehype-code-titles' // allows you to show folder names above code blocks
import rehypeAutolinkHeadings from 'rehype-autolink-headings' // turns headers into links
import rehypePrism from 'rehype-prism-plus' // syntax highlighting, allows you to highlight code lines


export async function markdownToHtml(markdown) {
  // console.log(`Processing markdown ${markdown}`)
  // https://unifiedjs.com/learn/recipe/remark-html/
  const html = await unified()
    .use(remarkParse)
    // .use(remarkHtml)
    .use(remarkRemoveComments)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeSlug)
    // .use(rehypeCodeTitles)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrism)
    // .use(rehypeSanitize)
    .use(rehypeStringify, {allowDangerousHtml: true})
    .process(markdown)
  // console.log("Rendered markdown to html", html)
  return html.value.toString()
}
