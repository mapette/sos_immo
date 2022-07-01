import { useState, useEffect } from 'react';
//import './../App.css';
import Bouton from './../tools/Bouton'
import Alerte from './../tools/Alerte'
const MD5 = require('sha1')

function Accueil(props) {
  let [warning, setWarning] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/get_accueil', {
      method: 'get',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {    // résultat brut
        console.log('response1', response)
        return response.json()  // récupère que les données résultat
      })
      .then(response => {
        console.log('response', response.id) // laisser cette ligne sinon ça marche pas !
        document.getElementById('id').value = response.id['ut_id']
      })
  }, [])

  function determineProfil(respProfil) {
    if (respProfil === 0) {
      return {
        profil: 'administrateur',
        ecran: 'gestionUtilisateurs'
      }
    }
    else if (respProfil === 1) {
      return {
        profil: 'usager',
        ecran: 'gestionUtilisateurs'
      }
    }
    else if (respProfil === 2) {
      return {
        profil: 'technicien',
        ecran: 'gestionUtilisateurs',
      }
    }
    else if (respProfil === 3) {
      return {
        profil: 'valideur',
        ecran: 'gestionUtilisateurs',
      }
    }
    else if (respProfil === 4) {
      return {
        profil: 'imm',
        ecran: 'gestionUtilisateurs',
      }
    }
    else {
      return {
        profil: 'profil plus que surprenant !',
        ecran: 'gestionUtilisateurs',
      }
    }
  }

  function sub_form(event) {
    event.preventDefault()
    let data = {
      //ut_id: 'sjoffre',
      //ut_mdp: MD5('sjoffre' + 'aaa'),
      ut_id: document.getElementById('id').value,
      ut_mdp: MD5(document.getElementById('id').value + document.getElementById('mdp').value),
    }
    fetch('http://localhost:3001/loggin', {
      method: 'post',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => {    // résultat brut
        // console.log('response1', response)
        return response.json()  // récupère que les données résultat
      })
      .then(response => {
        console.log('response id', response) // laisser cette ligne sinon ça marche pas !
        if (response.length === 0) {
          setWarning(true)
          console.log('rien')
        }
        else {
          let profil = determineProfil(response[0].hab_profil)
          props.setVarGlob({
            ...props.varGlob,
            nom: response[0].ut_prenom + ' ' + response[0].ut_nom,
            profil: profil.profil,
            ecran: 'menu',
          })
        }
      })
  }

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
          <Bouton
            txt={'Validation'}
            typeBt={'submit'}
            couleur={'gris'}
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
      <a href=''>mot de passe oublié</a>
    </div>
  );
} 

export default Accueil;
