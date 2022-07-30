import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from './../../tools/Bouton'
import BoutonSubmit from './../../tools/BoutonSubmit'
import Alerte from './../../tools/Alerte'

const lib = require('./../../lib/lib_divers')

function NewInc(props) {
  let [etape, setEtape] = useState(0)
  //  0-étage 1-emplacement 2-type 3-commentaire+submit
  // listes pour le formulaire
  let [lEtage, setLEtage] = useState([])
  let [lEmpl, setLEmpl] = useState([])
  let [lInc, setLInc] = useState([])
  let [alertMsg, setAlertMsg] = useState('')

  function sub_form(event) {
    event.preventDefault()
    let data = {
      emp: document.getElementById("empl").value,
      inc: document.getElementById("inc").value,
      info: document.getElementById("info").value,
    }
    console.log('data ', data)
    if (data.emp === '' | data.inc === '') {
      setAlertMsg('Veuillez préciser le type de problème.')
    }
    else {
      fetch('http://localhost:3001/crea_signalement', lib.optionsPost(data))
        .then(response => response.json())
        .then(response => {
          console.log('response', response)
          props.setVarGlob({
            ...props.varGlob,
            ecran: 'demandes',
            profilEcran: 'usager',
          })
        }
        )
    }
  }

  function prepaListe(response) {
    let etages = []
    let liste_emplacements = []
    let emplacements = []
    response.forEach(element => {
      // étages
      if (!(etages.includes(element['emp_etage']))) {
        etages.push(element['emp_etage'])
      }
      // emplacements
      if (!(liste_emplacements.includes(element['emp_id']))) {
        liste_emplacements.push(element['emp_id'])
        emplacements.push({
          'id': element['emp_id'],
          'nom': element['emp_nom'],
          'etage': element['emp_etage'],
        })
      }
    });
    setLEtage(etages)
    setLEmpl(emplacements)
    setLInc(response)
  }

  useEffect(() => {
    fetch('http://localhost:3001/get_emp', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        console.log('response empl list', response) // laisser cette ligne sinon ça marche pas !
        prepaListe(response)
      })
  }, [])

  function stypeInput(etapeEnCours) {
    if (etapeEnCours === etape) {
      return 'alerteSimple rouge'
    }
  }

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        NOUVELLE DEMANDE
      </h2>
      <form id="form_ut"
        type="POST"
        encType="application/x-www-form-urlencoded"
        onSubmit={sub_form}
        className='fontsize-12'
      >
        <div className="container no-gutter">
          <div className='row cadre-15'>
            <div className='droite col-6'>
              <label className={stypeInput(0)} htmlFor='etage'>étage</label>
            </div>
            <div className='gauche col-6'>
              <select type=""
                id='etage' name='etage'
                onClick={() => {
                  setEtape(1)
                }}
                onChange={() => {
                  setAlertMsg('')
                }}
                className='largeur-200'>
                <option value=''> </option>
                {
                  lEtage.map(elem =>
                    <option
                      value={elem}
                      key={elem}>
                      {elem}
                    </option>
                  )}
              </select>
            </div>
          </div>

          {etape > 0 &&
            <div className='row cadre-15'>
              <div className='droite col-6'>
                <label className={stypeInput(1)} htmlFor='emplacement'>salle/emplacement</label>
              </div>
              <div className='gauche col-6'>
                <select type=""
                  id='empl' name='empl'
                  onClick={() => {
                    setEtape(2)
                  }}
                  onChange={event => {
                    setAlertMsg('')
                  }}
                  className='largeur-200'>
                  <option value='' > </option>
                  {
                    lEmpl.map(elem =>
                      elem.etage == document.getElementById("etage").value &&
                      <option
                        value={elem.id}
                        key={elem.id}>
                        {elem.nom}
                      </option>

                    )}
                </select>
              </div>
            </div>
          }
          {etape > 1 &&
            <div className='row cadre-15'>
              <div className='droite col-6'>
                <label className={stypeInput(2)} htmlFor='inc'>type d'incident</label>
              </div>
              <div className='gauche col-6'>
                <select type=""
                  id='inc' name='inc'
                  onClick={() => {
                    setEtape(3)
                  }}
                  onChange={event => {
                    setAlertMsg('')
                  }}
                  className='largeur-200'>
                  <option value=''> </option>
                  {
                    lInc.map(elem =>
                      elem.emp_id == document.getElementById("empl").value &&
                      <option
                        value={elem.tinc_id}
                        key={elem.tinc_id}>
                        {elem.tinc_nom}
                      </option>

                    )}
                </select>
              </div>
            </div>
          }
          {etape > 2 &&
            <div>
              <div className='row cadre-15'>
                <div className='droite col-6'>
                  <label className={stypeInput(3)} htmlFor='info'>informations complémentaires</label>
                </div>
                <div className='gauche col-6'>
                  <textarea type=""
                    id='info' name='info'
                    rows="5"
                    onClick={() => {
                      setEtape(4)
                    }}
                    className='largeur-200' />
                </div>
              </div>
              <div className='cadre-15 '>
                <BoutonSubmit
                  txt={'Validation'}
                  couleur={'vert'}
                />
              </div>
            </div>
          }
        </div>
        {
          alertMsg != '' &&
          <Alerte
            msg={alertMsg}
            niveau={'alerteSimple'}
          />
        }
        <div className="">
          <br />
          <Bouton
            txt={'retour au menu'}
            actionToDo={() => props.setVarGlob({
              ...props.varGlob,
              ecran: 'menu'
            })}
            couleur={'gris'}
          />
        </div>
      </form >
    </div>
  );
}

export default NewInc;

/*        

*/