import { css } from '@emotion/react'
import Layout from 'components/Layout/Layout'

export default function Prompts() {
  return (
    <Layout>
      <div css={pageStyles}>
        {/* <div className="header">{page.title}</div> */}
        <div className="prose description">
          <h1>Adventure Prompts</h1>
          <iframe
            src="https://null.perchance.org/adventure-prompts-embed"
            style={{ width: '100%', height: '1100px', border: 'none' }}
          />
        </div>
      </div>
      {/* <PageHead page={page} /> */}
    </Layout>
  )
}

const pageStyles = ({ theme }) => css`
  margin-top: var(--size-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  background: white;
  ${theme == 'dark' && ` background: var(--surface-2);`}
  /* For rounded corners */
  overflow:hidden;
  h1 {
    text-align: center;
    margin-top: var(--size-8) !important;
  }
  .description {
    /* padding: var(--size-8); */
  }
`
