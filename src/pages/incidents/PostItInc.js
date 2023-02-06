import { useState } from 'react';
import './../../tools/App.css';
const time = require('../../lib/lib_time')
const display = require('./../../lib/lib_display')
const lib = require('./../../lib/lib_divers')

function PostItInc(props) {
  let [status, setStatus] = useState(lib.determineStatus(props.elem.inc_affect_date, props.elem.inc_fin_date, props.elem.inc_cloture_date))

  function showDetails(id) {
    props.setVarGlob({
      ...props.varGlob,
      focus: id,
      screen: 'detailsInc'
    })
  }
  //fichePostItDisplay
  if (props.varGlob.profilScreen === 'usager') {
    return (
      <button onClick={() => showDetails(props.elem.inc_id)} className={display.postItDisplay(props.varGlob.profilScreen, status)}>
        <div>
          incident {props.elem.inc_id}
        </div>
        <div>
          {time.formatDate(props.elem.inc_signal_date)}
        </div>
        <div>
          {time.formatHeure(props.elem.inc_signal_date)}
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
  else if (props.varGlob.profilScreen === 'techno') {
    let ESPACE = ' '
    let TAQUET = ' | '
    let TIRET = ' - '
    let FLECHE = ' => '
    return (
      <button onClick={() => showDetails(props.elem.inc_id)} className={display.postItDisplay(props.varGlob.profilScreen, status)}>
        <div>
          {props.elem.inc_id}
          {TIRET}
          {time.formatDate(props.elem.inc_signal_date)}
          {ESPACE}
          {time.formatHeure(props.elem.inc_signal_date)}
          {TAQUET}
          étage {props.elem.emp_etage}
          {TAQUET}
          {props.elem.emp_nom}
          {FLECHE}
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
