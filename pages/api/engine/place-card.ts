import Pusher from 'pusher'

const { NEXT_PUBLIC_PUSHER_APP_ID, NEXT_PUBLIC_PUSHER_KEY, PUSHER_SECRET, NEXT_PUBLIC_PUSHER_CLUSTER } = process.env

const pusher = new Pusher({
  appId: NEXT_PUBLIC_PUSHER_APP_ID,
  key: NEXT_PUBLIC_PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
});

export default async function handler(req, res) {
  const { name, image, roomId } = req.body;
  // console.log('Broadcast data', data)
  await pusher.trigger(roomId, 'place-card', { name, image })
  // , () => {
  //   console.log('Broadcasted data')
  //   res.status(200).end('sent event successfully');
  // }
  res.status(200).end('nope');
}
