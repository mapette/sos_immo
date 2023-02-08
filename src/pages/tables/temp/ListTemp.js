import './../../../tools/App.css';
const lib = require('../../../lib/lib_divers')

function ListTemp(props) {

  function showDetails(id) {
    if (props.mode !== 'création') {
      fetch('http://localhost:3001/temp/get_one/' + id, lib.optionsREST('GET',))
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
          <th className='largeur-200 gauche'>type</th>
        </thead>
        <tbody>
          {props.tempList.map(temp =>
            <tr key={temp.temp_id} onClick={() => showDetails(temp.temp_id)}>
              <td className=''>{temp.temp_id}</td>
              <td className='gauche'>{temp.temp_nom}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListTemp;
