import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'

export default function Sorting() {
  const router = useRouter()
  let { sort, period, ...baseQuery } = router.query
  // console.log('rq', router.query)
  return (
    <div className="dropdown sorting">
      <Link className="menu-handle btn btn-nav" href={`/`}>
        <MenuHandle />
      </Link>
      <div className="menu">
        <a className="btn item" onClick={() => router.push({ query: { ...baseQuery } })}>
          <FontAwesomeIcon icon={['fas', 'clock']} />
          Recent
        </a>
        <a className="btn item" onClick={() => router.push({ query: { ...baseQuery, sort: 'top' } })}>
          <FontAwesomeIcon icon={['fas', 'arrow-up']} />
          Best
        </a>
      </div>
    </div>
  )
}

function MenuHandle() {
  const router = useRouter()
  if (!router.query.sort) {
    return (
      <>
        <FontAwesomeIcon icon={['fas', 'clock']} />
        Recent
      </>
    )
  }
  if (router.query.sort === 'top') {
    return (
      <div>
        <FontAwesomeIcon icon={['fas', 'arrow-up']} />
        Best
      </div>
    )
  }
  return null
}
