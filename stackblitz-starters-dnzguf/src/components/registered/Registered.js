import React, { useRef, useState } from 'react';
import './style.css';

import { Register } from '../register/Register';

export function Registered(props) {

  let nameRef = useRef(null);
  let koalicjaRef = useRef(null);
  let votesRef = useRef(null);

  const [registerOn, setSwitchRegister] = useState(false);
  const [currentParty, setCurrentParty] = useState(null);

  const showRegister = (party) =>
  {
    setCurrentParty(party.key);

    nameRef.current.value = party.name;
    koalicjaRef.current.checked = party.isKoalicja;
    votesRef.current.value = party.votes;

    setSwitchRegister(true);
  }

  const editParty = (e) =>
  {
    e.preventDefault();
    
    props.editAction(currentParty, nameRef.current.value, koalicjaRef.current.checked, parseInt(votesRef.current.value))

    nameRef.current.value = "";
    koalicjaRef.current.checked = false;
    votesRef.current.value = "";

    setSwitchRegister(false);
  }

  return (
    <div class="shadow p-3 mb-5 rounded w-50 mx-auto bg-light">
    <Register nameRef={ nameRef } koalicjaRef={ koalicjaRef } votesRef={ votesRef } onConfirm={ editParty } registerOn={ registerOn } setSwitchRegister={ setSwitchRegister } />
      <h3 class="text-center text-primary fw-semibold">Zarejestrowane komitety</h3>
      <ol class="list-group list-group-numbered">
        {
          props.parties.map(el => {
            const removeEvent = (e) =>
            {
              e.preventDefault();

              props.removeAction(el);
            }

            const editEvent = (e) =>
            {
              e.preventDefault();

              showRegister(el);
            }

            return <ListItem key={ el.key } name={ el.name } isKoalicja={ el.isKoalicja } votes={ el.votes } removeEvent={ removeEvent } resultsOn={ props.resultsOn } editEvent={ editEvent } />
          })
        }
      </ol>
    </div>
  );
}

function ListItem(props)
{
  return (
    <li class="list-group-item d-flex p-3 fs-6">
      <div>
        <b>&nbsp; { props.name }</b> { props.isKoalicja ? "jest koalicją" : "nie jest koalicją" }, ilość głosów: <b>{ props.votes }</b> 
      </div>
      <div class={"ms-auto " + `${props.resultsOn ? "d-none" : "d-block"}`}>
        <button type="button" class="btn btn-outline-secondary me-2 btn-sm" onClick={ props.editEvent }>Edytuj</button>
        <button type="button" class="btn btn-outline-danger btn-sm" onClick={ props.removeEvent }>Usuń</button>
      </div>
    </li>
  );
}