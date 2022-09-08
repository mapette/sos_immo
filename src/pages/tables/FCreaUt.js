import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'
import BoutonSubmit from '../../tools/BoutonSubmit'
import Alerte from '../../tools/Alerte'

//const cl_ut = require('../../lib/lib_cl_ut')
const lib = require('../../lib/lib_divers')

function FCreaUt(props) {
  let [userNameList, setUserNameList] = useState([])  //passé en props création
  let [alertMsg, setAlertMsg] = useState('')
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    fetch('http://localhost:3001/get_users', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        console.log('response user list', response) // laisser cette ligne sinon ça marche pas !
        let userList = [] // var intermédiaire
        if (response.length !== 0) {
          response.forEach(element => {
            userList.push(element['ut_id'])
          });
         setUserNameList(userNameList = userList)
        }
      })
  }, [])

  function soumettre_newUser(data) {
    data.ut_presta = lib.cleanNull(data.ut_presta)
    if (alertMsg === '') {
      fetch('http://localhost:3001/crea_user', lib.optionsPost(data))
        .then(response => response.json())
        .then(response => {
          props.setMode('neutre')
          data.mdp = response.mdp
          lib.prepaMail(data.ut_mail, 'Identifiants SOS Immo', msgMail(data))
      })
    }
  }
  function msgMail(data) {
    return 'bonjour ' + data.ut_prenom + ','
      + '%0A%0ABienvenue sur SOS Immo.'
      + "%0A%0AVotre identifiant est : " + data.ut_id + '.'
      + "%0AMot de passe provisoire a utiliser lors de votre première connection : " + data.mdp + '.'
      + '%0A%0AVous pouvez dès à présent saisir et suivre vos tickets.'
      // +'\nLe mot de passe devra être modifier à la première connection.'
      + '%0A%0A      L\'équipe SOS Immo.'
  }
  function contrInput(ut_id, hab_profil, ut_presta) {
    console.log('controle',ut_id, hab_profil, ut_presta)
    hab_profil = parseInt(hab_profil)
    ut_presta = lib.cleanNull(ut_presta)
    if (userNameList.includes(ut_id)) { //
      setAlertMsg('Username déjà utilisé')
    }
    else if (ut_presta === null && (hab_profil === 2 || hab_profil === 3)) {
      setAlertMsg('Prestataire obligatoire pour ce profil')
    }
    else if (ut_presta !== null & (hab_profil === 0 | hab_profil === 1 | hab_profil === 4)) {
      setAlertMsg('Profil interdit aux prestataires')
    }
    else {
      setAlertMsg('')
    }
  }
console.log('usernames',userNameList)
  return (
    <div className="larg-1000">
        <div className='cadre-15'>
        <form id="form_ut"
        type="POST"
        encType="application/x-www-form-urlencoded"
        onSubmit={handleSubmit(soumettre_newUser)}
        >
          <table className='decal cadre-15 '>
            <thead>
              <th className='largeur-110'>identifiant</th>
              <th className='largeur-200'>nom</th>
              <th className='largeur-200'>prénom</th>
              <th className='largeur-200'>téléphone</th>
              <th className='largeur-200'>email</th>
          </thead>
            <tr>
              <td>
              <input id='ut_id' {...register('ut_id', { required: true })}
                onChange={event => {
                  contrInput(
                    event.target.value,
                    document.getElementById("hab_profil").value,
                    document.getElementById("ut_presta").value,
                  )
                }}
              ></input>
              </td>
              <td>
                <input className='' id='ut_nom' {...register('ut_nom', { required: true })} />
                {errors.ut_nom && <p>Nom obligatoire</p>}
              </td>
              <td> <input className='' id='ut_prenom' {...register('ut_prenom', { required: true })} />
                {errors.ut_prenom && <p>Prénom obligatoire</p>}
              </td>
              <td>
                <input className='' id='ut_tel' {...register('ut_tel', { required: true })} />
                {errors.ut_tel && <p>Numéro de téléphone obligatoire</p>}
              </td>
              <td>
                <input className='' id='ut_mail' {...register('ut_mail', { required: true })} />
                {errors.ut_mail && <p>Adresse mail obligatoire</p>}
              </td>
            </tr>
          </table>
          <div className='decal'> 
          <table className='decal cadre-15 '>
            <thead>
              <th className='largeur-300'>profil initial</th>
              <th className='largeur-400'>si prestataire, nom de l'entreprise</th>
          </thead>
            <tr>
                <td>
              <select id='hab_profil' {...register('hab_profil')}
                onChange={event => {
                  contrInput(
                    document.getElementById("ut_id").value,
                    event.target.value,
                    document.getElementById("ut_presta").value)
                }}
                className='largeur-110'>
                <option value='1' key='1'>usager</option>
                <option value='2' key='2'>technicien (ut_presta)</option>
                <option value='3' key='3'>valideur (ut_presta)</option>
                {/* <option value='0' key='0'>administrateur</option> */}
                <option value='4' key='4'>imm</option>
              </select>
              </td>
              <td>
              <select id='ut_presta' {...register('ut_presta')}
                onChange={event => {
                  contrInput(
                    document.getElementById("ut_id").value,
                    document.getElementById("hab_profil").value,
                    event.target.value,
                  )
                }}
                className='largeur-200'>
                <option value=''> </option>
                {props.prestaList.map(elem =>
                  <option
                    value={elem.presta_id}
                    key={elem.presta_id}>
                    {elem.presta_nom} - {elem.presta_libelle}
                  </option>
                    )}
              </select>
              </td>
            </tr>
          </table>
          </div>
          <div className="">
            <Bouton
            txt={'retour'}
            actionToDo={() => props.setMode('neutre')}
            couleur={'gris'}
            plein={true}
          />
            <BoutonSubmit
            txt={'Validation création'}
            couleur={'vert'}
            plein={true}
          />
          </div>
        </form>
      </div>
      {
        alertMsg !== '' &&
        <Alerte
          msg={alertMsg}
          niveau={'alerteRouge'}
        />
      }
    </div>
  );
}

export default FCreaUt;
