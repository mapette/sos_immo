import './../../tools/App.css';
const time = require('../../lib/lib_time')

function ListeIncLine(props) {

  function showDetails(id) {
    props.setVarGlob({
      ...props.varGlob,
      focus: id,
      ecran: 'detailsInc',
      pilotage: true,
    })
  }

  return (
    <tr key={props.ligne.inc_id} onClick={() => showDetails(props.ligne.inc_id)}>
      <td>{props.ligne.inc_id}</td>
      <td className='largeur-200'>{props.ligne.emp_nom}</td>
      <td>{props.ligne.emp_etage}</td>
      <td className='largeur-200'>{props.ligne.tinc_nom}</td>
      <td className='largeur-110'>{props.ligne.presta_nom}</td>
      <td className='largeur-200'>{time.displayDatePilotage(props.ligne.inc_signal_date)}</td>
      <td className='largeur-200'>{time.displayDatePilotage(props.ligne.inc_affect_date)}</td>
      <td className='largeur-200'>{time.displayDatePilotage(props.ligne.inc_fin_date)}</td>
      <td className='largeur-200'>{time.displayDatePilotage(props.ligne.inc_cloture_date)}</td>
      <td className='largeur-200'>{time.tempsRestant(props.ligne.inc_signal_date, props.ligne.inc_fin_date)}</td>
    </tr>
  );
}

export default ListeIncLine;
