import { css } from '@emotion/react'
import Button from 'components/Elements/Button'

export default function StorylabsHero() {
  return (
    <div css={styles}>
      <div className="hero-content">
        <h1>Everything you need to create and run <br/> Awesome Adventures for Roleplaying Games</h1>
        {/* <div className="subtitle">Everything you need to create and run awesome Adventures for Roleplaying Games</div> */}
        <Button cta large href="https://discord.gg/JZmXfWD85D">
          Join our Discord Community
        </Button>
      </div>
    </div>
  )
}

const styles = ({ theme }) => css`
  /* padding: 100px 40px; */
  background: url('/img/storytellers-expanded-large.png') #1d2e47;
  background-size: cover;
  background-position: center center;
  text-align: center;
  padding-bottom: 260px;
  @media (max-width: 590px) {
    br {
      display: none;
    }
  }
  .hero-content {
    padding: 100px 40px;
    max-width: 750px;
    margin: auto;
    color: white;
    @media (max-width: 500px) {
      br {
        display: none;
      }
    }
    h1 {
      color: white;
      font-size: 2em;
      line-height: 1.25;
      font-weight: bold;
      font-family: var(--font-secondary);
    }
    .subtitle {
      margin-top: 20px;
      line-height: 1.5;
      font-size: 1.5em;
    }
    .button {
      margin-top: 20px;
      display: inline-block;
    }
  }
`
