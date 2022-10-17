import './../../../tools/App.css';

const lib = require('../../../lib/lib_divers')

function ListEmp(props) {

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
  console.log(props)
  return (
    <div className="container no-gutter mx-auto">
      <table className="cadre-15 ">
        <thead>
          <th className='largeur-50'>id</th>
          <th className='largeur-110'>étage</th>
          <th className='largeur-200 gauche'>nom</th>
          <th className='largeur-200 gauche'>type</th>
        </thead>
        <tbody>
          {props.empList.map(emp =>
            <tr key={emp.emp_id} onClick={() => showDetails(emp.presta_id)}>
              <td className=''>{emp.emp_id}</td>
              <td className=''>{emp.emp_etage}</td>
              <td className='gauche'>{emp.emp_nom}</td>
              <td className='gauche'>{emp.temp_nom}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmp;
