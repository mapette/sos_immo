import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../../tools/App.css';
import Button from '../../../tools/Button'
import SubmitButton from '../../../tools/SubmitButton'
import Warning from '../../../tools/Warning'
const lib = require('../../../lib/lib_divers')

function FCreaUt(props) {
  let [userIdList, setuserIDList] = useState([]) 
  let [userMailList, setUserMailList] = useState([])  
  let [alertMsg, setAlertMsg] = useState('')
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    fetch('http://localhost:3001/user/get_all', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if  (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            ecran: 'errExp'
          })
        }else {
          let idList = [] // var intermédiaire
          let mailList = [] // var intermédiaire
          if (response.length !== 0) {
            response.forEach(element => {
              idList.push(element['ut_id'])
              mailList.push(element['ut_mail'])
            });
            setuserIDList(userIdList = idList)
            setUserMailList(userMailList = mailList)
          }
        }
      })
  }, [])

  function soumettre_newUser(data) {
    data.ut_presta = lib.cleanNull(data.ut_presta)
    if (alertMsg === '') {
      fetch('http://localhost:3001/user/creation', lib.optionsPost(data))
        .then(response => response.json())
        .then(response => {
          if  (response.status === 666) {
            props.setVarGlob({
              ...props.varGlob,
              ecran: 'errExp'
            })
          } else {
            props.setMode('neutre')
            data.mdp = response.mdp
            lib.prepaMail(data.ut_mail,
              'Identifiants SOS Immo',
              msgMail(data))
          }
        })
    }
  }
  function msgMail(data) {
    return 'bonjour ' + data.ut_prenom + ','
      + '%0A%0ABienvenue sur SOS Immo.'
      + "%0A%0AVotre identifiant est : " + data.ut_id + '.'
      + "%0AMot de passe provisoire à utiliser lors de votre prochaine connection : " + data.mdp + '.'
      + '%0A%0AVous pouvez dès à présent saisir et suivre vos tickets.'
      + '%0A%0A      L\'équipe SOS Immo.'
  }
  function contrListBox(ut_id,ut_mail, hab_profil, ut_presta) {
    hab_profil = parseInt(hab_profil)
    ut_presta = lib.cleanNull(ut_presta)
    if (userIdList.includes(ut_id)) {
      setAlertMsg('Identifiant déjà utilisé')
    }
    else if (userMailList.includes(ut_mail)) {
      setAlertMsg('Adresse mail déjà utilisée')
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

  return (
    <div className='mx-auto container bordure arr-img cadre-15 '>
      <form id="form_ut"
        type="POST"
        encType="application/x-www-form-urlencoded"
        onSubmit={handleSubmit(soumettre_newUser)}
      >
        <table className='mx-auto decal cadre-15 '>
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
                  contrListBox(
                    event.target.value,
                    document.getElementById("ut_mail").value,
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
              <input id='ut_mail' {...register('ut_mail', { required: true })}
                onChange={event => {
                  contrListBox(
                    document.getElementById("ut_id").value,
                    event.target.value,
                    document.getElementById("hab_profil").value,
                    document.getElementById("ut_presta").value,
                  )
                }}
              ></input>
            </td>
          </tr>
        </table>
        <div className='decal'>
          <table className='mx-auto decal cadre-15 '>
            <thead>
              <th className='largeur-300'>profil initial</th>
              <th className='largeur-400'>si prestataire, nom de l'entreprise</th>
            </thead>
            <tr>
              <td>
                <select id='hab_profil' {...register('hab_profil')}
                  onChange={event => {
                    contrListBox(
                      document.getElementById("ut_id").value,
                      document.getElementById("ut_mail").value,
                      event.target.value,
                      document.getElementById("ut_presta").value)
                  }}
                  className='largeur-200'>
                  <option value='1' key='1'>usager</option>
                  <option value='2' key='2'>technicien (ut_presta)</option>
                  <option value='3' key='3'>valideur (ut_presta)</option>
                  <option value='4' key='4'>admin</option>
                </select>
              </td>
              <td>
                <select id='ut_presta' {...register('ut_presta')}
                  onChange={event => {
                    contrListBox(
                      document.getElementById("ut_id").value,
                      document.getElementById("ut_mail").value,
                      document.getElementById("hab_profil").value,
                      event.target.value,
                    )
                  }}
                  className='largeur-300'>
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
          <Button
            txt={'retour'}
            actionToDo={() => props.setMode('neutre')}
            couleur={'gris'}
            plein={true}
          />
          <SubmitButton
            txt={'Validation création'}
            couleur={'vert'}
            plein={true}
          />
        </div>
        <p />
      </form>
      {alertMsg !== '' &&
        <Warning
          msg={alertMsg}
          niveau={'alerteRouge'}
        />
      }
    </div>
  );
}

export default FCreaUt;
