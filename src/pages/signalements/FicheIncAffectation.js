import { useState, useEffect } from 'react';
import './../../tools/App.css';
import BoutonSubmit from '../../tools/BoutonSubmit'

const time = require('../../lib/lib_time')
const lib = require('../../lib/lib_divers')

function FicheIncAffectation(props) {
  let [lTechno, setLTechno] = useState([])

  useEffect(() => {
    // pour affectation 'forcée' (suivi des incidents)
    //  => liste des techniciens (profil valideur et imm) // presta_id : presta en charge du type d'incident
    if (props.incident.presta_id != undefined) {
      if (props.varGlob.profilEcran === 'techno'
        & (props.varGlob.profil === 'valideur' | props.varGlob.profil === 'imm')) {
        console.log('http://localhost:3001/get_usersByCatAndPresta/2/', props.incident.presta_id)
        fetch('http://localhost:3001/get_usersByCatAndPresta/2/' + props.incident.presta_id,
          lib.optionsGet())
          .then(response => response.json())  // récupère que les données résultat
          .then(response => {
            setLTechno(lTechno = response)
            console.log('response liste techniciens', response) // laisser cette ligne sinon ça marche pas !
            // ajouter le technicien au props.incident - si <> enAttente (pour l'affichage)
            if (props.status !== 'enAttente' & props.incident.inc_affect_id === undefined) {
              lTechno.forEach(element => {
                if (element.ut_uuid == props.incident.inc_affect_ut) {
                  props.setIncident({
                    ...props.incident,
                    inc_affect_id: element.ut_id,
                    inc_affect_nom: element.ut_nom,
                    inc_affect_prenom: element.ut_prenom,
                  })
                }
              })
            }
          })
      }
    }
  }, [props.incident])
console.log('ficIncAff', props.varGlob.profilEcran)
  function soumettreAffectation(event) {
    event.preventDefault()
    if (IsAffectationPossible()) {
      let data = {
        inc_id: props.varGlob.focus,
        profil: props.varGlob.profil,
        status: props.status,
      }
      if (document.getElementById("techno") !== null) {     // null si auto-affection
        data.ut_id = document.getElementById("techno").value
      }
      fetch(lib.determineURL('affectation', data), lib.optionsGet())
        .then(response => response.json())
        .then(response => {
           props.setIncident({
            ...props.incident,
            inc_affect_date: time.initDate(),
            inc_affect_ut: data.ut_id ,
          })
        })
      props.setStatus('enCours')
    }
  }
  function IsAffectationPossible() {
    let okAffection = false
    //  auto-affectation toujours possible
    if (document.getElementById('techno') === null) {
      // l'utilisateur prend lui-même en charge, l'id sera déterminé par le cookie
      okAffection = true
    }
    else {  // affectation par valideur ou immo
      if (document.getElementById('techno').value !== '') {
        // empêcher ré-affectation au même technicien
        if (document.getElementById('techno').value !== props.incident.inc_affect_ut) {
          okAffection = true
        }
      }
    }
    return okAffection
  }
  function libelleBoutonAffectation() {
    console.log('props.status', props)
    let libelle = 'Affecter un.e technicien.ne'
    if (props.status !== 'enAttente') {
      libelle = 'Ré-affecter à un.e autre technicien.ne'
    }
    return libelle
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
            couleur={'bleu'}
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
            couleur={'bleu'}
            txt={libelleBoutonAffectation()}
            plein={true}
          />
        </form>
      }
    </div>
  );

}

export default FicheIncAffectation;

/*        

*/

