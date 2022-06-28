import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/Elements/MDXComponents'
import Layout from 'components/Layout/Layout'

export default function RoleplayAcademy({ page }) {
  return (
    <Layout subnav={<Hero />}>
      <div className="post text roleplay-academy-copy">
        <MDXRemote {...page.body} components={MDXComponents} />
        <h2>Our Instructor</h2>
        <div className="instructor">
          <img className="photo" src="/page/roleplay-academy/adam-cauchi.jpg" />
          <div className="bio">
            <h3>Adam Cauchi</h3>
            <p>
              Professional improviser, actor, and an experienced roleplayer, who
              spent more than 5 years teaching and performing at well-known
              improv theaters such as SecondCity, iO, Annoyance Theater, and
              UCB.
            </p>
          </div>
        </div>
        <h2>Prerequisites</h2>
        <p>
          No improv experience necessary! All you need to participate is a
          stable internet connection, a webcam, and the desire to become a
          better roleplayer and storyteller. Positive energy and enthusiasm are
          always welcome =)
        </p>
        <h2>How to Join</h2>
        <p>
          Our workshops take place in Discord video chat, every Saturday, at 6PM
          GMT. The workshops cost $20 per 2 hour lesson. If you would like to
          participate, come{' '}
          <a href="https://discord.gg/mx8UYkBaVR">join our Discord server</a>,
          and then make a payment here:
        </p>
        <a
          href="https://buy.stripe.com/7sI8Ac4mxeX2gNyaEE"
          target="_blank"
          rel="noopener noreferrer"
          className="join-btn"
        >
          Sign Up ($20)
        </a>
        <img
          className="friendship-image"
          src="/page/roleplay-academy/friendship.jpg"
        />
      </div>
    </Layout>
  )
}

function Hero() {
  return (
    <div className="roleplay-academy-hero">
      <div className="hero-content">
        <h1>Roleplay Academy</h1>
        <div className="subtitle">
          Improv Workshops for Rolelpayers and Game Masters. <br />
          Become a better Roleplayer, Improviser, Storyteller.
          <br />
          Learn to play (and run) better games!
          <br />
        </div>
      </div>
    </div>
  )
}

import pages from 'backend/json/pages/posts.json'

export async function getStaticProps({ params }) {
  const page = pages.find((page) => page.slug == 'roleplay-academy-landing')
  return { props: { page } }
}
