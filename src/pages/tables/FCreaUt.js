import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from './../../tools/Bouton'
import BoutonSubmit from './../../tools/BoutonSubmit'
import Alerte from './../../tools/Alerte'

const lib = require('./../../lib/lib_divers')

function FCreaUt(props) {
  let [prestaList, setPrestaList] = useState([])
  let [alertMsg, setAlertMsg] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/get_presta', {
      method: 'get',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(response => {
        console.log('response presta list', response) // laisser cette ligne sinon ça marche pas !
        if (response.length !== 0) {
          setPrestaList(prestaList = response)
        }
      })
  }, [])

  function sub_form(event) {
    event.preventDefault()
    console.log('msg : ', alertMsg)
    if (alertMsg === '') {
      console.log('GO')
      let data = {
        username: document.getElementById("username").value,
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        tel: lib.cleanNull(document.getElementById("tel").value),
        mail: document.getElementById("email").value,
        presta: lib.cleanNull(document.getElementById("presta").value),
        profil: document.getElementById("profil").value,
      }
      if (alertMsg === '') {
        fetch('http://localhost:3001/crea_user', {
          method: 'post',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(response => {
            console.log(response)
            props.setMode('neutre')
          })
      }
    }
  }

  function contrInput(username, profil, presta,) {
    console.log(username, profil, presta)
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
        onSubmit={sub_form}
        className='fontsize-12'
      >
        <div className='cadre-15'>
          <span className='cadre-15'>
            <label htmlFor='id'>username </label>
            <input id='username' name='username' required
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
            <input id='nom' name='nom' required></input>
          </span>
          <span className='cadre-15'>
            <label htmlFor='prenom'>prénom </label>
            <input id='prenom' name='prenom' required></input>
          </span>
        </div>
        <div className=''>
          <span className='cadre-15'>
            <label htmlFor='tel'>téléphone </label>
            <input type="tel" id='tel' name='tel'></input>
          </span>
          <span className='cadre-15'>
            <label htmlFor='email'>email </label>
            <input type="email" id='email' name='email' required></input>
          </span>
        </div>
        <div className='cadre-15'>
          <span className='cadre-15'>
            <label htmlFor='profil'>profil initial </label>
            <select id='profil' name='profil'
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
            <select id='presta' name='presta'
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
          // actionToDo={() => setMode('création')}
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
