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
    console.log('top', playmatRef.current.getBoundingClientRect().top);
  }, [playmatRef])
  console.log('pl', playmatHeight);
  console.log('win', window.innerHeight);
  // let plh = 410
  // plh = window.innerHeight - playmatRef?.current?.getBoundingClientRect().top - 30
  // console.log('plh', plh);
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
        {scene.slots.map((slot) => (
          <Slot slot={slot} scene={scene} key={slot.name} />
        ))}
      </div>
    </div>
  )
}

function Slot({ slot, scene }) {
  const router = useRouter()
  async function drop(e) {
    e.preventDefault()
    var url = e.dataTransfer.getData('URL')
    const { data } = await axios.post('/api/engine/place-card', {
      name: `${scene.title} - ${slot.name}`,
      image: url,
      roomId: router.query.roomId.toString(),
    })
    // Push all slots
    // const updatedSlots = slots.map((s) => {
    //   if (s.name === slot.name) {
    //     return { ...s, image: url }
    //   }
    //   return s
    // })
    // const { data } = await axios.post('/api/engine/place-card', updatedSlots)
  }
  return (
    <div className="slot">
      <h2 data-place="bottom" data-multiline={true} data-tip={slot.tip}>
        {slot.name}
      </h2>
      <div
        className="card"
        onDrop={drop}
        onDragOver={(e) => e.preventDefault()}
      >
        {slot.image ? (
          <div className="image-wrapper">
            <div className="image">
              <img src={slot.image} />
            </div>
          </div>
        ) : (
          <div className="blank">
            <FontAwesomeIcon icon={['fas', slot.icon]} />
          </div>
        )}
      </div>
    </div>
  )
}
