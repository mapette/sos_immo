import { useState, useEffect } from 'react';
import './../../tools/App.css';
import FicheIncAffectation from './FicheIncAffectation'
import FicheIncAttribution from './FicheIncAttribution'

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

      {status == 'enAttente' &&
        <h3>{lib.statusLibelle(status)}</h3>
      }
      {status == 'enAttente' &&
        props.varGlob.profilEcran !== 'usager' &&
        <FicheIncAffectation
          status={status}
          setStatus={setStatus}
          varGlob={props.varGlob}
          incident={props.incident}
          setIncident={props.setIncident}
        />
      }
      {status == 'enAttente' &&
        props.varGlob.profilEcran !== 'usager' &&
        props.varGlob.profil !== 'technicien' &&
        <FicheIncAttribution
          status={status}
          setStatus={setStatus}
          varGlob={props.varGlob}
          incident={props.incident}
          setIncident={props.setIncident}
        />
      }

      {status == 'enCours' &&
        <span>
          <h4>{lib.statusLibelle(status)}</h4>
          <h5>le {time.FormatDate(props.incident.inc_affect_date)} à {time.FormatHeure(props.incident.inc_affect_date)}</h5>
        </span>
      }
      {status == 'enCours' &&
        props.varGlob.profilEcran !== 'usager' &&
        props.varGlob.profil !== 'technicien' &&
        <span>
          <FicheIncAffectation
            status={status}
            setStatus={setStatus}
            varGlob={props.varGlob}
            incident={props.incident}
            setIncident={props.setIncident}
          />
          <FicheIncAttribution
            status={status}
            setStatus={setStatus}
            varGlob={props.varGlob}
            incident={props.incident}
            setIncident={props.setIncident}
          />
        </span>
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

