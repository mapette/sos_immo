import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'
import BoutonSubmit from '../../tools/BoutonSubmit';
import Alerte from '../../tools/Alerte'

const cl_ut = require('../../lib/lib_cl_ut')
const lib = require('../../lib/lib_divers')
const time = require('../../lib/lib_time')

function FicheUser(props) {

  let [habList, setHabList] = useState([])
  let [alertMsg, setAlertMsg] = useState('')
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    fetch('http://localhost:3001/get_habByUser' + props.focus.ut_uuid, lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        setHabList(habList = response)
      })
  },[])
  useEffect(()=>{
    document.getElementById('ut_nom').value = props.focus.ut_nom
    document.getElementById('ut_prenom').value = props.focus.ut_prenom
    document.getElementById('ut_tel').value = props.focus.ut_tel
    document.getElementById('ut_mail').value = props.focus.ut_mail
    document.getElementById('ut_presta').value = props.focus.ut_presta
    document.getElementById('hab_profil').value = props.focus.hab_profil
  }, [,props.focus])

  function soumettre_newUser(data) {
    data.ut_presta = lib.cleanNull(data.ut_presta)
    data.ut_uuid = props.focus.ut_uuid
    if (alertMsg === '') {
      fetch('http://localhost:3001/update_user', lib.optionsPost(data))
        .then(response => response.json())
        .then(response => {
          props.setMode('neutre')
          props.setFocus('')
          //  lib.prepaMail(data.ut_mail, 'Identifiants SOS Immo', msgMail(data))
      })
    }
  }

  function resiliation(ut_uuid){
    console.log(ut_uuid)
 //fetch('http://localhost:3001/get_user' + id, lib.optionsGet())
 
    fetch('http://localhost:3001/delete_user'+ ut_uuid, lib.optionsGet())
        // fetch resiliationUser
      // now() date exp habilitation
      // now() date ut exp
   // console.log(event)
  }

  function contrInput(hab_profil, ut_presta) {
    console.log('contrInput',hab_profil, ut_presta)
    hab_profil = parseInt(hab_profil)
    ut_presta = lib.cleanNull(ut_presta)
    if (ut_presta === null && (hab_profil === 2 || hab_profil === 3)) {
      setAlertMsg('Prestataire obligatoire pour ce profil')
    }
    else if (ut_presta !== null & (hab_profil === 0 | hab_profil === 1 | hab_profil === 4)) {
      setAlertMsg('Profil interdit aux prestataires')
    }
    else {
      setAlertMsg('')
    }
    console.log(alertMsg)
  }

  console.log(props.focus.ut_date_exp != null)
  return (
    <div className="">
      <div className="decal">
      <form id="form_ut"
        type="POST"
        encType="application/x-www-form-urlencoded"
        onSubmit={handleSubmit(soumettre_newUser)}
        >
          <table className='cadre-15 '>
            <thead>
              <th className='largeur-110'>identifiant</th>
              <th className='largeur-110'>entrée</th>
              <th className='largeur-110'>opérateur</th>
              <th className='largeur-110'>sortie</th>
              <th className='largeur-110'>opérateur</th>
            </thead>
            <tr>
              <td className='gras rouge'>{props.focus.ut_id}</td>
              <td>{time.FormatDate(props.focus.ut_date_deb)} </td>
              <td>{props.focus.ut_admin_deb} </td>
              <td>{time.FormatDate(props.focus.ut_date_exp)} </td>
              <td>{props.focus.ut_admin_exp} </td>
            </tr>
          </table>
          <table className='cadre-15 '>
            <thead>
              <th className='gauche largeur-110'>nom</th>
              <th className='gauche largeur-110'>prénom</th>
              <th className='gauche largeur-110'>téléphone</th>
              <th className='gauche largeur-200'>email</th>
              <th className=' largeur-300'>employeur</th>
              <th className='gauche largeur-110'>profil actuel</th>
            </thead>
            <tr>
              <td>
                <input className='input-sans-bordure' id='ut_nom' {...register('ut_nom', { required: true })} />
               {errors.ut_nom && <p>Nom obligatoire</p>}
              </td>
              <td> <input className='input-sans-bordure' id='ut_prenom' {...register('ut_prenom', { required: true })} />
                {errors.ut_prenom && <p>Prénom obligatoire</p>}
              </td>
              <td>
                <input className='input-sans-bordure' id='ut_tel' {...register('ut_tel', { required: true })} />
                {errors.ut_tel && <p>Numéro de téléphone obligatoire</p>}
              </td>
              <td>
                <input className='input-sans-bordure' id='ut_mail' {...register('ut_mail', { required: true })} />
                {errors.ut_mail && <p>Adresse mail obligatoire</p>}
              </td>
              <td>
              <select id='ut_presta' {...register('ut_presta')}
                onChange={event => {
                  contrInput(
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
              <td> 
              <select id='hab_profil' {...register('hab_profil')}
                onChange={event => {
                  contrInput(
                    event.target.value,
                    document.getElementById("ut_presta").value)
                }}
                className='largeur-110'>
                <option value='1' key='1'>usager</option>
                <option value='2' key='2'>technicien (presta)</option>
                <option value='3' key='3'>valideur (presta)</option>
                <option value='4' key='4'>imm</option>
              </select>
                </td>
            </tr>
          </table>
          <div className='container no-gutter'>
            <div className='row'>
              <table className='decal cadre-15 col-5'>
                <thead>
                  <th className='largeur-110'>profil</th>
                  <th className='largeur-110'>début</th>
                  <th className='largeur-110'>fin</th>
                </thead>
                {habList.map(hab => 
                  <tr key={hab.hab_uuid}>
                    <td> {lib.findProfil(hab.hab_profil)}</td>
                    <td> {time.FormatDate(hab.hab_date_deb)} </td>
                    <td> {time.FormatDate(hab.hab_date_exp)} </td>
                  </tr>
                )}
              </table>
              <div className='cadre-15 col-5 en-ligne'>
              {alertMsg !== '' &&
                    <Alerte
                      msg={alertMsg}
                      niveau={'alerteRouge'}
                    />
                }
                <Bouton
                  txt={'Retour à la liste'}
                  actionToDo={() => props.setFocus('')}
                  couleur={'gris'}
                  plein={true}
                />
               { props.focus.ut_date_exp === null &&
               <div>
                <BoutonSubmit
                  txt={'Modification'}
                  couleur={'bleu'}
                  plein={true}
                />
                <Bouton
                  txt={'Résiliation'}
                  actionToDo={() => resiliation(props.focus.ut_uuid)}
                  couleur={'rouge'}
                  plein={true}
                />
               </div>
               }
              </div>
            </div>
          </div>
        </form>
      </div>



    </div>
  );
}

/*
    
*/

export default FicheUser;
