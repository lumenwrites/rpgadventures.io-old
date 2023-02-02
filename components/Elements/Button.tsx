import clsx from 'clsx'
import { css, Interpolation, Theme } from '@emotion/react'
import Link from 'components/Elements/Link'
import Spinner from './Spinner'

type Props = React.ClassAttributes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    href?: string
    newWindow?: boolean
    disabled?: boolean
    loading?: boolean
    className?: string
    cta?: boolean
    outline?: boolean
    large?: boolean
    danger?: boolean
    gray?: boolean
    testId?: string
  }

export default function Button({
  children,
  type,
  onClick,
  href,
  newWindow = false,
  disabled = false,
  loading = false,
  className,
  cta = false,
  outline = false,
  large = false,
  danger = false,
  gray = false,
  testId,
}: Props) {
  const classes = clsx(
    className,
    'button',
    { '-cta': cta },
    { '-outline': outline },
    { '-large': large },
    { '-disabled': disabled },
    { '-danger': danger },
    { '-gray': gray }
  )
  if (href) {
    let newWindowProps = {}
    if (newWindow) {
      newWindowProps = {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    }
    return (
      <Link css={styles} className={classes} href={href} testId={testId} {...newWindowProps}>
        {children}
      </Link>
    )
  }
  if (loading) {
    return (
      <button
        css={styles}
        className={clsx(classes, '-disabled')}
        disabled
        data-test-id={testId}
      >
        <Spinner bright />
      </button>
    )
  }
  return (
    <button
      css={styles}
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-test-id={testId}
    >
      {children}
    </button>
  )
}

const styles = css`
  color: white;
  padding: var(--size-1) var(--size-4);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  font-family: var(--font-secondary);
  background: var(--primary);
  line-height: 30px; // same as spinner
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--size-2);
  &.-outline {
    border: 1px solid var(--slate-300);
    color: var(--slate-900);
    background: none;
    box-shadow: none;
    &:hover {
      background: rgba(220, 220, 220, 0.2);
    }
  }
  &.-medium {
    padding: var(--size-2) var(--size-4);
  }
  &.-large {
    padding: var(--size-3) var(--size-6);
  }
  &.-cta {
    font-weight: bold;
    text-transform: uppercase;
    /* background: #ffd500;
    color: #6a1900; */
    /* border-bottom: 4px solid #ce7c00; */
    background: #cc4331;
    color: white;
    display: block;
    &:hover {
      /* background: #ffdf40; */
      background: #d95650;
    }
    &.-disabled {
      /* Don't change disabled background for cta buttons */
      background: #ffd500;
    }
  }
  &.-disabled {
    opacity: 0.8;
    cursor: default;
    background: var(--text-dim);
  }
  white-space: nowrap;
  svg {
    margin-right: var(--size-1);
    opacity: 0.8;
  }
  &.-danger {
    background: var(--danger);
  }
  &.-gray {
    background: var(--text-dim);
  }
`
