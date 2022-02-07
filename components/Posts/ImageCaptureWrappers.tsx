import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import domtoimage from 'retina-dom-to-image'
import { saveAs } from 'file-saver'

const isDev = process.env.NODE_ENV === 'development'

export default function ImageCaptureWrappers({ post, children }) {
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const height = document.getElementById('render-image')?.clientHeight
    if (height) setHeight(height)
  }, [])

  if (!isDev) return children

  async function captureTwitterImage() {
    const positionImage = document.getElementById('position-image')
    const twitterImage = document.getElementById('render-image')
    positionImage.classList.add('capturing')
    const image = await domtoimage.toJpeg(twitterImage, { quality: 0.95 })
    positionImage.classList.remove('capturing')
    saveAs(image, `${post.title}.jpg`)
  }

  async function captureSocialImage() {
    const positionImage = document.getElementById('position-image')
    const croppedImage = document.getElementById('cropped-image')
    positionImage.classList.add('capturing-cropped')
    const image = await domtoimage.toJpeg(croppedImage, { quality: 0.95 })
    positionImage.classList.remove('capturing-cropped')
    saveAs(image, `social.jpg`) // ${post.slug}
  }
  const progress = Math.floor((height / 1160) * 100)
  return (
    <div>
      <div className="position-image capturing1" id="position-image">
        <div className="cropped-image" id="cropped-image">
          <div className="render-image" id="render-image">
            {children}
          </div>
        </div>
      </div>
      <div className="capture-buttons">
        <div className="stat">Words: {post.wordCount}</div>
        <div className="stat">Image size: {progress}%</div>
        <button className="btn item" onClick={captureTwitterImage}>
          <FontAwesomeIcon icon={['fas', 'camera']} />
          Save as Image
        </button>
        <button className="btn item" onClick={captureSocialImage}>
          <FontAwesomeIcon icon={['fas', 'camera']} />
          Social Image
        </button>
      </div>
      <div className="clearfix" />
    </div>
  )
}
