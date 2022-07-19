import Link from 'components/Elements/Link'

export default function Rules() {
  return (
    <div className="post rules">
      <img className="post-header" src="/img/storytellers.jpg" />
      <h1>Story Engine</h1>
      <p>
        Story Engine is a game of improvisation and collaborative storytelling. Our goal is to create a fun story
        together. Join our{' '}
        <a href="https://discord.gg/UVNxeQE" target="_blank" rel="noopener noreferrer">
          discord
        </a>{' '}
        to play with us.
      </p>
      <p>
        When you click <Link href="#play">play</Link>, you will see a list of the key story elements, and your image
        cards below them. You and your friends will open that page, and take turns placing cards onto the empty slots
        (drag the image onto the slot to place it).
      </p>
      <p>
        Pick a card you think is the best suited for the next story element, place it onto the slot, and pitch an idea
        for that story element inspired by that image.
      </p>
      <blockquote>
        For example, when you place a card onto the &quot;Setting&quot; slot, use its image as an inspiration for a cool
        setting idea, describe your idea, explain how it fits into the story, and what makes it awesome.
      </blockquote>
      <p>
        You can also place your card on top of the card placed by another player - in that case you will use your image
        as an inspiration to build on top of their idea and take it in a new direction.
      </p>
      <blockquote>
        For example, another player has placed an image of a dragon onto the antagonist slot. Now you can continue the
        story by placing your card onto the next empty slot (Goal), or you can place it over the dragon image. If you have a card with a picture of a swamp on it, you can place it on top of the dragon, and say that it will be a
        swamp dragon.
      </blockquote>
      <p>In Your Cards section, you can click on an image to draw a new random card.</p>
      <p>
        Keep taking turns placing images, pitching your ideas, building on top of the ideas of other players, until all
        the slots have been filled and you have created a fun and exciting story.
      </p>
    </div>
  )
}
