// I redirect players to random rooms.
// When they share the link with their friends, they send them directly to the room ([roomId]), so there's no redirect then.
export default function EngineRoomRedirect() {
  return <div>Redirecting...</div>
}

export async function getServerSideProps({ params }) {
  return {
    redirect: {
      permanent: false,
      destination: `/engine/room-${Math.floor(Math.random() * 10000)}`,
    },
    props:{},
  }
}
