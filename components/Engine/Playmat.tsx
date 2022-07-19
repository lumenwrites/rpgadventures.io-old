import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { useEngineContext } from 'pages/engine/[roomId]'

export default function Playmat() {
  const { slots } = useEngineContext()

  return (
    <div className="playmat grid grid-3">
      {slots.map((slot) => (
        <Slot slot={slot} key={slot.name} />
      ))}
    </div>
  )
}

function Slot({ slot }) {
  const router = useRouter()
  async function drop(e) {
    e.preventDefault()
    var url = e.dataTransfer.getData('URL')
    const { data } = await axios.post('/api/engine/place-card', {
      name: slot.name,
      image: url,
      roomId: router.query.roomId.toString()
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
      <div className="card" onDrop={drop} onDragOver={(e) => e.preventDefault()}>
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
