import './../../../tools/App.css';

const lib = require('../../../lib/lib_divers')

function ListPresta(props) {

  function showDetails(id) {
    if (props.mode !== 'création') {
      fetch('http://localhost:3001/get_presta/' + id, lib.optionsGet())
        .then(response => response.json())
        .then(response => {
          console.log('response', response)
          props.setVarGlob({
            ...props.varGlob,
            focus: response
          })
          props.setMode('sélection')
        })
    }
  }
  
  return (
    <div className="container no-gutter mx-auto">
      <table className="cadre-15 width-90p ">
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
