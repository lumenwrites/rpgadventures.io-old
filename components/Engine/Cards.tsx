import images from 'backend/engine/images.json'
import { useState, useEffect } from 'react'

export default function Cards() {
  const [cards, setCards] = useState([])
  useEffect(() => setCards(shuffle(images).slice(0, 4)), [])
  function randomizeImage(idx) {
    setCards((prev) => {
      let updatedCards = prev.map((card, i) => {
        if (i === idx) {
          return images[Math.floor(Math.random() * images.length)]
        }
        return card
      })
      return updatedCards
    })
  }
  return (
    <div className="cards grid grid-4">
      {cards.map((url, idx) => (
        <div className="card" key={url} onClick={() => randomizeImage(idx)}>
          <div>
            <div className="image-wrapper">
              <div className="image">
                <img src={url} key={url} />
              </div>
            </div>
          </div>
          {/* <textarea placeholder="Enter your idea inspired by the image, then drag the card onto the slot..." /> */}
        </div>
      ))}
    </div>
  )
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
