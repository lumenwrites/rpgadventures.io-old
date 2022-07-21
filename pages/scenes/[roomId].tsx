import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

import Layout from 'components/Layout/Layout'
import Tabs from 'components/Elements/Tabs'
import Playmat from 'components/Engine/Playmat'
import Rules from 'components/Engine/Rules'
import Cards from 'components/Engine/Cards'

import Pusher from 'pusher-js'
import STACKS from 'components/Engine/stacks.json'

const SCENES = [
  {
    title: 'Scene 1: Exciting Hook',
    tooltip:
      'This scene introduces the problem the heroes must solve by the end of the story, <br/> and draws them into action.',
    stacks: STACKS,
  },
  {
    title: 'Scene 2: Dramatic Crisis',
    tooltip:
      'Unexpected complication or a setback in the middle of the story, <br/> escalating the conflict and raising the stakes.',
    stacks: STACKS,
  },
  {
    title: 'Scene 3: Awesome Climax',
    tooltip:
      'Final, most important and dangerous challenge, <br/> the biggest obstacle overcoming which resolves the main conflict.',
    stacks: STACKS,
  },
]

const EngineContext = createContext({
  scenes: [],
  setScenes: function () {} as any,
})

export function useEngineContext() {
  return useContext(EngineContext)
}

export default function Engine() {
  const [scenes, setScenes] = useState(SCENES)
  const router = useRouter()
  useEffect(() => {
    if (!router.query.roomId) return // on the first render it doesn't have a roomId for some reason
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
      const { sceneTitle, stackTitle, card } = data
      console.log('[roomId] Received image', data)
      setScenes((prev) => {
        let updatedScenes = JSON.parse(JSON.stringify(prev))
        for (let scene of updatedScenes) {
          if (scene.title === sceneTitle) {
            for (let stack of scene.stacks) {
              if (stack.title === stackTitle) {
                stack.cards.push(card)
              }
            }
          }
        }
        return updatedScenes
      })
    })
    channel.bind('delete-card', function (data) {
      const { sceneTitle, stackTitle, cardId } = data
      console.log('[roomId] Delete card', data)
      setScenes((prev) => {
        let updatedScenes = JSON.parse(JSON.stringify(prev))
        for (let scene of updatedScenes) {
          if (scene.title === sceneTitle) {
            for (let stack of scene.stacks) {
              if (stack.title === stackTitle) {
                stack.cards = stack.cards.filter(c => c.id !== cardId)
              }
            }
          }
        }
        return updatedScenes
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
      <EngineContext.Provider value={{ scenes, setScenes }}>
        <div className="engine">
          <Tabs tabTitles={['How to Play', 'Play']}>
            <Rules />
            <div className="tab-contents game">
              {/* <h2>Key Story Elements</h2> */}
              <h2>Your Cards</h2>
              <Cards />
              {/* <hr/> */}
              {/* <h2>Scenes</h2> */}
              <br />
              <Playmat />
            </div>
          </Tabs>
        </div>
        <br />
      </EngineContext.Provider>
    </Layout>
  )
}
