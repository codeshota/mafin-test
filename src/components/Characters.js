import character from '../store/character';
import { observer } from 'mobx-react-lite';
import ReactTooltip from "react-tooltip";
import './characters.css';

const Characters = observer(() => {
  const findCharacters = (e) => {
    character.setName(e.target.value);
    character.filterCharacters();
  }

  const characters = character.characters.map((c) => {
    return (
      <div key={c.id} className="card">
        <img src={c.image}
          alt={"character " + c.name}
          data-tip
          data-for={'registerTip-' + c.id}
        />

        <ReactTooltip
          id={'registerTip-' + c.id}
          place="bottom"
          effect="solid"
          multiline={true}
          className='card-tooltip'
          arrowColor="white"
        >
          Name: {c.name}
          <br />
          Status: {c.status}
          <br />
          Species: {c.species}
        </ReactTooltip>
      </div>
    )
  })

  return (
    <div className="characters-block">
      <div className="input-wrap">
        <input
          type="text"
          className="input-filter"
          value={character.name}
          onChange={findCharacters}
        />
      </div>

      <div className="cards-wrap">
        {characters}
      </div>
    </div>
  )
})

export default Characters;
