import React, { useState, useRef } from 'react';
import './style.css';

import { Register } from './components/register/Register';
import { Registered } from './components/registered/Registered';
import { Results } from './components/results/Results';

export default function App() {

  let nameRef = useRef(null);
  let koalicjaRef = useRef(null);
  let votesRef = useRef(null);

  const [parties, setParties] = useState(new Array());
  const [resultsOn, setSwitchResults] = useState(false);
  const [registerOn, setSwitchRegister] = useState(false);
  const [allVotes, setAllVotes] = useState(0);

  const onAddParty = (e) =>
  {
    e.preventDefault();
        
    const newParty = 
    {
      key: crypto.randomUUID(),
      name: nameRef.current.value,
      isKoalicja: koalicjaRef.current.checked,
      votes: parseInt(votesRef.current.value),
    }

    nameRef.current.value = "";
    koalicjaRef.current.checked = "";
    votesRef.current.value = "";

    setParties(parties.concat(newParty))
  }

  const onRemoveParty = (party) =>
  {
    setParties(parties.filter(el => el.key != party.key));
  }
  const onEditParty = (party, newName, newIsKoalicja, newVotes) =>
  {
    const index = parties.findIndex(el => el.key == party);

    console.log("KOALICJA - ", newIsKoalicja)
    parties[index].name = newName;
    parties[index].isKoalicja = newIsKoalicja;
    parties[index].votes = newVotes;

    setParties(parties);
  }

  const showRegister = (e) =>
  {
    e.preventDefault();

    if(resultsOn) return;

    setSwitchRegister(true);
  }

  const showResults = (e) =>
  {
    e.preventDefault();

    if(!resultsOn)
    {
      setSwitchResults(true);
      let sum = 0;
      parties.forEach(el => sum += el.votes);
      setAllVotes(sum);
    }
    else
      setSwitchResults(false);
  }

  return (
    <div>
      <header class="shadow p-3 mb-5 rounded w-50 mx-auto bg-light">
        <h1 class="text-center text-primary fw-semibold">Kalkulator wyborczy</h1>
      </header>
      <Register nameRef={ nameRef } koalicjaRef={ koalicjaRef } votesRef={ votesRef } onConfirm={ onAddParty } registerOn={ registerOn } setSwitchRegister={ setSwitchRegister } />
      <div class="w-50 mb-5 mx-auto px-5 justify-content-center d-flex">
          <button type="submit" class={"btn btn-primary w-50 me-5 " + `${ resultsOn ? "opacity-50 cursor-block" : "" }`} onClick={ showRegister }>Dodaj Komitet</button>
          <button type="submit" class="btn btn-primary w-50" onClick={ showResults }>{ !resultsOn && "Pokaż" || "Ukryj" } wyniki</button>
        </div>
      <Registered parties={ parties } removeAction={ onRemoveParty } editAction={ onEditParty } resultsOn={ resultsOn } />
      <Results on={resultsOn} results={parties} allVotes={allVotes}/>
      <footer class="shadow p-3 mb-5 rounded w-50 mx-auto bg-light">
        <p class="text-center text-primary">&copy; Me</p>
      </footer>
    </div>
  );
}