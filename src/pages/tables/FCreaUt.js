import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'
import BoutonSubmit from '../../tools/BoutonSubmit'
import Alerte from '../../tools/Alerte'

const lib = require('../../lib/lib_divers')

function FCreaUt(props) {
  let [prestaList, setPrestaList] = useState([])
  let [alertMsg, setAlertMsg] = useState('')
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    fetch('http://localhost:3001/get_presta', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        //  console.log('response presta list', response) // laisser cette ligne sinon ça marche pas !
        if (response.length !== 0) {
          setPrestaList(prestaList = response)
        }
      })
  }, [])


  function soumettre_newUser(data) {
    data.presta = lib.cleanNull(data.presta)
    console.log('msg : ', alertMsg)
    if (alertMsg === '') {
      if (alertMsg === '') {
        fetch('http://localhost:3001/crea_user', lib.optionsPost(data))
          .then(response => response.json())
          .then(response => {
            console.log('creation user', response)
            props.setMode('neutre')
          })
      }
    }
  }

  function contrInput(username, profil, presta,) {
    //console.log(username, profil, presta)
    profil = parseInt(profil)
    presta = lib.cleanNull(presta)
    if (props.userNameList.includes(username)) {
      setAlertMsg('Username déjà utilisé')
    }
    else if (presta === null && (profil === 2 || profil === 3)) {
      setAlertMsg('Prestataire obligatoire pour ce profil')
    }
    else if (presta !== null & (profil === 0 | profil === 1 | profil === 4)) {
      setAlertMsg('Profil interdit aux prestataires')
    }
    else {
      setAlertMsg('')
    }
  }

  return (
    <div className="">
      <form id="form_ut"
        type="POST"
        encType="application/x-www-form-urlencoded"
        onSubmit={handleSubmit(soumettre_newUser)}
        className='fontsize-12'
      >
        <div className='cadre-15'>
          <span className='cadre-15'>
            <label htmlFor='id'>username </label>
            <input id='username' {...register('username', { required: true })}
              onChange={event => {
                contrInput(
                  event.target.value,
                  document.getElementById("profil").value,
                  document.getElementById("presta").value,
                )
              }}
            ></input>
          </span>
          <span className='cadre-15'>
            <label htmlFor='nom'>nom </label>
            <input id='nom' {...register('nom', { required: true })}></input>
            {errors.nom && <p>Nom obligatoire</p>}
          </span>
          <span className='cadre-15'>
            <label htmlFor='prenom'>prénom </label>
            <input id='prenom' {...register('prenom', { required: true })}></input>
            {errors.prenom && <p>Prénom obligatoire</p>}
          </span>
        </div>
        <div className=''>
          <span className='cadre-15'>
            <label htmlFor='tel'>téléphone </label>
            <input type="tel" id='tel' {...register('tel', { required: true })}></input>
            {errors.tel && <p>Numéro de téléphone obligatoire</p>}
          </span>
          <span className='cadre-15'>
            <label htmlFor='email'>email </label>
            <input type="email" id='email' {...register('mail', { required: true })} ></input>
            {errors.mail && <p>Adresse email obligatoire</p>}
          </span>
        </div>
        <div className='cadre-15'>
          <span className='cadre-15'>
            <label htmlFor='profil'>profil initial </label>
            <select id='profil' {...register('profil')}
              onChange={event => {
                contrInput(
                  document.getElementById("username").value,
                  event.target.value,
                  document.getElementById("presta").value)
              }}
              className='largeur-110'>
              <option value='1' key='1'>usager</option>
              <option value='2' key='2'>technicien (presta)</option>
              <option value='3' key='3'>valideur (presta)</option>
              <option value='0' key='0'>administrateur</option>
              <option value='4' key='4'>immo</option>
            </select>
          </span>
          <span className='cadre-15'>
            <label htmlFor='presta'>si prestataire, nom de l'entreprise </label>
            <select id='presta' {...register('presta')}
              onChange={event => {
                contrInput(
                  document.getElementById("username").value,
                  document.getElementById("profil").value,
                  event.target.value,
                )
              }}
              className='largeur-200'>
              <option value=''> </option>
              {prestaList.map(elem =>
                <option
                  value={elem.presta_id}
                  key={elem.presta_id}>
                  {elem.presta_nom} - {elem.presta_libelle}
                </option>
              )}
            </select>
          </span>

        </div>
        <Bouton
          txt={'retour'}
          actionToDo={() => props.setMode('neutre')}
          couleur={'gris'}
        />
        <BoutonSubmit
          txt={'Validation création'}
          couleur={'vert'}
        />
      </form>
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
