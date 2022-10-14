import './../../tools/App.css';

const time = require('../../lib/lib_time')

function ListeInc(props) {

  function showDetails(id) {
    props.setVarGlob({
      ...props.varGlob,
      focus: id,
      ecran: 'detailsInc',
      pilotage: true,
    })
  }

  return (
      <table className='cadre-15 mx-auto'>
        <thead>
          <th>id</th>
          <th>emplacement</th>
          <th>étage</th>
          <th>incident</th>
          <th>presta</th>
          <th>signalement</th>
          <th>affectation</th>
          <th>fin intervention</th>
          <th>clôture</th>
          <th>temps restant</th>
        </thead>
        <tbody>
          {props.lInc.map(ligne => ligne.inc_affect_date === null &&
            <tr key={ligne.inc_id} onClick={() => showDetails(ligne.inc_id)}>
              <td>{ligne.inc_id}</td>
              <td>{ligne.emp_nom}</td>
              <td>{ligne.emp_etage}</td>
              <td>{ligne.tinc_nom}</td>
              <td>{ligne.presta_nom}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_signal_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_affect_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_fin_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_cloture_date)}</td>
              <td width='200px'>{time.tempsRestant(ligne.inc_signal_date, ligne.inc_fin_date)}</td>
            </tr>
          )}
          {props.lInc.map(ligne => ligne.inc_affect_date != null && ligne.inc_fin_date === null &&
            <tr key={ligne.inc_id} onClick={() => showDetails(ligne.inc_id)}>
              <td>{ligne.inc_id}</td>
              <td>{ligne.emp_nom}</td>
              <td>{ligne.emp_etage}</td>
              <td>{ligne.tinc_nom}</td>
              <td>{ligne.presta_nom}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_signal_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_affect_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_fin_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_cloture_date)}</td>
              <td width='200px'>{time.tempsRestant(ligne.inc_signal_date, ligne.inc_fin_date)}</td>
            </tr>
          )}
          {props.lInc.map(ligne => ligne.inc_fin_date != null && ligne.inc_cloture_date === null &&
            <tr key={ligne.inc_id} onClick={() => showDetails(ligne.inc_id)}>
              <td>{ligne.inc_id}</td>
              <td>{ligne.emp_nom}</td>
              <td>{ligne.emp_etage}</td>
              <td>{ligne.tinc_nom}</td>
              <td>{ligne.presta_nom}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_signal_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_affect_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_fin_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_cloture_date)}</td>
              <td width='200px'>{time.tempsRestant(ligne.inc_signal_date, ligne.inc_fin_date)}</td>
            </tr>
          )}
          {props.lInc.map(ligne => ligne.inc_cloture_date !== null &&
            <tr key={ligne.inc_id} onClick={() => showDetails(ligne.inc_id)}>
              <td>{ligne.inc_id}</td>
              <td>{ligne.emp_nom}</td>
              <td>{ligne.emp_etage}</td>
              <td>{ligne.tinc_nom}</td>
              <td>{ligne.presta_nom}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_signal_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_affect_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_fin_date)}</td>
              <td width='200px'>{time.displayDatePilotage(ligne.inc_cloture_date)}</td>
              <td width='200px'>{time.tempsRestant(ligne.inc_signal_date, ligne.inc_fin_date)}</td>
            </tr>
          )}
        </tbody>
      </table>
  );
}

export default ListeInc;

/*        

*/