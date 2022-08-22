import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'

const lib = require('../../lib/lib_divers')
const display = require('../../lib/lib_display')
const time = require('../../lib/lib_time')

function LigneInc(props) {

 // console.log('ligne', props)
  return (
    <div className="">
      ligne incident
      <table className='cadre-15 gras tab-cartouche'>
        <thead>
          <th>signalement</th>
          <th>date</th>
          <th>heure</th>
        </thead>
        <tr>
          {/* <td> {props.incident.inc_id}</td>
          <td> {time.FormatDate(props.incident.inc_signal_date)} </td>
          <td> {time.FormatHeure(props.incident.inc_signal_date)} </td> */}
        </tr>

      </table>


    </div>



  );
}

export default LigneInc;

/*        

*/