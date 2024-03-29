import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Button from '../../tools/Button'
import FicheIncCartouche from './FicheIncCartouche'
import FicheIncStatus from './FicheIncStatus'
import FicheIncJrn from './FicheIncJrn'
const lib = require('../../lib/lib_divers')

function FicheInc(props) {
  let [incident, setIncident] = useState({
    inc_id: props.varGlob.focus,
  })
  let [refresh, setRefresh] = useState(false)

  function copieElemVersIncident(response_inc) {
    setIncident({
      ...incident,
      emp_etage: response_inc.emp_etage,
      emp_id: response_inc.emp_id,
      emp_nom: response_inc.emp_nom,
      inc_signal_date: response_inc.inc_signal_date,
      inc_affect_date: response_inc.inc_affect_date,
      inc_fin_date: response_inc.inc_fin_date,
      inc_cloture_date: response_inc.inc_cloture_date,
      tinc_id: response_inc.tinc_id,
      tinc_nom: response_inc.tinc_nom,
      presta_id: response_inc.presta_id,
      presta_nom: response_inc.presta_nom,
      inc_affect_ut: response_inc.inc_affect_ut,
    })
  }

  useEffect(() => {
    fetch('http://localhost:3001/inc/get_one/' + props.varGlob.focus, lib.optionsREST('get',))
      .then(response => response.json())  // récupère que les données résultat
      .then(response => {
        copieElemVersIncident(response)
      })
  }, [, refresh])
console.log(incident.inc_fin_date)
  return (
    <div>
      <h2 className="titre gras cadre-15">
        DETAIL INCIDENT
      </h2>
      <FicheIncCartouche
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
        incident={incident}
      />
      <FicheIncStatus
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
        incident={incident}
        setIncident={setIncident}
      />
      <FicheIncJrn
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
        incident={incident}
      />
      {props.varGlob.profilScreen != 'pilotage' &&
        <Button
          txt={lib.BT_RETOUR_LISTE}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            screen: 'myReport',
            focus: '',
          })}
          couleur={'gris'}
          plein={true}
        />
      }
      {props.varGlob.profilScreen == 'usager' && incident.inc_fin_date == null &&
        <Button
          txt={lib.BT_REFRESH}
          actionToDo={() => setRefresh(!refresh)}
          couleur={'bleu'}
          plein={true}
        />
      }
      {props.varGlob.profilScreen == 'pilotage' &&
        <Button
          txt={lib.BT_RETOUR_LISTE}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            screen: 'pilot',
            focus: '',
          })}
          couleur={'gris'}
          plein={true}
        />
      }
    </div>
  );
}

export default FicheInc;
