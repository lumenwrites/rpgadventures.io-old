import Image from 'next/image'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MessagePanel from 'components/Elements/MessagePanel'
import SpinnerButton from 'components/Elements/SpinnerButton'

export default function SubscribePage() {
  const emailInput = useRef(null)
  const [status, setStatus] = useState({ state: '', message: '' })

  async function submitEmail() {
    setStatus({ state: 'loading', message: '' })

    const { data } = await axios.post('/api/subscribe', {
      email: emailInput.current.value,
    })
    if (data.error) return setStatus({ state: 'error', message: data.error })

    emailInput.current.value = ''
    setStatus({
      state: 'success',
      message: `Success! Now check your email to confirm your subscription.`,
    })
    Cookies.set('subscribed', true)
  }

  return (
    <div className="subscribe-landing">
      <div className="form-card">
        <div className="header">
          <div className="logo">
            <Image src="/logo.png" width={90} height={90} />
          </div>
          <h1>Godot Academy</h1>
          <p>Learn to make games with Godot!</p>
        </div>
        <div className="description">
          Receive updates on my new Tutorials, Assets, and Courses.
          <form onSubmit={submitEmail}>
            <input
              ref={emailInput}
              aria-label="Email for newsletter"
              placeholder="Enter your email..."
              type="email"
              autoComplete="email"
              required
            />
            <SpinnerButton className="btn-subscribe" isloading={status.state === 'loading'} type="submit">
              Subscribe
            </SpinnerButton>
            <div className="clearfix" />
            <MessagePanel type={status.state} message={status.message} />
            <div className="disclaimer">
              I respect your privacy. Unsubscribe at any time. <br />I will email you no more frequently than once per
              week.
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
