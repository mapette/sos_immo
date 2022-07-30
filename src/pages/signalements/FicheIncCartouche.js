import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'
import BoutonSubmit from '../../tools/BoutonSubmit'

const time = require('../../lib/lib_time')
const lib = require('../../lib/lib_divers')

function FicheIncCartouche(props) {

  // console.log('varglob début details',props.varGlob)
  return (
    <div>
      <div className="decal">
        <table className='cadre-15 gras tab-cartouche'>
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
        <table className='cadre-15 gras tab-cartouche'>
          <tr>
            <th colSpan='2'>emplacement</th>
          </tr>
          <tr>
            <td> {props.incident.emp_nom}</td>
            <td> étage : {props.incident.emp_etage}</td>
          </tr>
        </table>
        <table className='cadre-15 gras tab-cartouche'>
          <tr>
            <th>type d'incident</th>
            <th>entreprise affectée</th>
          </tr>
          <tr>
            <td> {props.incident.tinc_nom}</td>
            <td> {props.incident.presta_nom}</td>
          </tr>
        </table>

        {/* bouton réaffection pour imm et le boss */}

      </div>
    </div>
  );



}

export default FicheIncCartouche;

/*        

*/

