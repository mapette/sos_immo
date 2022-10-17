import './../../tools/App.css';

const time = require('../../lib/lib_time')

function FicheIncCartouche(props) {
console.log(props.incident)
 return (
    <div>
      <div className="decal">
        <table className='cadre-15 gras mx-auto'>
          <thead>
            <th className='largeur-200'>signalement</th>
            <th className='largeur-300'>date</th>
            <th className='largeur-300'>heure</th>
          </thead>
          <tr>
            <td> {props.incident.inc_id}</td>
            <td> {time.formatDate(props.incident.inc_signal_date)} </td>
            <td> {time.formatHeure(props.incident.inc_signal_date)} </td>
          </tr>
        </table>
        <table className='cadre-15 gras mx-auto '>
          <tr>
            <th colSpan='2'>emplacement</th>
          </tr>
          <tr>
            <td className='largeur-400'> {props.incident.emp_nom}</td>
            <td className='largeur-400'> étage : {props.incident.emp_etage}</td>
          </tr>
        </table>
        <table className='cadre-15 gras mx-auto '>
          <tr>
            <th >type d'incident</th>
            <th>entreprise affectée</th>
          </tr>
          <tr>
            <td className='largeur-400'> {props.incident.tinc_nom}</td>
            <td  className='largeur-400'> {props.incident.presta_nom}</td>
          </tr>
        </table>
      </div>
    </div>
  );



}

export default FicheIncCartouche;

/*        

*/

