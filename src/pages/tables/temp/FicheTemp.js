import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../../tools/App.css';
import Button from '../../../tools/Button'
import SubmitButton from '../../../tools/SubmitButton'

const lib = require('../../../lib/lib_divers')

function FicheTemp(props) {
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    if (props.mode === 'sélection') {
      document.getElementById('temp_nom').value = props.varGlob.focus.temp_nom
    }
    else if (props.mode === 'création') {
      document.getElementById('temp_nom').value = ''
    }
  }, [props.varGlob.focus])

  function soumettre_updateTemp(data) {
    if (data.temp_nom === '') { data.temp_nom = props.varGlob.focus.temp_nom }
    data.temp_id = props.varGlob.focus.temp_id
    fetch('http://localhost:3001/update_temp', lib.optionsPost(data))
      .then(() => {
        props.setMode('neutre')
        props.setVarGlob({
          ...props.varGlob,
          focus: ''
        })
      })
  }

  function soumettre_newTemp(data) {
    fetch('http://localhost:3001/crea_temp', lib.optionsPost(data))
      .then(() => {
        props.setMode('neutre')
        props.setVarGlob({
          ...props.varGlob,
          focus: ''
        })
      })
  }

  return (
    <div className="">
      {props.mode === 'sélection' && props.varGlob.focus !== '' &&
        <div className="container mx-auto ">
          <form id="form_ut"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit(soumettre_updateTemp)}
          >
            <table className="cadre-15">
            <thead>
                <th className='largeur-110'>Mise à jour</th>
                <th className='largeur-300 '>nom</th>
              </thead>
              <tbody>
                <tr>
                  <td className=''>{props.varGlob.focus.temp_id}</td>
                  <td>
                    <input className='input-sans-bordure'
                      id='temp_nom' {...register('temp_nom')} />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              txt={lib.BT_RETOUR_LISTE}
              actionToDo={() => {
                props.setMode('neutre')
                props.setVarGlob({
                  ...props.varGlob,
                  focus: '',
                  ecran: 'gestionTemp'
                })
              }}
              couleur={'gris'}
              plein={true}
            />
            <SubmitButton
              txt={'Mise à jour'}
              couleur={'vert'}
              plein={true}
            />

          </form>
        </div>
      }
      {props.mode === 'création' &&
        <div className="container mx-auto">
          <form id="form_ut"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit(soumettre_newTemp)}
          >
            <table className="cadre-15">
              <thead>
                <th className=''>Nouvel emplacement</th>
                <th className='largeur-300 '>nom</th>
              </thead>
              <tbody>
                <tr>
                  <td className=''></td>
                  <td>
                    <input className='input-sans-bordure' id='temp_nom' {...register('temp_nom', { required: true })} />
                    {errors.emp_nom && <p>Nom obligatoire</p>}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              txt={lib.BT_RETOUR_LISTE}
              actionToDo={() => {
                props.setMode('neutre')
                props.setVarGlob({
                  ...props.varGlob,
                  focus: '',
                  ecran: 'gestionTemp'
                })
              }}
              couleur={'gris'}
              plein={true}
            />
            <SubmitButton
              txt={'Validation création'}
              couleur={'vert'}
              plein={true}
            />
          </form>
        </div>
      }
    </div>
  );
}

export default FicheTemp;
