import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, createContext, useContext, useRef } from 'react'
import axios from 'axios'
import { useEngineContext } from 'pages/scenes/[roomId]'

export default function Playmat() {
  const { scenes } = useEngineContext()
  const playmatRef = useRef(null)
  const [playmatHeight, setPlaymatHeight] = useState(410)
  useEffect(() => {
    // 19 is for <br/> at the end
    setPlaymatHeight(
      window.innerHeight - playmatRef.current.getBoundingClientRect().top - 30
    )
  }, [playmatRef])
  return (
    <div
      ref={playmatRef}
      className="playmat"
      style={{ maxHeight: `${playmatHeight}px` }}
    >
      {scenes.map((scene) => (
        <Scene key={scene.title} scene={scene} />
      ))}
    </div>
  )
}

function Scene({ scene }) {
  return (
    <div className="scene">
      <h2 data-place="bottom" data-multiline={true} data-tip={scene.tooltip}>
        {scene.title}
      </h2>
      <div className="grid">
        {scene.stacks.map((stack, stackIdx) => (
          <Stack stack={stack} scene={scene} key={stack.title} />
        ))}
      </div>
    </div>
  )
}

function Stack({ stack, scene }) {
  const router = useRouter()
  async function dropCard(e) {
    e.preventDefault()
    var url = e.dataTransfer.getData('URL')
    const { data } = await axios.post('/api/engine/place-card', {
      roomId: router.query.roomId.toString(),
      sceneTitle: scene.title,
      stackTitle: stack.title,
      card: {
        id: (Math.random() + 1).toString(36).substring(7),
        imageUrl: url,
      },
    })
  }
  async function deleteCard(cardId) {
    const { data } = await axios.post('/api/engine/delete-card', {
      roomId: router.query.roomId.toString(),
      sceneTitle: scene.title,
      stackTitle: stack.title,
      cardId,
    })
  }
  return (
    <div
      className="stack"
      onDrop={dropCard}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 data-place="bottom" data-multiline={true} data-tip={stack.tooltip}>
        {stack.title}
      </h2>
      {stack.cards.map((card) => (
        <div className="card placed-card" key={card.id}>
          <div className="image-wrapper">
            <div className="image">
              <img src={card.imageUrl} />
            </div>
          </div>
          <div className="delete" onClick={() => deleteCard(card.id)}>
            <FontAwesomeIcon icon={['fas', 'trash-alt']} />
          </div>
        </div>
      ))}
      {stack.cards.length === 0 && (
        <div className="slot blank card">
          <FontAwesomeIcon icon={['fas', stack.icon]} />
        </div>
      )}
    </div>
  )
}
