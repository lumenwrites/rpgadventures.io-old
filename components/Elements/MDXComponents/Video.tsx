import { css } from '@emotion/react'

// https://github.com/cookpete/react-player/issues/1428
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export default function Video(props) {
  return (
    <div css={styles}>
      <ReactPlayer
        className="react-player"
        width="100%"
        height="100%"
        {...props}
      />
    </div>
  )
}

const styles = css`
  max-width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: var(--radius-lg);
  /* Hack that makes border radius work in safari */
  /* https://stackoverflow.com/questions/49066011/overflow-hidden-with-border-radius-not-working-on-safari */
  transform: translateZ(0);
  overflow: hidden;
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`
