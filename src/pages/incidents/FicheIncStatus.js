import { useState, useEffect } from 'react';
import './../../tools/App.css';
import FicheIncAffectation from './FicheIncAffectation'
import FicheIncAttribution from './FicheIncAttribution'
import FicheIncFin from './FicheIncFin'
import FicheIncCloture from './FicheIncCloture'
const time = require('../../lib/lib_time')
const lib = require('../../lib/lib_divers')

function FicheIncStatus(props) {
  let [status, setStatus] = useState('')
  useEffect(() => {
    setStatus(lib.determineStatus(props.incident.inc_affect_date, props.incident.inc_fin_date, props.incident.inc_cloture_date,))
  }, [props.incident])

  return (
    <div>
      {status === 'enAttente' &&
        <h3>{lib.statusLibelle(status)}</h3>
      }
      {status === 'enAttente' &&
        props.varGlob.profilEcran !== 'usager' &&
        <FicheIncAffectation
          status={status}
          setStatus={setStatus}
          varGlob={props.varGlob}
          incident={props.incident}
          setIncident={props.setIncident}
        />
      }
      {status === 'enAttente' &&
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

      {status === 'enCours' &&
        <span>
          <h4>{lib.statusLibelle(status)}</h4>
          <h5>le {time.formatDate(props.incident.inc_affect_date)} à {time.formatHeure(props.incident.inc_affect_date)}</h5>
        </span>
      }
      {status === 'enCours' &&
        props.varGlob.profilEcran !== 'usager' &&
        <FicheIncFin
          status={status}
          setStatus={setStatus}
          varGlob={props.varGlob}
          incident={props.incident}
          setIncident={props.setIncident}
        />
      }
      {status === 'enCours' &&
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
      {status === 'termine' && <h3>{lib.statusLibelle(status)}</h3>}
      {status === 'termine' && props.varGlob.profilEcran !== 'usager' &&
        <h3>En attente de validation</h3>}
      {status === 'termine' &&
        props.varGlob.profilEcran === 'usager' &&
        <FicheIncCloture
          status={status}
          setStatus={setStatus}
          varGlob={props.varGlob}
          setVarGlob={props.setVarGlob}
          incident={props.incident}
          setIncident={props.setIncident}
        />
      }
      {status === 'clos' &&
        <h3>{lib.statusLibelle(status)}</h3>
      }
    </div>
  );
}

export default FicheIncStatus;
