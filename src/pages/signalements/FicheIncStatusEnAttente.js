import { useState, useEffect } from 'react';
import './../../tools/App.css';
import BoutonSubmit from '../../tools/BoutonSubmit'

const time = require('../../lib/lib_time')
const diplay = require('../../lib/lib_display')
const lib = require('../../lib/lib_divers')

function FicheIncStatusEnAttente(props) {

  let lTechnod = []
  let [lTechno, setLTechno] = useState([])
  let [lPresta, setLPresta] = useState([])
  //   

  useEffect(() => {
    // pour affectation 'forcée' (suivi des incidents)
    //  => liste des techniciens (profil valideur et imm) // presta_id : presta en charge du type d'incident
    if (props.incident.presta_id != undefined) {
      if (props.varGlob.profilEcran === 'techno'
        & (props.varGlob.profil === 'valideur' | props.varGlob.profil === 'imm')) {
        //    console.log('http://localhost:3001/get_usersByCatAndPresta/2/', props.incident.presta_id)
        fetch('http://localhost:3001/get_usersByCatAndPresta/2/' + props.incident.presta_id,
          lib.optionsGet())
          .then(response => response.json())  // récupère que les données résultat
          .then(response => {
            setLTechno(lTechno = response)
            console.log('response liste techniciens', response) // laisser cette ligne sinon ça marche pas !
          })
      }
      //  => liste des presta (profil imm)
      if (props.varGlob.profilEcran === 'techno' & props.varGlob.profil === 'imm') {
        fetch('http://localhost:3001/get_presta', lib.optionsGet())
          .then(response => response.json())  // récupère que les données résultat
          .then(response => {
            console.log('response liste presta', response) // laisser cette ligne sinon ça marche pas !
            setLPresta(response)
          })
      }
    }
  }, [props.incident])

  function soumettreAffectation(event) {
    event.preventDefault()
    console.log('varGlob********************', props.varGlob.profil)
    if (IsAffectationPossible()) {
      let data = {
        inc_id: props.varGlob.focus,
        profil: props.varGlob.profil,
      }
      if (document.getElementById("techno") !== null) {     // null si auto-affection
        data.ut_id = document.getElementById("techno").value
      }
      console.log('url', lib.determineURL('affectation', data))
      // fetch('http://localhost:3001/affectation' + props.varGlob.focus, lib.optionsGet())
      //fetch(lib.determineURL('affectation', data), lib.optionsGet())
      //   .then(response => response.json())
      //   .then(response => {
      //     //console.log('reponse bidon', response) // laisser cette ligne sinon ça marche pas !
      //     //console.log('setincident', incident)
      //     console.log('incident av', props.incident)
      //     props.setIncident({
      //       ...props.incident,
      //       inc_affect_date: time.initDate(),
      //     })
      //     console.log('incident ap', props.incident)
      //   })
      // props.setStatus('enCours')
    }
  }
  function IsAffectationPossible() {  // l'utilisateur prend lui-même en charge, l'id sera déterminé par le cookie
    let okAffection = false
    //  auto-affectation toujours possible
    if (document.getElementById("techno") !== null) {
      console.log('je suis pas null')
      okAffection = true
    }
    else {  // affectation par valideur ou immo
      if (document.getElementById("techno").value !== '') {
        console.log('je suis pas vide')
        okAffection = true
      }
    }
    return okAffection
  }

  return (
    <div>
      {props.varGlob.profil == 'technicien' &&
        <form id="affectation"
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={soumettreAffectation}
        >
          <BoutonSubmit
            couleur={'vert'}
            txt={"Je m'en charge !"}
            plein={true}
          />
        </form>
      }
      {(props.varGlob.profil == 'valideur' || props.varGlob.profil == 'imm') &&
        <form id="affectation"
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={soumettreAffectation}
        >
          <select id='techno' name='techno'
            className='largeur-200'>
            <option value=''> </option>
            {lTechno.map(elem =>
              <option
                value={elem.ut_uuid}
                key={elem.ut_uuid}>
                {elem.ut_id} - {elem.ut_prenom} {elem.ut_nom}
              </option>
            )}
          </select>
          <BoutonSubmit
            couleur={'vert'}
            txt={"Affecter un.e technicien.ne"}
            plein={true}
          />
        </form>
      }
      {/* {(props.varGlob.profil == 'imm') &&
        <form id="attribution"
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={affectation}
        >
          <select id='presta' name='prestat'
            className='largeur-200'>
            <option value=''> </option>
            {setLPresta.map(elem =>
              <option
                value={elem.presta_id}
                key={elem.presta_id}>
                {elem.presta_nom} - {elem.presta_libelle}
              </option>
            )}
          </select>
          <BoutonSubmit
            couleur={'vert'}
            txt={"changer le prestataire en charge"}
            plein={true}
          />
        </form>
      } */}
    </div>
  );

}

export default FicheIncStatusEnAttente;

/*        

*/

