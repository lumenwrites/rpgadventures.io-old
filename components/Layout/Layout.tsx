import { css } from '@emotion/react'
import Header from './Header'

export default function Layout({ children, styles = null, wide = false, subnav = null }) {
  return (
    <div css={[layoutStyles, styles]} className={`${wide ? '-wide' : ''}`}>
      <Header />
      {subnav}
      <div className="layout">
        <div className="content">{children}</div>
      </div>
    </div>
  )
}
const layoutStyles = css`
  background: var(--main-bg);

  &.-wide {
    .content {
      max-width: var(--container-wide-max-width);
      max-width: 960px;
    }
  }
`

// import Header from './Header'

// export default function Layout({ children, subnav = null }) {
//   return (
//     <>
//       <Header className="header" />
//       {subnav}
//       <div className="layout">
//         <div className="content">{children}</div>
//       </div>
//     </>
//   )
// }
