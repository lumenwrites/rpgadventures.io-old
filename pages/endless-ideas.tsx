import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagePanel from 'components/Elements/MessagePanel'
import SpinnerButton from 'components/Elements/SpinnerButton'
import config from 'config.json'
// https://plausible.io/docs/nextjs-integration
import { usePlausible } from 'next-plausible'

export default function subscribe() {
  return <SubscribePage />
}

function SubscribePage() {
  const emailInput = useRef(null)
  const [form, setForm] = useState({ state: '', message: '' })
  const plausible = usePlausible()
  
  async function handleSubmit(e) {
    e.preventDefault()
    setForm({ state: 'loading', message: '' })

    const { data } = await axios.post('/api/subscribe', {
      email: emailInput.current.value,
      // Endless Ideas form
      // https://app.convertkit.com/forms/designers/2893851/edit
      formId: 2893851,
    })
    if (data.error) return setForm({ state: 'error', message: data.error })

    emailInput.current.value = ''
    setForm({
      state: 'success',
      message: `Success! Now check your email to confirm your subscription.`,
    })
    Cookies.set('subscribed', true)
    plausible(`Endless Ideas Landing: Subscribed`)
  }

  return (
    <div className="subscribe-landing">
      <div className="form-card">
        <div className="header">
          <div className="logo">
            <Image src="/img/logo-spaceship.png" width={90} height={90} alt="logo" />
          </div>
          <h1>
            Endless Content Ideas
            {/* <br /> Free 7-Day Email Course */}
          </h1>
          <p className="subheader">
            {/* (by <a href={'https://twitter.com/lumenwrites'} target="_blank" rel="noopener noreferrer"> @lumenwrites </a> */}
          </p>
        </div>
        <div className="description">
          <p>
            Download a list 30+ strategies for generating endless content ideas, and receive a weekly newsletter that
            will help you to become a prolific digital writer and grow your audience as a content creator.
          </p>
          {/* <p>
            The ultimate step-by-step guide to designing your content roadmap:
          </p>
          <ul>
            <li>Generate hundreds of high-performing content ideas for months to come, never run out of things to say.</li>
            <li>Design a high-leverage content strategy that will grow your audience.</li>
            <li>Turn strangers into loyal followers, turn loyal followers into customers.</li>
          </ul> */}
          {/* <li>Never run out of ideas.</li> */}
          {/* <li>Create the content people actually want.</li> */}
          {/* <p>Start learning now:</p> */}

          <form className="form" onSubmit={handleSubmit}>
            <input
              ref={emailInput}
              aria-label="Email for newsletter"
              placeholder="Enter your email..."
              type="email"
              autoComplete="email"
              required
            />
            <SpinnerButton className="btn-subscribe" isloading={form.state === 'loading'} type="submit">
              Subscribe
            </SpinnerButton>
            <div className="clearfix" />
            <MessagePanel type={form.state} message={form.message} />
            <div className="disclaimer">
              I know you&apos;re busy, I respect your privacy, and I don&apos;t spam.
              <br />
              You can easily unsubscribe at any time.
            </div>
          </form>
        </div>
      </div>
      <Head>
        <title>Endless Content Ideas</title>
        <meta property="og:title" content={`Endless Content Ideas`} key="ogtitle" />
        <meta name="twitter:title" content={`Endless Content Ideas`} key="ogtitle" />
        <meta name="description" content={"Download a list 30+ strategies for generating endless content ideas."} />
        <meta property="og:description" content={"Download a list 30+ strategies for generating endless content ideas."} key="ogdesc" />
        <meta name="twitter:description" content={"Download a list 30+ strategies for generating endless content ideas."} />
        <meta property="og:image" content={`${config.domain}/showcase-boxes/endless-ideas-social.png`} key="ogimage" />
        <meta name="twitter:image" content={`${config.domain}/showcase-boxes/endless-ideas-social.png`} />
      </Head>
    </div>
  )
}
