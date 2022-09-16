import { useState, useEffect } from 'react';
import BoutonSubmit from './../tools/BoutonSubmit'
import Bouton from './../tools/Bouton'
import Alerte from './../tools/Alerte'

const MD5 = require('sha1')
const lib = require('./../lib/lib_divers')

function Accueil(props) {
  let [warning, setWarning] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/get_accueil', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        console.log('response', response.id) // laisser cette ligne sinon ça marche pas !
        document.getElementById('id').value = response.id['ut_id']
      })
  }, [])

  function sub_form(event) {
    event.preventDefault()
    let data = {
      ut_id: document.getElementById('id').value,
      ut_mdp: MD5(document.getElementById('id').value + document.getElementById('mdp').value),
    }
    console.log('data', data)
    fetch('http://localhost:3001/loggin', lib.optionsPost(data))
      .then(response => {    // résultat brut
        return response.json()  // récupère que les données résultat
      })
      .then(response => {
        console.log('response id', response) // laisser cette ligne sinon ça marche pas !
        if (response.length === 0) {
          setWarning(true)
          console.log('rien')
        }
        else {
          let profil = lib.determineProfil(response[0].hab_profil)
          props.setVarGlob({
            ...props.varGlob,
            nom: response[0].ut_prenom + ' ' + response[0].ut_nom,
            profil: profil.profil,
            ecran: 'menu',
          })
        }
      })
  }
console.log(props.varGlob)
  return (
    <div className="">
      <h2 className="titre gras cadre-15" >
        Veuillez vous identifier
      </h2>
      <form id="form_id"
        type="POST"
        encType="application/x-www-form-urlencoded"
        onSubmit={sub_form}
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
          <BoutonSubmit
            txt={'Validation'}
            couleur={'gris'}
            plein={true}
          />
        </div>
        <div className='cadre-15'>
          {warning &&
            <Alerte
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
          ecran: 'oubliMdp'
        })}
      >mot de passe oublié</button>
    </div>
  );
}

export default Accueil;
