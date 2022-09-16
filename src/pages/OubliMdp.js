import { useState, useEffect } from 'react';
//import { useForm } from 'react-hook-form'; PAS UTILISE ICI - il empêche controleMdp() et controleMdp2() 
import './../tools/App.css';
import Bouton from '../tools/Bouton'
import BoutonSubmit from '../tools/BoutonSubmit'
import Alerte from '../tools/Alerte'
const MD5 = require('sha1')

const lib = require('../lib/lib_divers')

function OubliMdp(props) {
  let [warning, setWarning] = useState('')
  let [type, setType] = useState('')
  //  let [mail,SetMail]=useState('')
  //  let [user, setUser] = useState(''); // besoin du user pour hasher le mdp avant post

  /*  useEffect(() => {
      fetch('http://localhost:3001/get_userBySession', lib.optionsGet())
        .then(response => response.json())
        .then(response => {
          console.log('response', response.id) // laisser cette ligne sinon ça marche pas !
          setUser(response.id)  // besoin du user pour hasher le mdp avant post
        })
    }, [])
  */
  function sub_form(event) {
    event.preventDefault()
    if (type == '') { setWarning('précision') }
    else { setWarning('erreur') }
    // let data = {
    //   mdp: MD5(user + document.getElementById('mdp').value),
    //   newmdp: MD5(user + document.getElementById('newmdp').value),
    // }
    // fetch('http://localhost:3001/change_mdp',  lib.optionsPost(data))
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log('status', response.status) // laisser cette ligne sinon ça marche pas !
    //     if (response.status === false) {
    //       setWarning('erreur')
    //     }
    //     else {
    //       setWarning('ok')
    //     }
    //   })
  }

  return (
    <div className="">
      <h2 className="titre gras cadre-15" >
        MOT DE PASSE / IDENTIFIANT OUBLIE
      </h2>
      {warning !== 'ok' &&
        <div className='cadre-15'>
          <Bouton
            txt={'Identifiant oublié'}
            couleur={'bleu'}
            plein={true}
            actionToDo={() => {
              setWarning('id')
              setType('id')
            }
            } />
          <Bouton
            txt={'Mot de passe oublié'}
            couleur={'bleu'}
            plein={true}
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
      {warning === 'ok' &&
        <Alerte
          msg={'Le mot de passe a été modifié.'}
          niveau={'alerteSimple'}
        />
      }

      <div className='cadre-15'>
        <Bouton
          txt={'retour au menu'}
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
