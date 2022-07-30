import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'
import BoutonSubmit from '../../tools/BoutonSubmit'

const time = require('../../lib/lib_time')
const diplay = require('../../lib/lib_display')
const lib = require('../../lib/lib_divers')

function FicheIncCartouche(props) {
  let [status, setStatus] = useState('')
  let [incident, setIncident] = useState({
    inc_id: props.varGlob.focus,
  })

  function affectation(event, id, setFocus) {
    fetch('http://localhost:3001/charge' + id, lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        console.log('reponse bidon', response) // laisser cette ligne sinon ça marche pas !
        console.log('setincident', incident)
        setIncident({
          ...incident,
          inc_affect_date: time.initDate(),
        })
        console.log('setincident', incident)
      })
  }

 /*
  changer la couleur à chaque ligne dans un tableau
tr:nth-child(even) {background: white}
tr:nth-child(odd) {background: #BBBBBB}	
*/


  // console.log('varglob début details',props.varGlob)
  return (
    <div>
      <h2 className="titre gras cadre-15">
        DETAIL INCIDENT
      </h2>
      <div className='gauche cadre-15'>
        <div>
          signalement du {time.FormatDate(incident.inc_signal_date)} à {time.FormatHeure(incident.inc_signal_date)}
        </div>
        <br />
        <div>
          incident
          étage {incident.emp_etage} - {incident.emp_nom}
        </div>
        <div>
          {incident.tinc_nom}
        </div>
        <div>
          info signalement : {incident.inc_signal_comm}
        </div>
        {props.profilEcran != 'usager' &&
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
          info intervention : <br /> {incident.inc_jrn_interv}
        </div>
        <br />
        {(props.profilEcran != 'usager') &&
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
        {(props.profilEcran != 'usager' && status === 'enAttente') &&
          <BoutonSubmit
            submitToDo={affectation}
            couleur={'rouge'}
            txt={'affectation'}
            plein={true}
            id={incident.inc_uuid}
            setFocus={props.setFocus}
          />
        }
        {(props.profilEcran != 'usager' && status === 'enCours') &&
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
    </div>
  );

  function majCommentaire(event) {
    event.preventDefault()
    if (document.getElementById("comm").value != '') {
      console.log('ex', incident.inc_jrn_interv)
      console.log('maj', document.getElementById("comm").value)
      let newText = `${lib.cleanNothing(incident.inc_jrn_interv)}
      ${time.FormatDate(time.initDate())} ${time.FormatHeure(time.initDate())}- ${document.getElementById("comm").value} - `

      let data = {
        id: incident.inc_uuid,
        comm: newText
        // + '\n' + document.getElementById("comm").value,
      }
      console.log('commentaire ', data)
      fetch('http://localhost:3001/update_comm_presta', lib.optionsPost(data))
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

export default FicheIncCartouche;

/*        

*/

