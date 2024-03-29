import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../../tools/App.css';
import Button from '../../../tools/Button'
import SubmitButton from '../../../tools/SubmitButton';
import Warning from '../../../tools/Warning'
const lib = require('../../../lib/lib_divers')
const time = require('../../../lib/lib_time')

function FicheUser(props) {

  let [habList, setHabList] = useState([])
  let [alertMsg, setAlertMsg] = useState('')
  let [changePresta, setChangePresta] = useState(false)
  let [changeProfil, setChangeProfil] = useState(false)
  const { register, handleSubmit, } = useForm()

  useEffect(() => {
    fetch('http://localhost:3001/user/get_author/' + props.varGlob.focus.ut_uuid, lib.optionsREST('get',))
      .then(response => response.json())
      .then(response => {
        setHabList(habList = response)
      })
  }, [])
  useEffect(() => {
    document.getElementById('ut_nom').value = props.varGlob.focus.ut_nom
    document.getElementById('ut_prenom').value = props.varGlob.focus.ut_prenom
    document.getElementById('ut_tel').value = props.varGlob.focus.ut_tel
    document.getElementById('ut_mail').value = props.varGlob.focus.ut_mail
    document.getElementById('ut_presta').value = props.varGlob.focus.ut_presta
    document.getElementById('hab_profil').value = props.varGlob.focus.hab_profil
  }, [, props.varGlob.focus])

  function contrInput(data) {
    if (data.ut_nom === '') { data.ut_nom = document.getElementById('ut_nom').value }
    if (data.ut_prenom === '') { data.ut_prenom = document.getElementById('ut_prenom').value }
    if (data.ut_tel === '') { data.ut_tel = document.getElementById('ut_tel').value }
    if (data.ut_mail === '') { data.ut_mail = document.getElementById('ut_mail').value }
    if (!changePresta) { data.ut_presta = document.getElementById('ut_presta').value }
    if (!changeProfil) { data.hab_profil = document.getElementById('hab_profil').value }
    data.ut_presta = lib.cleanNull(data.ut_presta)
    return data
  }

  function soumettreUpdateUser(data) {
    if (alertMsg === '') {
      data.ut_uuid = props.varGlob.focus.ut_uuid
      data = contrInput(data)
      fetch('http://localhost:3001/user/update', lib.optionsREST('put',data))
      .then(() => {
          props.setMode('neutre')
          props.setVarGlob({
            ...props.varGlob,
            focus: '',
          })
        })
    }
  }

  function soumettreResiliation(ut_uuid) {
    fetch('http://localhost:3001/user/exit/' + ut_uuid, lib.optionsREST('get',))
      .then(() => {
        props.setMode('neutre')
        props.setVarGlob({
          ...props.varGlob,
          focus: '',
        })
      })
  }

  function soumettreReintegration(ut_uuid) {
    setAlertMsg('Non encore fonctionnel')
  }

  function contrListBox(hab_profil, ut_presta) {
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
  }

  return (
    <div className="mx-auto container bordure arr-img">
      <form id="form_ut"
        type="POST"
        encType="application/x-www-form-urlencoded"
        onSubmit={handleSubmit(soumettreUpdateUser)}
      >
        {/* données figées */}
        <table className='cadre-15 mx-auto'>
          <thead>
            <th className='largeur-110'>identifiant</th>
            <th className='largeur-110'>entrée</th>
            <th className='largeur-110'>sortie</th>
          </thead>
          <tr>
            <td className='gras rouge'>{props.varGlob.focus.ut_id}</td>
            <td>{time.formatDate(props.varGlob.focus.ut_date_deb)} </td>
            <td>{time.formatDate(props.varGlob.focus.ut_date_exp)} </td>
          </tr>
        </table>
        {/* données utilisateur */}
        <table className='cadre-15 mx-auto'>
          <thead>
            <th className='gauche largeur-110'>nom</th>
            <th className='gauche largeur-110'>prénom</th>
            <th className='gauche largeur-110'>téléphone</th>
            <th className='gauche largeur-200'>email</th>
          </thead>
          <tr>
            <td>
              <input className='input-sans-bordure' id='ut_nom' {...register('ut_nom',)} />
            </td>
            <td> <input className='input-sans-bordure' id='ut_prenom' {...register('ut_prenom',)} />
            </td>
            <td>
              <input className='input-sans-bordure' id='ut_tel' {...register('ut_tel',)} />
            </td>
            <td>
              <input className='input-sans-bordure' id='ut_mail' {...register('ut_mail',)} />
            </td>
          </tr>
        </table>
        {/* profil utilisateur */}
        <table className='cadre-15 mx-auto'>
          <thead>
            <th className='largeur-200'>profil actuel</th>
            <th className=' largeur-300'>employeur</th>
          </thead>
          <tr>
            <td>
              <select id='hab_profil' {...register('hab_profil')}
                onChange={event => {
                  setChangeProfil(true)
                  contrListBox(
                    event.target.value,
                    document.getElementById("ut_presta").value)
                }}
                className='largeur-200'>
                <option value='1' key='1'>usager</option>
                <option value='2' key='2'>technicien (presta)</option>
                <option value='3' key='3'>valideur (presta)</option>
                <option value='4' key='4'>admin</option>
              </select>
            </td>
            <td>
              <select id='ut_presta' {...register('ut_presta')}
                onChange={event => {
                  setChangePresta(true)
                  contrListBox(
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
        <div className='mx-auto container no-gutter'>
          {alertMsg !== '' &&
            <Warning
              msg={alertMsg}
              niveau={'alerteRouge'}
            />
          }
          {/* historique habilitations */}
          <table className='mx-auto cadre-15'>
            <thead>
              <th className='largeur-110'>profil</th>
              <th className='largeur-200'>début</th>
              <th className='largeur-200'>fin</th>
            </thead>
            {habList.map(hab =>
              <tr key={hab.hab_uuid}>
                <td> {lib.findProfil(hab.hab_profil)}</td>
                <td> {time.formatDate(hab.hab_date_deb)} </td>
                <td> {time.formatDate(hab.hab_date_exp)} </td>
              </tr>
            )}
          </table>

          <div className='cadre-15 en-ligne'>
            <Button
              txt={lib.BT_RETOUR_LISTE}
              actionToDo={() => {
                props.setMode('neutre')
                props.setVarGlob({
                  ...props.varGlob,
                  focus: '',
                })
              }}
              couleur={'gris'}
              plein={true}
            />
            {props.varGlob.focus.ut_date_exp === null &&
              <span>
                <SubmitButton
                  txt={'Modification'}
                  couleur={'bleu'}
                  plein={true}
                />
                <Button
                  txt={'Résiliation'}
                  actionToDo={() => soumettreResiliation(props.varGlob.focus.ut_uuid)}
                  couleur={'rouge'}
                  plein={true}
                />
              </span>
            }
             {props.varGlob.focus.ut_date_exp !== null &&
              <span>
                <Button
                  txt={'Réintégration'}
                  actionToDo={() => soumettreReintegration(props.varGlob.focus.ut_uuid)}
                  couleur={'vert'}
                  plein={true}
                />

              </span>
            }
          </div>
        </div>
      </form>
    </div>
  );
}

export default FicheUser;
