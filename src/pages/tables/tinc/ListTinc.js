import './../../../tools/App.css';
const lib = require('../../../lib/lib_divers')

function ListTinc(props) {

  function showDetails(id) {
    if (props.mode !== 'création') {
      fetch('http://localhost:3001/tinc/get_one/' + id, lib.optionsGet())
      .then(response => response.json())  
      .then(response => {
          props.setVarGlob({
            ...props.varGlob,
            focus: response
          })
          props.setMode('sélection')
        })
    }
  }

  return (
    <div className="container mx-auto">
      <table className="cadre-15 ">
        <thead>
          <th className='largeur-50'>id</th>
          <th className='largeur-300 gauche'>type</th>
          <th className='largeur-170 gauche'>presta en charge</th>
        </thead>
        <tbody>
          {props.tincList.map(tinc =>
            <tr key={tinc.tinc_id} onClick={() => showDetails(tinc.tinc_id)}>
              <td className=''>{tinc.tinc_id}</td>
              <td className='gauche'>{tinc.tinc_nom}</td>
              <td className='gauche'>{tinc.presta_nom}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListTinc;
