import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'
import BoutonSubmit from '../../tools/BoutonSubmit'

const time = require('../../lib/lib_time')
const diplay = require('./../../lib/lib_display')
const lib = require('./../../lib/lib_divers')

function DetailsInc(props) {
  let [status, setStatus] = useState('')
  let [incident, setIncident] = useState({
    inc_uuid: props.focus,
  })

  function affectation(event, id, setFocus) {
    fetch('http://localhost:3001/charge' + id, {
      method: 'get',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(response => {
        console.log('reponse bidon', response) // laisser cette ligne sinon ça marche pas !
        setFocus('')
        console.log('setincident', incident)
        setIncident({
          ...incident,
          inc_affect_date: time.initDate(),
        })
        console.log('setincident', incident)
      })
  }

  function copieElemVersIncident(elem) {
    setIncident({
      ...incident,
      emp_etage: elem.emp_etage,
      emp_nom: elem.emp_nom,
      inc_signal_comm: elem.inc_signal_comm,
      inc_signal_date: elem.inc_signal_date,
      inc_jrn_interv: elem.inc_jrn_interv,
      inc_affect_date: elem.inc_affect_date,
      inc_fin_date: elem.inc_fin_date,
      tinc_nom: elem.tinc_nom,
      presta_nom: elem.presta_nom,
      ut_nom: elem.ut_nom,
      ut_prenom: elem.ut_prenom,
      ut_tel: elem.ut_tel,
    })
  }

  useEffect(() => {
    props.lInc.forEach(elem => {
      if (elem["inc_uuid"] === props.focus) {
        copieElemVersIncident(elem)
        setStatus(lib.determineStatus(incident.inc_affect_date, incident.inc_fin_date))
      }
    });
  }, [status])

  // console.log('incident sélectionné', incident)
  return (
    <div className={diplay.ficheDisplay(true, status, props.profil_ecran)}>
      <div>
        {time.FormatDate(incident.inc_signal_date)} à {time.FormatHeure(incident.inc_signal_date)}
      </div>
      <br />
      <div>
        étage {incident.emp_etage} - {incident.emp_nom}
      </div>
      <div>
        {incident.tinc_nom}
      </div>
      <div>
        info signalement : {incident.inc_signal_comm}
      </div>
      {props.profil_ecran != 'usager' &&
        <div>
          <br />
          <div>
            signalement {incident.ut_prenom}  {incident.ut_nom}
          </div>
          <div>
            tél {incident.ut_tel}
          </div>
        </div>
      }
      <div>
        status : {lib.statusLibelle(status)}
      </div>
      <br />
      <div>
        info intervention : <br/> {incident.inc_jrn_interv}
      </div>
      <br/>
      {(props.profil_ecran != 'usager') &&
        <form id="commentaire_techno"
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={majCommentaire}
        >
          <textarea type='text'
            id='comm' name='comm'
            rows="3" cols="36"
            placeholder="complément info :"
         />
          <BoutonSubmit
            couleur={'orange'}
            txt={'commentaire'}
            plein={true}
            id={incident.inc_uuid}
            setFocus={props.setFocus}
          />
        </form>
      }
      <br />
      {(props.profil_ecran != 'usager' && status === 'enAttente') &&
        <BoutonSubmit
          submitToDo={affectation}
          couleur={'rouge'}
          txt={'affectation'}
          plein={true}
          id={incident.inc_uuid}
          setFocus={props.setFocus}
        />
      }
      {(props.profil_ecran != 'usager' && status === 'enCours') &&
        <BoutonSubmit
          submitToDo={affectation}
          couleur={'rouge'}
          txt={'terminé'}
          plein={true}
          id={incident.inc_uuid}
          setFocus={props.setFocus}
        />
      }
      <Bouton
        txt={'annuler'}
        actionToDo={() => props.setFocus('')}
        couleur={'vert'}
        plein={true}
      />
    </div>
  );

  function majCommentaire(event) {
    event.preventDefault()   
    if(document.getElementById("comm").value != ''){
      console.log('ex',incident.inc_jrn_interv)
      console.log('maj',document.getElementById("comm").value)
      let newText = `${lib.cleanNothing(incident.inc_jrn_interv)}
      ${time.FormatDate(time.initDate())} ${time.FormatHeure(time.initDate())}- ${document.getElementById("comm").value} - `
      
      let data = {
        id: incident.inc_uuid,
        comm: newText
        // + '\n' + document.getElementById("comm").value,
      }
      console.log('commentaire ', data)
      fetch('http://localhost:3001/update_comm_presta', {
        method: 'post',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      // .then(response => response.json())
      //   .then(
      //     props.setVarGlob({
      //       ...props.varGlob,
      //       ecran: 'demandes',
      //       profil_ecran: 'usager',
      //     }))
    }
  
  
    }

}

export default DetailsInc;

/*        

*/

