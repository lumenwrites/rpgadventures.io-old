// import 'prismjs/themes/prism-tomorrow.css'
import '../styles/style.scss'
import 'components/Elements/FontawsomeSetup'


import CombinedContextsProvider from 'context/CombinedContexts'
import PlausibleProvider from 'next-plausible'

// Both modals have to be here, because they're useful in index.tsx as well as paywalled course pages
// and index.tsx isn't wrapped in layout
import LoginModal from 'components/Users/LoginModal'
import SubscribeModal from 'components/CTAs/SubscribeModal'
import DefaultHead from 'components/Layout/DefaultHead'
import { useEffect } from 'react'
import Router from 'next/router'

function App({ Component, pageProps }) {
  useEffect(() => {
    // Scroll to top on route change
    Router.events.on('routeChangeComplete', () => {
      var page = document.getElementsByClassName('content')[0];
      page.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    });
    // Dark theme
    // document.querySelector('html').dataset.theme = 'dark'
  }, [])

  return (
    <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_ANALYTICS_DOMAIN}>
      <CombinedContextsProvider>
        <DefaultHead />
        <Component {...pageProps} />
        <LoginModal />
        <SubscribeModal/>
      </CombinedContextsProvider>
    </PlausibleProvider>
  )
}

export default App
