import { useState, useEffect } from 'react';
//import { useForm } from 'react-hook-form'; PAS UTILISE ICI - il empêche controleMdp() et controleMdp2() 
import './../tools/App.css';
import Bouton from '../tools/Bouton'
import BoutonSubmit from '../tools/BoutonSubmit'
import Alerte from '../tools/Alerte'

const lib = require('../lib/lib_divers')

function OubliMdp(props) {
  let [warning, setWarning] = useState('')
  let [type, setType] = useState('')

  function sub_form(event) {
    event.preventDefault()
    if (type === '') { setWarning('précision') }
    else { 
      let data = {
        type: type,
        mail: document.getElementById('mail').value,
      }
    fetch('http://localhost:3001/forgotPw',  lib.optionsPost(data))
      .then(response => response.json())
      .then(response => {
        if (response.result === 'erreur') { setWarning('erreur') }
        else { 
          console.log(response.result)
          if (type==='id'){setWarning('ok id')}
          else {
            // mail à faire
            setWarning('ok mdp')
          }
          lib.prepaMail(data.mail,
            'Identifiants/mot de passe oublié  SOS Immo',
             msgMail(type,response.result))
        }
      })
    }
  }
  function msgMail(type,result) {
    let intro = 'bonjour,'
    + '%0A%0ACe mail fait suite à votre demande.'
    let motif = () => {
      if (type === 'mdp') { return '%0A%0AMot de passe provisoire à utiliser lors de votre prochaine connection : ' + result + '.' }
      else { return "%0AVotre identifiant est : " + result + '.' }
    }
    let fin = '%0A%0AL\'équipe SOS Immo vous souhaite une bonne journée.'
    return intro + motif() + fin 
  }

  return (
    <div className="">
      <h2 className="titre gras cadre-15" >
        MOT DE PASSE / IDENTIFIANT OUBLIE
      </h2>
      {(warning !== 'ok mdp' && warning !== 'ok id') &&
        <div className='cadre-15'>
          <Bouton
            txt={'Identifiant oublié'}
            couleur={'bleu'}
            plein={type === 'id'}
            actionToDo={() => {
              setWarning('id')
              setType('id')
            }
            } />
          <Bouton
            txt={'Mot de passe oublié'}
            couleur={'bleu'}
            plein={type === 'mdp'}
            actionToDo={() => {
              setWarning('mdp')
              setType('mdp')
            }
            }
          />
          <form id="form_id"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={sub_form}
          >
            <div className="container">
              <div className='row cadre-15'></div>
              <div className='row centre cadre-15'>
                <label htmlFor='mail'>Veuillez indiquer votre adresse mail :</label>
              </div>
              <div className='row centre cadre-15'>
                <div className=''>
                  <input type='email'
                    className='largeur-400'
                    id='mail'
                    name='mail'
                    required></input>
                </div>
              </div>
              {warning === 'mdp' &&
                <Alerte
                  msg={'Un mot de passe provisoire sera envoyé à cette adresse.'}
                  niveau={'alerteSimple'}
                />
              }
              {warning === 'id' &&
                <Alerte
                  msg={'Votre identifiant sera envoyé à cette adresse.'}
                  niveau={'alerteSimple'}
                />
              }
              {warning === 'précision' &&
                <Alerte
                  msg={'Veuillez préciser Identifiant ou Mot de passe oublié.'}
                  niveau={'alerteSimple'}
                />
              }
              {warning === 'erreur' &&
                <Alerte
                  msg={'adresse mail erronée'}
                  niveau={'alerteSimple'}
                />
              }
              <div className='cadre-15'>
                <BoutonSubmit
                  txt={'Validation'}
                  couleur={'vert'}
                  plein={true}
                />
                <div className='row cadre-15'></div>
              </div>
            </div>
          </form>
        </div >
      }
      {warning === 'ok mdp' &&
        <Alerte
          msg={'Un mot de passe provisoire a été envoyé par mail.'}
          niveau={'alerteSimple'}
        />
      }
       {warning === 'ok id' &&
        <Alerte
          msg={'L\'identifiant a été envoyé par mail.'}
          niveau={'alerteSimple'}
        />
      }

      <div className='cadre-15'>
        <Bouton
          txt={lib.BT_RETOUR_ACCUEIL}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            ecran: 'accueil'
          })}
          couleur={'gris'}
          plein={true}
        />
      </div>
    </div >
  );
}


export default OubliMdp;
