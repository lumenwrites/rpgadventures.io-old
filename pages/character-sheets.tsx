
import Layout from "components/Layout/Layout"

const REDIRECT_URL = "https://docs.google.com/document/d/1cJilS6BUyOEoPKf1qrx1XHwW_eqMvMfyrUKie5G5RAc/"

export default function AdventureTemplate() {
  // if (typeof window !== "undefined") {
  //   window.location.replace(REDIRECT_URL)
  // }

  return (
    <Layout>
      <article className="post text">
        <a href={REDIRECT_URL}>Character sheets</a>
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
    props:{},
  }
}
