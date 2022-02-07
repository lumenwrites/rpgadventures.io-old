import Image from 'next/image'
// https://plausible.io/docs/nextjs-integration
import { usePlausible } from 'next-plausible'

export default function AdBoxes() {
  return (
    <div className="showcase-boxes">
      <AdBox
        title="Prompts App"
        description="A large collection of prompts that will help you to write or improvise adventures. Adventure ideas, antagonists, settings, challenges - everything you need!"
        href="https://perchance.org/adventure-prompts"
        image={'/showcase-boxes/writing-desk.jpg'}
      />
      <AdBox
        title="Adventure Writing Academy"
        description="Learn to Create Awesome Adventures for Tabletop Roleplaying Games! This course will teach you everything I know about creating adventures, and guide you through a step-by-step process of creating your own one-shot."
        href="/course/adventure-academy"
        image={'/showcase-boxes/valley.jpg'}
      />
      <AdBox
        title="Adventure Writers&apos; Room"
        description="Join our Discord community! We are a group of people who love creating adventures for tabletop roleplaying games, we help each other to brainstorm ideas and create stories for our players to enjoy."
        href="https://discord.gg/JZmXfWD85D"
        image={'/showcase-boxes/logo-book.png'}
      />
    </div>
  )
}

function AdBox({ title, description, href, image }) {
  const plausible = usePlausible()
  // showcase-box because when it's named ad-box it gets blocked by ad blockers
  function trackClick() {
    plausible(`AdBox: ${title}`)
  }
  return (
    <a className="card showcase-box" href={href} target="_blank" rel="noopener noreferrer" onClick={trackClick}>
      <div className="thumbnail-image">
        <Image src={image} width={320} height={180} layout="responsive" objectFit="cover" />
      </div>
      {/* <div className="image-wrapper">
        <div className="thumbnail" style={{ background: `url('${image}')` }} />
      </div> */}
      <section className="description">
        <div className="title">{title}</div>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </section>
    </a>
  )
}
