import slugify from 'slugify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip'

export default function Tabs({ tabTitles, children }) {
  const router = useRouter()
  const tabsWithSlugs = tabTitles.map((t) => ({ name: t, slug: slug(t) }))
  const [activeTab, setActiveTab] = useState(tabsWithSlugs[0]) // slug(tabs[0])
  useEffect(() => {
    if (window.location.hash) {
      const slug = window.location.hash.replace('#', '')
      selectTab(slug)
    }
  }, [router])
  function selectTab(slug) {
    const activeTab = tabsWithSlugs.find((t) => t.slug === slug)
    setActiveTab(activeTab)
    window.location.hash = activeTab.slug
    setTimeout(()=>ReactTooltip.rebuild(), 300)
  }
  const index = tabsWithSlugs.findIndex(t => t.slug ===activeTab.slug);
  return (
    <div className="tabs-wrapper">
      <div className="tabs">
        {tabsWithSlugs.map((tab) => (
          <button
            key={tab.slug}
            className={`tab ${activeTab.slug === tab.slug ? 'active' : ''}`}
            onClick={() => selectTab(tab.slug)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {children[index]}
    </div>
  )
}

function slug(str) {
  return slugify(str, { lower: true, strict: true })
}
