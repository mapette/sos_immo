import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../tools/App.css';
import BoutonSubmit from '../../tools/BoutonSubmit'
import Bouton from '../../tools/Bouton'

const lib = require('../../lib/lib_divers')
const time = require('../../lib/lib_time')

function FicheIncFin(props) {
  let [insatisfaction, setInsatisfaction] = useState(false)
  const { register, handleSubmit, formState: { errors }, } = useForm()

  function SoumettreInsatisfaction(data) {
    data.inc_id = props.incident.inc_id
    fetch('http://localhost:3001/clotureInc', lib.optionsPost(data))
      .then(response => response.json())
      .then(response => {
        data.emp = props.incident.emp_id
        data.tinc = props.incident.tinc_id
        data.info = "Relance de l'incident " + props.incident.inc_id + ". Motif : " + data.info
        fetch('http://localhost:3001/crea_signalement', lib.optionsPost(data))
          .then(response => response.json())
          .then(response => {
            console.log('response', response)
            props.setVarGlob({
              ...props.varGlob,
              ecran: 'demandes',
              profilEcran: 'usager',
            })
          })
      })
  }

  function SoumettreClotureIncident(event) {
    event.preventDefault()
    fetch('http://localhost:3001/clotureInc' + props.varGlob.focus, lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        console.log('response clôture', response) // laisser cette ligne sinon ça marche pas !
        props.setIncident({
          ...props.incident,
          inc_cloture_date: time.initDate(),
        })
      })
  }

  return (
    <div>
      {props.varGlob.profilEcran === 'usager' &&    // normalement inutile - je garde par précausion
        <div>
          <form id="attribution" className='cadre-15'
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={SoumettreClotureIncident}
          >
            <BoutonSubmit
              couleur={'vert'}
              txt={"Merci je suis satisfait.e"}
              plein={true}
            />
          </form>
          <Bouton
            couleur={'rouge'}
            txt={"Non ça ne va pas. Revenez SVP !"}
            plein={true}
            actionToDo={() => setInsatisfaction(true)}
          />
        </div>
      }
      {(props.varGlob.profilEcran === 'usager'
        && insatisfaction === true) &&  // normalement inutile - je garde par précausion
        <div>
          <form id="attribution" className='cadre-15'
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit(SoumettreInsatisfaction)}
          >
            <div className=' '>
              <label htmlFor='info'>
                <div>Une nouvelle fiche incident va être crééer.</div>
                <div>Merci de nous indiquer le motif de votre insatisfaction :</div>
              </label>
            </div>
            <textarea type=""
              id='info' {...register('info', { required: true })}
              rows="4"
              className='largeur-400' />
            {errors.info && <p>Expliquez-nous le problème SVP.</p>}
            <div>
              <BoutonSubmit
                couleur={'rouge'}
                txt={"Création d'une nouvelle fiche incident"}
                plein={true}
              />
              <Bouton
                couleur={'vert'}
                txt={"Non merci"}
                plein={true}
                actionToDo={() => setInsatisfaction(false)}
              />
            </div>
          </form>
        </div>
      }
    </div>
  );

}

export default FicheIncFin;

/*        

*/

