import clsx from 'clsx'
import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'components/Elements/Link'

export default function Card({ imageSrc, href, children }) {
  return (
    <div css={styles}>
      <Link href={href} className="thumbnail-wrapper" newWindow>
        <Image src={imageSrc} loading="lazy" alt="Post thumbnail" layout="fill" width={160} height={90} />
      </Link>
      <div className="description">{children}</div>
    </div>
  )
}

const styles = ({ theme }) => css`
  background: white;
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .thumbnail-wrapper {
    display: block;
    position: relative;
    aspect-ratio: 16 / 9;
    // https://github.com/vercel/next.js/issues/18637
    img {
      object-fit: cover !important;
      cursor: pointer;
    }
  }
  .description {
    padding: var(--size-4);
    font-size: var(--font-size-00);
    h2 {
      color: var(--text-headings);
      font-family: var(--font-secondary);
      font-weight: 700;
      font-size: var(--font-size-2);
      line-height: 1.15em;
      text-align: center;
      color: #724331;
    }
  }

  ${theme == 'dark' && `background: var(--surface-2);`}
`
