import clsx from 'clsx'
import { css } from '@emotion/react'

interface Props {
  bright?: boolean
}

// Used inside loading button and inside loading purchase modal
export default function Spinner({ bright = false }: Props) {
  const classes = clsx({ '-bright': bright })
  return (
    <div css={styles} className={classes}>
      <div className="flex-center">
        <div className="spinner" />
      </div>
    </div>
  )
}

const styles = ({ theme }) => css`
  display: flex;
  justify-content: center;
  .spinner {
    display: block;
    float: left;
    margin: 5px;
    border: 4px solid rgba(178, 178, 178, 0.25);
    border-top: 4px solid #666;
    ${theme == 'dark' && `border: 4px solid var(--surface-4);`}
    ${theme == 'dark' && `border-top: 4px solid var(--surface-5);`}
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1.25s linear infinite;
  }
  &.-bright {
    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.25);
      border-top: 4px solid white;
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
