import { css } from '@emotion/react'
import Layout from 'components/Layout/Layout'
import StorylabsHero from 'components/Pages/Hero'
import Card from 'components/Elements/Card'
import { GridContainer } from 'components/Elements/GridContainer'

export default function HomePage({ posts }) {
  return (
    <Layout subnav={<StorylabsHero />} wide>
      <div css={styles}>
        <GridContainer columns={3}>
          <Card imageSrc="/img-small/writing-desk.jpg" href="/writers-room">
            <h2>Adventure Writers&apos; Room</h2>
            <p>Join our brainstorming sessions to make awesome adventures with other friendly and creative people.</p>
            {/* <h2>Storytellers Community</h2>
            <p>
              Join our workshops and brainstorming sessions to create adventures with other friendly and creative
              people.
            </p> */}
          </Card>
          {/* /img-small/improvisers.jpg */}
          <Card imageSrc="/img-small/friendship.jpg" href="/roleplay-academy.pdf">
            <h2>Roleplay Academy</h2>
            <p>Join our improv and acting workshops to become a better Roleplayer, Improviser, Storyteller.</p>
          </Card>
          <Card imageSrc="/img/hermione.jpg" href="/browse">
            <h2>Adventure Library</h2>
            <p>An archive of awesome adventures ready to use in your games. Come play these games with us!</p>
          </Card>
          <Card imageSrc="/img/blueprint.png" href="/template">
            <h2>Adventure Blueprint</h2>
            <p>A step-by-step system that guides you from an idea to a complete adventure.</p>
          </Card>

          <Card imageSrc="/img/book2.jpg" href="/course/adventure-academy">
            <h2>Adventure Academy Course</h2>
            <p>Learn everything you need to know to create awesome adventures.</p>
          </Card>

          <Card imageSrc="/img-small/valley.jpg" href="/mirage">
            <h2>Mirage</h2>
            <p>A rules-lite, storytelling-focused system for playtesting adventures.</p>
          </Card>
          <Card imageSrc="/page/landing/lightbulb1.png" href="/prompts">
            <h2>Adventure Prompts App</h2>
            <p>Generate endless ideas for your adventures.</p>
          </Card>
          <Card imageSrc="/page/landing/robot1.png" href="https://adventurealchemy.io/">
            <h2>Adventure Alchemy</h2>
            <p>AI-based tool for creating adventures.</p>
          </Card>
          <Card imageSrc="/page/landing/camera1.png"  href="/unscripted.pdf">
            <h2>Unscripted</h2>
            <p>A game where you improvise fun movies from scratch, with no preparation.</p>
          </Card>
          <Card imageSrc="/page/landing/adventuring-academy2.jpg" href="/magic-school-mysteries.pdf">
            <h2>Magic School Mysteries</h2>
            <p>
              A game where you play as teen wizards studying at a magic school and solving mysteries in the style of
              Harry Potter, Scooby Doo, and Gravity Falls. Improvise a mystery from scratch, with no preparation.
            </p>
          </Card>

  
          {/* Adventure Alchemy, Unscripted, Magic School Mysteries */}
        </GridContainer>
      </div>
      <br />
    </Layout>
  )
}

const styles = ({ theme }) => css`
  h2 {
    margin-top: 0;
  }
  .grid-container {
    margin-top: var(--size-2);
  }
`
