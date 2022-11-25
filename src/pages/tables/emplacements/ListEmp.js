import './../../../tools/App.css';

const lib = require('../../../lib/lib_divers')

function ListEmp(props) {

  function showDetails(id) {
    if (props.mode !== 'création') {
      fetch('http://localhost:3001/get_emp/' + id, lib.optionsGet())
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
          <th className='largeur-50'>étage</th>
          <th className='largeur-200 gauche'>nom</th>
          <th className='largeur-200 gauche'>type</th>
        </thead>
        <tbody>
          {props.empList.map(emp =>
            <tr key={emp.emp_id} onClick={() => showDetails(emp.emp_id)}>
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
