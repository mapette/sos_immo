import { useState, useEffect } from 'react';
import './../../tools/App.css';
import FicheIncStatusEnAttente from './FicheIncStatusEnAttente'

const time = require('../../lib/lib_time')
const diplay = require('../../lib/lib_display')
const lib = require('../../lib/lib_divers')

function FicheIncStatus(props) {
  let [status, setStatus] = useState('')
  useEffect(() => {
    setStatus(lib.determineStatus(props.incident.inc_affect_date, props.incident.inc_fin_date))
  }, [props.incident])

  return (
    <div>
      <h3>STATUS : {lib.statusLibelle(status)} </h3>
      {status == 'enAttente' &&
        <FicheIncStatusEnAttente
          status={status}
          setStatus={setStatus}
          varGlob={props.varGlob}
          setVarGlob={props.setVarGlob}
          incident={props.incident}
          setIncident={props.setIncident}
        />
      }
      {status == 'enCours' &&
        <div>
          <h1>EN COURS</h1>
        </div>
      }
      {status == 'AValider' &&
        <div>
          <h1>A VALIDER</h1>
        </div>
      }
      {status == 'cloture' &&
        <div>
          <h1>CLOTURE</h1>
        </div>
      }
    </div>
  );

}

export default FicheIncStatus;

/*        

*/

