import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../../tools/App.css';
import Button from '../../../tools/Button'
import SubmitButton from '../../../tools/SubmitButton'

const lib = require('../../../lib/lib_divers')

function FicheEmp(props) {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  let [tempList, setTempList] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/temp/get_all', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if  (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            screen: 'errExp'
          })
        } else if (response.length !== 0) {
          setTempList(tempList = response)
        }
      })
  }, [])

  useEffect(() => {
    if (props.mode === 'sélection') {
      document.getElementById('emp_etage').value = props.varGlob.focus.emp_etage
      document.getElementById('emp_nom').value = props.varGlob.focus.emp_nom
      document.getElementById('emp_temp').value = props.varGlob.focus.emp_temp
    }
    else if (props.mode === 'création') {
      document.getElementById('emp_etage').value = ''
      document.getElementById('emp_nom').value = ''
      document.getElementById('emp_temp').value = ''
    }
    // récup temp list
  }, [props.varGlob.focus])

  function soumettre_updateEmp(data) {
    if (data.emp_etage === '') { data.emp_etage = props.varGlob.focus.emp_etage }
    if (data.emp_nom === '') { data.emp_nom = props.varGlob.focus.emp_nom }
    if (data.emp_temp === '') { data.emp_temp = props.varGlob.focus.emp_temp }
    data.emp_id = props.varGlob.focus.emp_id
    data.emp_temp = parseInt(data.emp_temp)
    fetch('http://localhost:3001/emp/update', lib.optionsPut(data))
      .then(response => {
        if  (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            screen: 'errExp'
          })
        } else {
          props.setMode('neutre')
          props.setVarGlob({
            ...props.varGlob,
            focus: ''
          })
        }
      })
  }

  function soumettre_newEmp(data) {
    fetch('http://localhost:3001/emp/creation', lib.optionsPost(data))
      .then(response => {
        if  (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            screen: 'errExp'
          })
        }
        else
         {
          props.setMode('neutre')
          props.setVarGlob({
            ...props.varGlob,
            focus: ''
          })
        }
     })
  }

  return (
    <div className="">
      {props.mode === 'sélection' && props.varGlob.focus !== '' &&
        <div className="container mx-auto ">
          <form id="form_ut"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit(soumettre_updateEmp)}
          >
            <table className="cadre-15">
            <thead>
                <th className='largeur-110'>Mise à jour</th>
                <th className='largeur-50'>étage</th>
                <th className='largeur-300 gauche'>nom</th>
                <th className='largeur-200 gauche'>type</th>
              </thead>
              <tbody>
                <tr>
                <td className=''>{props.varGlob.focus.emp_id}</td>
                  <td>
                    <input className='input-sans-bordure centrer' id='emp_etage' {...register('emp_etage')} />
                  </td>
                  <td>
                    <input className='input-sans-bordure' id='emp_nom' {...register('emp_nom')} />
                  </td>
                  <td>
                    <select id='emp_temp' {...register('emp_temp')}
                      className='largeur-300'>
                      {tempList.map(temp =>
                        <option       
                          value={temp.temp_id}
                          key={temp.temp_id}>
                          {temp.temp_nom}
                        </option>
                      )}
                    </select>
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
                  screen: 'gestionEmp'
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
            onSubmit={handleSubmit(soumettre_newEmp)}
          >
            <table className="cadre-15">
              <thead>
                <th className=''>Nouvel emplacement</th>
                <th className='largeur-50'>étage</th>
                <th className='largeur-300 gauche'>nom</th>
                <th className='largeur-200 gauche'>type</th>
              </thead>
              <tbody>
                <tr>
                  <td />
                  <td>
                    <input className='input-sans-bordure' id='emp_etage' {...register('emp_etage', { required: true })} />
                    {errors.emp_etage && <p>étage obligatoire</p>}
                  </td>
                  <td>
                    <input className='input-sans-bordure' id='emp_nom' {...register('emp_nom', { required: true })} />
                    {errors.emp_nom && <p>Nom obligatoire</p>}
                  </td>
                  <td>
                    <select id='emp_temp' {...register('emp_temp', { required: true })}
                      className='largeur-300'>
                      <option value=''> </option>
                      {tempList.map(temp =>
                        <option
                          value={temp.temp_id}
                          key={temp.temp_id}>
                          {temp.temp_nom}
                        </option>
                      )}
                    </select>
                    {errors.emp_temp && <p>type obligatoire</p>}
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
                  screen: 'gestionEmp'
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

export default FicheEmp;
