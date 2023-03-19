
import Layout from "components/Layout/Layout"

// const REDIRECT_URL = "https://docs.google.com/document/d/1Quqj7Lnbp5BfDhMZaNRK-TJ0kjhG0Md0OkazKrJumqY/"
const REDIRECT_URL = "https://docs.google.com/document/d/1IP4VjIfH1pa__6Bld_cUR8LO7b1id2XVmueMJ4xdOQ4/"

export default function BrainstormingTemplate() {
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
    props:{},
  }
}
