import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../tools/App.css';
import SubmitButton from '../../tools/SubmitButton'
const time = require('../../lib/lib_time')
const lib = require('../../lib/lib_divers')

function FicheIncAffectation(props) {
  let [lTechno, setLTechno] = useState([])
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    // pour affectation 'forcée' (suivi des incidents)
    //  => liste des techniciens (profil valideur et admin) // presta_id : presta en charge du type d'incident
    if (props.incident.presta_id != undefined) {
      if ((props.varGlob.profilEcran === 'techno') | (props.varGlob.profilEcran === 'pilotage')
        & (props.varGlob.profil === 'valideur' | props.varGlob.profil === 'admin')) {
        fetch('http://localhost:3001/user/get_byCatAndPresta/2/' + props.incident.presta_id,
          lib.optionsGet())
          .then(response => response.json())  // récupère que les données résultat
          .then(response => {
            setLTechno(lTechno = response)
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

  function soumettreAffectation(data) {
    data.inc_id =  props.varGlob.focus
    data.profil = props.varGlob.profil
    data.status = props.status
    if (IsAffectationPossible(data.techno)) { 
      fetch(lib.determineURL('affectation', data), lib.optionsGet())
        .then(response => response.json())
        .then(() => {
           props.setIncident({
            ...props.incident,
            inc_affect_date: time.initDate(),
            inc_affect_ut: data.ut_id ,
          })
        })
      props.setStatus('enCours')
    }
  }
  function IsAffectationPossible(techno) {
    let okAffection = false
    //  auto-affectation toujours possible
    if (techno === undefined) {
      // l'utilisateur prend lui-même en charge, l'id sera déterminé par le cookie
      okAffection = true
    }
    else {  // affectation par valideur ou immo
      if (techno !== '') {
        // empêcher ré-affectation au même technicien
        if (techno !== props.incident.inc_affect_ut) {
          okAffection = true
        }
      }
    }
    return okAffection
  }
  function libelleBoutonAffectation() {
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
          <SubmitButton
            couleur={'bleu'}
            txt={"Je m'en charge !"}
            plein={true}
          />
        </form>
      }
      {(props.varGlob.profil == 'valideur' || props.varGlob.profil == 'admin') &&
        <form id="affectation"
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={handleSubmit(soumettreAffectation)}
        >
          <select id='techno' name='techno'
            {...register('techno', { required: true })}
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
          <SubmitButton
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
