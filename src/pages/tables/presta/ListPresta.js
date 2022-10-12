import './../../../tools/App.css';

const lib = require('../../../lib/lib_divers')

function ListPresta(props) {

  function showDetails(id) {
    fetch('http://localhost:3001/get_presta/' + id, lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        console.log('response',response)
        props.setFocus(response)
   //     props.setMode("selection")
      })
  }

  return (
    <div className="container no-gutter">
      <table className="cadre-15 width-90p">
        <thead>
          <th className='largeur-50'>id</th>
          <th className='largeur-110 gauche'>nom</th>
          <th className='largeur-200 gauche'>libellé</th>
        </thead>
        <tbody>
          {props.prestaList.map(presta =>
            <tr key={presta.presta_id} onClick={() => showDetails(presta.presta_id)}>
              <td className=''>{presta.presta_id}</td>
              <td className='gauche'>{presta.presta_nom}</td>
              <td className='gauche'>{presta.presta_libelle}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListPresta;
