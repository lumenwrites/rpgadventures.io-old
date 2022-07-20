// https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
import { library } from "@fortawesome/fontawesome-svg-core"

// Unbreak icon sizes in next.js
// https://fontawesome.com/v6.0/docs/web/use-with/react/use-with#getting-font-awesome-css-to-work
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// Import everything (significantly increases bundle size)
// import { fas } from "@fortawesome/free-solid-svg-icons"
// import { far } from "@fortawesome/free-regular-svg-icons"
// import { fab } from "@fortawesome/free-brands-svg-icons"
// library.add(fas, far, fab)

import { faTwitter, faYoutube, faDiscord } from "@fortawesome/free-brands-svg-icons"
import {
  faBars,
  faUpload,
  faUser,
  faCog,
  faSignOutAlt,
  faTimes,
  faBook,
  faEdit,
  faArrowUp,
  faArrowDown,
  faEye,
  faComments,
  faCommentAlt,
  faImage,
  faTrashAlt,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faDownload,
  faBox,
  faBoxOpen,
  faInfoCircle,
  faSignInAlt,
  faArrowRight,
  faCaretDown,
  faCaretRight,
  faPlusSquare,
  faMinusSquare,
  faThumbsUp,
  faThumbsDown,
  faGlobeAmericas,
  faCamera,
  faSearch,
  faClock,
  faUsers,
  faBolt,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons"

library.add(
  faBars,
  faUpload,
  faUser,
  faCog,
  faSignOutAlt,
  faTimes,
  faBook,
  faEdit,
  faArrowUp,
  faArrowDown,
  faEye,
  faComments,
  faImage,
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
  faDownload,
  faBox,
  faBoxOpen,
  faInfoCircle,
  faSignInAlt,
  faYoutube,
  faDiscord,
  faTwitter,
  faArrowRight,
  faCaretDown,
  faCaretRight,
  faCommentAlt,
  faPlusSquare,
  faMinusSquare,
  faThumbsUp,
  faThumbsDown,
  faGlobeAmericas,
  faCamera,
  faSearch,
  faClock,
  faUsers,
  faBolt,
  faImage,
  faBullseye
)
