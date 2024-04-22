import React from 'react';
import './style.css';

export function Register(props) {
  const closeRegister = (e) =>
  {
    e.preventDefault();
    
    props.nameRef.current.value = "";
    props.koalicjaRef.current.checked = "";
    props.votesRef.current.value = "";    

    props.setSwitchRegister(false)
  }

  return (
    <div class={"popup-container z-3 w-100 h-100 position-absolute top-50 start-50 translate-middle " + `${props.registerOn ? 'd-block' : 'd-none'}`}>
      <div class="shadow p-4 mb-5 rounded w-50 mx-auto bg-light position-absolute top-50 start-50 translate-middle">
        <h3 class="text-center text-primary fw-semibold mb-4">Rejestracja komitetów</h3>
        <form class="mx-auto">
          <div class="mb-4 w-50 mx-auto">
            <label for="name" class="form-label">Nazwa komitetu:</label>
            <input type="text" class="form-control" id="name" ref={ props.nameRef }/>
          </div>
          <div class="mb-2 w-25 form-check mx-auto">
            <input type="checkbox" class="form-check-input" id="koalicja" ref={ props.koalicjaRef }/>
            <label class="form-check-label" for="koalicja">Czy jest koalicją?</label>
          </div>
          <div class="mb-4 w-50 mx-auto">
            <label for="votes" class="form-label">Ilość głosów:</label>
            <input type="text" class="form-control" id="votes" ref={ props.votesRef }/>
          </div>
          <div class="mx-auto px-5 justify-content-center d-flex">
            <button type="submit" class="btn btn-primary w-50 me-5" onClick={ props.onConfirm }>Zatwierdz</button>
            <button type="submit" class="btn btn-primary w-50" onClick={ closeRegister }>Anuluj</button>
          </div>
        </form>
      </div>
    </div>
  );
}