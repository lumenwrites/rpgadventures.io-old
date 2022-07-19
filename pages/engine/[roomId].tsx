import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

import Layout from 'components/Layout/Layout'
import Tabs from 'components/Elements/Tabs'
import Playmat from 'components/Engine/Playmat'
import Rules from 'components/Engine/Rules'
import Cards from 'components/Engine/Cards'

import Pusher from 'pusher-js'
import SLOTS from 'components/Engine/slots.json'

const EngineContext = createContext({
  slots: [],
  setSlots: function () {} as any,
})

export function useEngineContext() {
  return useContext(EngineContext)
}

export default function Engine() {
  const [slots, setSlots] = useState(SLOTS)
  const router = useRouter()

  useEffect(() => {
    if (!router.query.roomId) return // just in case
    console.log('Connecting to room', router.query.roomId)
    // Pusher.logToConsole = true
    let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    })
    // When I drop an image onto the slot (in Playmat.tsx), it sends its name/url and roomId to /api/engine/place-card
    // place-card broadcasts this change to the whole room. I'm subscribed to it here (using pusher.subscribe)
    // I listen to changes,take the new image url that was broadcasted, and add it to state
    // console.log('Received event', data)
    let channel = pusher.subscribe(router.query.roomId.toString())
    channel.bind('place-card', function (data) {
      setSlots((prev) => {
        let updatedSlots = prev.map((slot) => {
          if (slot.name === data.name) {
            return { ...slot, image: data.image }
          }
          return slot
        })
        return updatedSlots
      })
    })

    // Cleaning up just in case
    // https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    window.onbeforeunload = function () {
      pusher.disconnect()
    }
    return function cleanup() {
      pusher.disconnect()
    }
  }, [router])

  return (
    <Layout>
      <EngineContext.Provider value={{ slots, setSlots }}>
        <div className="engine">
          <Tabs tabTitles={['How to Play', 'Play']}>
            <Rules />
            <div className="post playmat">
              <h2>Key Story Elements</h2>
              <Playmat />
              <h2>Your Cards</h2>
              <Cards />
            </div>
          </Tabs>
        </div>
      </EngineContext.Provider>
    </Layout>
  )
}
