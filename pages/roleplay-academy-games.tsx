import Layout from 'components/Layout/Layout'

// const REDIRECT_URL = "https://docs.google.com/document/d/1Quqj7Lnbp5BfDhMZaNRK-TJ0kjhG0Md0OkazKrJumqY/"
const REDIRECT_URL = 'https://docs.google.com/document/d/1_Je2ymB5p3lNwdgiBNhxVNK3fFgWvtPuqmeWv1V1YCU'

export default function RoleplayAcademyGames() {
  // if (typeof window !== "undefined") {
  //   window.location.replace(REDIRECT_URL)
  // }

  return (
    <Layout>
      <article className="post text">
        <a href={REDIRECT_URL}>Brainstorming Template</a>
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
