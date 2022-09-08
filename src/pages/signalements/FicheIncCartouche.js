import './../../tools/App.css';

const time = require('../../lib/lib_time')

function FicheIncCartouche(props) {

 return (
    <div>
      <div className="decal">
        <table className='cadre-15 gras width-75p'>
          <thead>
            <th>signalement</th>
            <th>date</th>
            <th>heure</th>
          </thead>
          <tr>
            <td> {props.incident.inc_id}</td>
            <td> {time.FormatDate(props.incident.inc_signal_date)} </td>
            <td> {time.FormatHeure(props.incident.inc_signal_date)} </td>
          </tr>
        </table>
        <table className='cadre-15 gras width-75p'>
          <tr>
            <th colSpan='2'>emplacement</th>
          </tr>
          <tr>
            <td> {props.incident.emp_nom}</td>
            <td> étage : {props.incident.emp_etage}</td>
          </tr>
        </table>
        <table className='cadre-15 gras width-75p'>
          <tr>
            <th>type d'incident</th>
            <th>entreprise affectée</th>
          </tr>
          <tr>
            <td> {props.incident.tinc_nom}</td>
            <td> {props.incident.presta_nom}</td>
          </tr>
        </table>
      </div>
    </div>
  );



}

export default FicheIncCartouche;

/*        

*/

