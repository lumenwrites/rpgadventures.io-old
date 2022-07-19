import Layout from 'components/Layout/Layout'

// const REDIRECT_URL = "https://docs.google.com/document/d/1Quqj7Lnbp5BfDhMZaNRK-TJ0kjhG0Md0OkazKrJumqY/"
const REDIRECT_URL = 'https://docs.google.com/document/d/1UG14osmo9AVW-56YtjBeBqQKF3Zhy0rQki7a812BicA/'

export default function RoleplayAcademyGames() {
  // if (typeof window !== "undefined") {
  //   window.location.replace(REDIRECT_URL)
  // }

  return (
    <Layout>
      <article className="post text">
        <a href={REDIRECT_URL}>Roleplay Academy Games</a>
      </article>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  return {
    redirect: {
      permanent: false,
      destination: REDIRECT_URL,
    },
    props: {},
  }
}
