// import 'prismjs/themes/prism-tomorrow.css'
import '../styles/style.scss'
import 'components/Elements/FontawsomeSetup'
import Script from 'next/script'

import CombinedContextsProvider from 'context/CombinedContexts'
import PlausibleProvider from 'next-plausible'

// Both modals have to be here, because they're useful in index.tsx as well as paywalled course pages
// and index.tsx isn't wrapped in layout
import LoginModal from 'components/Users/LoginModal'
import SubscribeModal from 'components/CTAs/SubscribeModal'
import DefaultHead from 'components/Layout/DefaultHead'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import ReactTooltip from 'react-tooltip'

function App({ Component, pageProps }) {
  useEffect(() => {
    // Scroll to top on route change
    Router.events.on('routeChangeComplete', () => {
      var page = document.getElementsByClassName('content')[0]
      page.scrollTo(0, 0)
      document.body.scrollTo(0, 0)
    })
    // Dark theme
    document.querySelector('html').dataset.theme = 'dark1'
  }, [])

  // Need this for the react-tooltip: https://stackoverflow.com/questions/64079321/react-tooltip-and-next-js-ssr-issue
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setIsMounted(true)
  })
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [router])
  return (
    <PlausibleProvider
      domain={process.env.NEXT_PUBLIC_PLAUSIBLE_ANALYTICS_DOMAIN}
    >
      <Script src="/reddit-pixel.js" strategy="beforeInteractive"></Script>
      <CombinedContextsProvider>
        <DefaultHead />
        <Component {...pageProps} />
        <LoginModal />
        <SubscribeModal />
        {isMounted && <ReactTooltip effect="solid" />}
      </CombinedContextsProvider>
    </PlausibleProvider>
  )
}

export default App
