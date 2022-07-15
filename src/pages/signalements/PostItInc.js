import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'

const time = require('../../lib/lib_time')
const diplay = require('./../../lib/lib_display')
const lib = require('./../../lib/lib_divers')


function PostItInc(props) {
  let [status, setStatus] = useState(lib.determineStatus(props.elem.inc_affect_date,props.elem.inc_fin_date))

  function showDetails(id) {
    console.log(id)
    props.setFocus(id)
  }
  // console.log('postIt : ',status)
  // console.log('elem', props.elem)
  return (
    <button onClick={() => showDetails(props.elem.inc_uuid)} className={diplay.ficheDisplay(false, status)}>
      <div>
        {time.FormatDate(props.elem.inc_signal_date)}
      </div>
      <div>
        {time.FormatHeure(props.elem.inc_signal_date)}
      </div>
      <div>
        étage {props.elem.emp_etage}
      </div>
      <div>
        {props.elem.emp_nom}
      </div>
      <div>
        {props.elem.tinc_nom}
      </div>
    </button>
  );
}

export default PostItInc;

/*        
{(props.ecran != 'demandes') &&
        <div>
          <div>
            signalé par :
          </div>
          <div>
            {props.elem.ut_prenom}
          </div>
          <div>
            {props.elem.ut_nom}
          </div>
          <div>
            tél {props.elem.ut_tel}
          </div>
        </div>
      }
*/