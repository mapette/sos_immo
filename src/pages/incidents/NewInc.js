import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../tools/App.css';
import Button from '../../tools/Button'
import SubmitButton from '../../tools/SubmitButton'
import Warning from '../../tools/Warning'
const lib = require('../../lib/lib_divers')

function NewInc(props) {
  let [etape, setEtape] = useState(0)
  //  0-étage 1-emplacement 2-type 3-commentaire+submit
  // listes pour le formulaire
  let [lEtage, setLEtage] = useState([])
  let [lEmpl, setLEmpl] = useState([])
  let [lInc, setLInc] = useState([])
  let [alertMsg, setAlertMsg] = useState('')
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    fetch('http://localhost:3001/inc/get_allEmpAndTinc', lib.optionsREST('GET',))
      .then(response => response.json())
      .then(response => {
        if (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            screen: 'errExp'
          })
        } else prepaLists(response)
      })
      .catch(() => {
        props.setVarGlob({
          ...props.varGlob,
          screen: 'err503'
        })
      })
  }, [])

  function prepaLists(response) {
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

  function soumettre_inc(data) {
    fetch('http://localhost:3001/inc/creation', lib.optionsREST('POST',data))
      .then(response => response.json())
      .then(response => {
        if (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            screen: 'errExp'
          })
        }
        else {
          props.setVarGlob({
            ...props.varGlob,
            screen: 'myReport',
            profilScreen: 'usager',
          })
        }
      })
  }

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
        type="post"
        encType="application/x-www-form-urlencoded"
        onSubmit={handleSubmit(soumettre_inc)}
        className='fontsize-12'
      >
        <div className="no-gutter">
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
                  id='empl' name='empl' {...register('emp', { required: true })}
                  onClick={() => { setEtape(2) }}
                  onChange={() => { setAlertMsg('') }}
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
                  id='tinc'  {...register('tinc', { required: true })}
                  onClick={() => { setEtape(3) }}
                  onChange={() => { setAlertMsg('') }}
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
                  <textarea placeholder='facultatif' type=""
                    id='info' {...register('info',)}
                    rows="5"
                    onClick={() => { setEtape(4) }}
                    className='largeur-400' />
                </div>
              </div>
              <div className='cadre-15 '>
                <SubmitButton
                  txt={'Validation'}
                  couleur={'vert'}
                  plein={true}
                />
              </div>
            </div>
          }
        </div>
        {
          alertMsg !== '' &&
          <Warning
            msg={alertMsg}
            niveau={'alerteSimple'}
          />
        }
        <div className="">
          <br />
          <Button
            txt={lib.BT_RETOUR_ACCUEIL}
            actionToDo={() => props.setVarGlob({
              ...props.varGlob,
              screen: 'menu'
            })}
            couleur={'gris'}
            plein={true}
          />
        </div>
      </form >
    </div>
  );
}

export default NewInc;
