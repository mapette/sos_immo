import { useState, useEffect } from 'react';
import SubmitButton from './../../tools/SubmitButton'
import Warning from './../../tools/Warning'
const sha1 = require('sha1')
const lib = require('./../../lib/lib_divers')
const lib_time = require('./../../lib/lib_time')

function Login(props) {
  let [warning, setWarning] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/welcome', lib.optionsREST('get',))
      .then(response => response.json())
      .then(response => document.getElementById('id').value = response.id)
      .catch(() => {
        props.setVarGlob({
          ...props.varGlob,
          screen: 'err503'
        })
      })
  }, [])

  function controleisPwExp(dateExp) {
    if (lib_time.isDateExp(dateExp)) { return 'changemdp' }
    else { return 'menu' }
  }

  function soumettreLogin(event) {
    event.preventDefault()
    let data = {
      ut_id: document.getElementById('id').value,
      ut_mdp: sha1(document.getElementById('id').value + document.getElementById('mdp').value),
    }
    fetch('http://localhost:3001/login', lib.optionsREST('post',data))
      .then(response => response.json())
      .then(response => {
        let profil = lib.determineProfil(response.hab_profil)
        props.setVarGlob({
          ...props.varGlob,
          userName: response.ut_prenom + ' ' + response.ut_nom,
          profil: profil.profil,
          isPwExp: lib_time.isDateExp(response.ut_mdp_exp),
          screen: controleisPwExp(response.ut_mdp_exp)
        })
      })
      .catch(setWarning(true))
}

  return (
    <div className="">
      <h2 className="titre gras cadre-15" >
        Veuillez vous identifier
      </h2>
      <form id="form_id"
        type="POST"
        encType="application/x-www-form-urlencoded"
        onSubmit={soumettreLogin}
      >
        <div className='cadre-15'>
          <div className='cadre-15'>
            <label htmlFor='id'>identifiant </label>
            <input id='id' name='id'></input>
          </div>
          <div >
            <label htmlFor='mdp'>mot de passe </label>
            <input type='password' id='mdp' name='mdp'></input>
          </div>
        </div>
        <div className='cadre-15 decal'>
          <SubmitButton
            txt={'Validation'}
            couleur={'gris'}
            plein={true}
          />
        </div>
        <div className='cadre-15'>
          {warning &&
            <Warning
              msg={'identifiant ou mot de passe erroné'}
              niveau={'alerteSimple'}
            />
          }
        </div>
      </form>

      <button type="button"
        className='btn btn-link'
        onClick={() => props.setVarGlob({
          ...props.varGlob,
          screen: 'oubliMdp'
        })}
      >identifiant/mot de passe oublié</button>
    </div>
  );
}

export default Login;
