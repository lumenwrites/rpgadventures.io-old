import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useModal } from 'context/ModalContext'
import Link from 'components/Elements/Link'
import { ToggleSidebarButton } from 'components/Courses/Sidebar'

export default function Header({ className }) {
  const { toggleModal } = useModal()
  return (
    <header className={className}>
      <div className="wrapper">
        <ToggleSidebarButton />
        <Link href="/" className="logo">
          <div className="logo-image">
            <Image src="/logo.png" width={32} height={32} />
          </div>
          {/* <span className="logo-bold">rpg</span> */}
          adventures
        </Link>
        <nav>
          <Link href={`/`} className="btn btn-nav">
            Adventures
          </Link>
          <Link href={`/articles`} className="btn btn-nav">
            Articles
          </Link>
          <DropdownMenu />
          {/* <a className="btn btn-nav btn-cta" onClick={() => toggleModal(`subscribe`)}>
            Subscribe
          </a> */}
          <Link href={`/about`} className="btn btn-nav">
            About
          </Link>
        </nav>
        <div className="clearfix" />
      </div>
    </header>
  )
}

function DropdownMenu() {
  return (
    <div className="dropdown">
      <Link href="/" className="menu-handle btn btn-nav">
        Resources
      </Link>
      <div className="menu left">
        {/* <a className="btn item" target="_blank" href="https://discord.gg/JZmXfWD85D">
          Our Discord
        </a> */}
        <Link className="btn item" href={`/writers-room`}>
          Writers&apos; Room
        </Link>
        <Link className="btn item" href={`/roleplay-academy`}>
          Roleplay Academy
        </Link>
        <Link className="btn item" href={`/course/adventure-academy`}>
          Adventure Academy
        </Link>
        <a
          className="btn item"
          target="_blank"
          rel="noopener noreferrer"
          href="https://perchance.org/adventure-prompts"
        >
          Adventure Prompts
        </a>
        <Link className="btn item" href={`/mirage`}>
          Mirage
        </Link>
        <Link className="btn item" href={`/three-scenes`}>
          Three Scenes
        </Link>
      </div>
    </div>
  )
}
