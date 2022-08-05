import { useState, useEffect } from 'react';
import './../../tools/App.css';

const time = require('../../lib/lib_time')
const diplay = require('./../../lib/lib_display')
const lib = require('./../../lib/lib_divers')


function PostItInc(props) {
  let [status, setStatus] = useState(lib.determineStatus(props.elem.inc_affect_date, props.elem.inc_fin_date, props.elem.inc_cloture_date))

  function showDetails(id) {
    props.setVarGlob({
      ...props.varGlob,
      focus: id,
      ecran: 'detailsInc'
    })
  }

  if (props.varGlob.profilEcran == 'usager') {
    return (
      <button onClick={() => showDetails(props.elem.inc_id)} className={diplay.fichePostItDisplay(status)}>
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
    )
  }
  else if (props.varGlob.profilEcran == 'techno') {
    let espace = ' '
    let taquet = ' | '
    return (
      <button onClick={() => showDetails(props.elem.inc_id)} className={diplay.rubanPostItDisplay(status)}>
        <div>
          {time.FormatDate(props.elem.inc_signal_date)}
          {espace}
          {time.FormatHeure(props.elem.inc_signal_date)}
          {taquet}
          étage {props.elem.emp_etage}
          {taquet}
          {props.elem.emp_nom}
          {' => '}
          {props.elem.tinc_nom}
        </div>
      </button>
    )
  }
  else {
    return (<h1>COMPRENDS PAS</h1>)
  }

}

export default PostItInc;

/*        

*/