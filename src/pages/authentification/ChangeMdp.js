import { useState, useEffect } from 'react';
//import { useForm } from 'react-hook-form'; PAS UTILISE ICI - il empêche controleMdp() et controleMdp2()
import './../../tools/App.css';
import Button from './../../tools/Button'
import SubmitButton from './../../tools/SubmitButton'
import Warning from './../../tools/Warning'
const sha1 = require('sha1')
const lib = require('./../../lib/lib_divers')

function ChangeMdp(props) {
  let [warning, setWarning] = useState('')
  let [contNewMdp, setContNewMdp] = useState(false)
  let [contNewMdp2, setContNewMdp2] = useState(false)
  let [user, setUser] = useState(''); // besoin du user pour hasher le mdp avant post

  useEffect(() => {
    fetch('http://localhost:3001/user/get_session', lib.optionsREST('GET',))
      .then(response => response.json())
      .then(response => {
        setUser(response.id)  // besoin du user pour hasher le mdp avant post
      })
  }, [])

  function sub_form(event) {
    event.preventDefault()
    let data = {
      mdp: sha1(user + document.getElementById('mdp').value),
      newmdp: sha1(user + document.getElementById('newmdp').value),
    }
    fetch('http://localhost:3001/change_pw', lib.optionsREST('PUT',data))
      .then(response => response.json())
      .then(response => {
        if (response.status === true) { 
          setWarning('ok') 
          props.setVarGlob({
            ...props.varGlob,
            isPwExp: false,
          })
        }
        else { setWarning('erreur') }
      })
  }

  function controleMdp() {
    // cpteurs de contrôles : 1 pour chaque cat de char + longueur
    let longueurMin = 12
    let cpt = { maj: 0, min: 0, num: 0, spe: 0, len: 0 }
    // qd 4 cpteurs !=0 : ok
    let charMin = 'abcdefghijklmnopqrstuvwxyz'
    let charMaj = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let charNum = '0123456789'
    let charSpe = '()!@#$+-*&_'
    let decompoMdp = document.getElementById('newmdp').value.split('')
    decompoMdp.forEach(element => {
      if (charMin.includes(element)) { cpt.min++ }
      if (charMaj.includes(element)) { cpt.maj++ }
      if (charNum.includes(element)) { cpt.num++ }
      if (charSpe.includes(element)) { cpt.spe++ }
      cpt.len = document.getElementById('newmdp').value.length
      if (cpt.maj !== 0 & cpt.min !== 0 & cpt.num !== 0 & cpt.spe !== 0 &
        cpt.len >= longueurMin &
        document.getElementById('newmdp').value !== document.getElementById('mdp').value) {
        setContNewMdp(true)
      }
      else {
        setContNewMdp(false)
      }
      setContNewMdp2(false)
      document.getElementById('newmdp2').value = ''
    });
  }
  function controleMdp2() {
    if (contNewMdp === true &
      (document.getElementById('newmdp2').value === document.getElementById('newmdp').value)) {
      setContNewMdp2(true)
    }
    else {
      setContNewMdp2(false)
    }
  }

  return (
    <div className="">
      <h2 className="titre gras cadre-15" >
        Modification du mot de passe
      </h2>
      <p className='cadre-35' />
      {props.varGlob.isPwExp &&
        <p>
          <Warning
            msg={'Mot de passe expiré'}
            niveau={'alerteRouge'}
          />
          <Warning
            msg={'Merci de le renouveler'}
            niveau={'alerteSimple'}
          />
        </p>
      }
      <p className='cadre-35' />
      {warning !== 'ok' &&
        <div className="">
          <form id="form_id"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={sub_form}
          >
            <div className="container">
              <div className='row cadre-15'>
                <div className='droite col-6'>
                  <label htmlFor='mdp'>mot de passe </label>
                </div>
                <div className='gauche col-6'>
                  <input type='password' id='mdp' name='mdp'></input>
                </div>
              </div>
              <div className='row cadre-15'>
                <div className='droite col-6'>
                  <label htmlFor='mdp'>nouveau mot de passe </label>
                </div>
                <div className='gauche col-6'>
                  <input onChange={() => controleMdp()}
                    type='password' id='newmdp' name='newmdp'></input>
                  {contNewMdp &&
                    <span className='cadre-15 vert gras'>
                      mot de passe valide
                    </span>
                  }
                  {!(contNewMdp) &&
                    <span className='cadre-15 rouge'>
                      mot de passe invalide
                    </span>
                  }
                </div>
              </div>
              <div className='row cadre-15'>
                <div className='droite col-6'>
                  <label htmlFor='mdp'>confirmation nouveau mot de passe </label>
                </div>
                <div className='gauche col-6'>
                  <input onChange={() => controleMdp2()}
                    type='password' id='newmdp2' name='newmdp2'></input>
                  {contNewMdp2 &&
                    <span className='cadre-15 vert gras'>
                      confirmation validée
                    </span>
                  }
                  {!(contNewMdp2) &&
                    <span className='cadre-15 rouge'>
                      confirmation invalide
                    </span>
                  }
                </div>
              </div>
              {(contNewMdp2) &&
                <div className='cadre-15 decal'>
                  <SubmitButton
                    txt={'Validation'}
                    couleur={'vert'}
                    plein={true}
                  />
                </div>
              }
            </div>
          </form>
          {warning === 'erreur' &&
            <Warning
              msg={'mot de passe erroné'}
              niveau={'alerteSimple'}
            />
          }
        </div >
      }

      {warning === 'ok' &&
        <Warning
          msg={'Le mot de passe a été modifié.'}
          niveau={'alerteSimple'}
        />
      }
      {!props.varGlob.isPwExp &&
        <div className='cadre-35'>
          <Button
            txt={lib.BT_RETOUR_ACCUEIL}
            actionToDo={() => props.setVarGlob({
              ...props.varGlob,
              screen: 'menu'
            })}
            couleur={'gris'}
            plein={true}
          />
        </div>}
    </div >
  );
}

export default ChangeMdp;
