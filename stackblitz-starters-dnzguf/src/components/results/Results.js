import React from 'react';
import './style.css';

export function Results({ on, results, allVotes }) {

  return (
    <div class="shadow p-3 mb-5 rounded w-50 mx-auto bg-light">
      <h3 class="text-center text-primary fw-semibold">Wyniki wyborów</h3>
      <table class="table table-borderless">
        <thead class="table table-secondary border-top-0 border-start-0 border-end-0 border-2">
          <tr>
            <th>LP</th>
            <th>Nazwa komitetu</th>
            <th>Próg wyborczy (%)</th>
            <th>Ilość głosów</th>
            <th>Wynik procentowy</th>
          </tr>
        </thead>
        <tbody>
          { on && results.map((el, index) => <Result key={el.key} index={index + 1} name={el.name} isKoalicja={el.isKoalicja} votes={el.votes} percent={Math.round(el.votes / allVotes * 10000) / 100}/>) }
        </tbody>
      </table>

    </div>
  );
}

function Result(props)
{
  const minPercent = props.isKoalicja ? 8 : 5;
  const classColor = minPercent > props.percent ? "table-danger" : "table-success"

  return (
    <tr class={ classColor }>
      <td>{ props.index }</td>
      <td>{ props.name }</td>
      <td>{ minPercent }</td>
      <td>{ props.votes }</td>
      <td>{ props.percent }%</td>
    </tr>
  );
}