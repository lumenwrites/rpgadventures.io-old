import { css } from '@emotion/react'

export function GridContainer({ children, columns = 2 }) {
  console.log(`grid-container ${columns}-columns`)
  return <div css={styles} className={`grid-container columns-${columns}`}>{children}</div>
}

const styles = ({ theme }) => css`
  display: grid;
  grid-gap: var(--size-2);
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
  &.columns-3 {
    grid-template-columns: repeat(3, 1fr);
  }
`
