
import Layout from "components/Layout/Layout"

const REDIRECT_URL = "https://docs.google.com/document/d/11DQg2IMncN4Gk78I52fYL-YGXY40IjwdJQZ2YXEyMuw/"

export default function ThreeScenes() {
  // if (typeof window !== "undefined") {
  //   window.location.replace(REDIRECT_URL)
  // }

  return (
    <Layout>
      <article className="post text">
        <a href={REDIRECT_URL}>Three Scenes</a>
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
