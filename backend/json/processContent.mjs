import { processCourses } from "./processCourses.mjs"
import { processPosts } from "./processPosts.mjs"
// import { generateRSSFeed } from "./generateRSSFeed.mjs"

await processCourses()
await processPosts('adventures')
await processPosts('articles')
await processPosts('ideas')
await processPosts('pages')
// generateRSSFeed()
