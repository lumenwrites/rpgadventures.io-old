import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import Layout from 'components/Layout/Layout'
import Head from 'next/head'

const TITLE = 'Roleplay Academy'
const DESCRIPTION =
  'Improv workshops for roleplayers and Game Masters. Become a better roleplayer, improviser, storyteller!'
const THUMBNAIL =
  'https://rpgadventures.io/page/roleplay-academy/roleplay-academy-social.png'

export default function RoleplayAcademy({ page }) {
  return (
    <Layout subnav={<Hero />}>
      <div className="post text roleplay-academy-copy">
        <MDXRemote {...page.body} components={MDXComponents} />
        <img
          className="friendship-image"
          src="/page/roleplay-academy/friendship.jpg"
        />
      </div>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} key="ogtitle" />
        <meta property="og:description" content={DESCRIPTION} key="ogdesc" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta property="og:image" content={THUMBNAIL} key="ogimage" />
        <meta name="twitter:image" content={THUMBNAIL} />
      </Head>
    </Layout>
  )
}

function Hero() {
  return (
    <div className="roleplay-academy-hero">
      <div className="hero-content">
        <h1>Roleplay Academy</h1>
        <div className="subtitle">
          Improv Workshops for Roleplayers and Game Masters. <br />
          Become a better Roleplayer, Improviser, Storyteller.
          {/* <br /> */}
          {/* Learn to play (and run) better games! */}
          {/* <br /> */}
        </div>
      </div>
    </div>
  )
}

import pages from 'backend/json/pages/posts.json'

export async function getStaticProps({ params }) {
  const page = pages.find((page) => page.slug == 'roleplay-academy-landing-free')
  return { props: { page } }
}
