import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../../tools/App.css';
import Button from '../../../tools/Button'
import SubmitButton from '../../../tools/SubmitButton'
const lib = require('../../../lib/lib_divers')

function FicheTemp(props) {
  let [prestaList, setPrestaList] = useState([])
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    fetch('http://localhost:3001/presta/get_all', lib.optionsREST('get',))
      .then(response => response.json())
      .then(response => {
        if  (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            screen: 'errExp'
          })
        }else if (response.length !== 0) {
          setPrestaList(prestaList = response)
        }
      })
  }, [])
  useEffect(() => {
    if (props.mode === 'sélection') {
      document.getElementById('tinc_nom').value = props.varGlob.focus.tinc_nom
      document.getElementById('presta_id').value = props.varGlob.focus.tinc_presta
    }
    else if (props.mode === 'création') {
      document.getElementById('tinc_nom').value = ''
      document.getElementById('presta_id').value = ''
    }
  }, [props.varGlob.focus])

  function soumettre_updateTinc(data) {
    if (data.tinc_nom === '') { data.tinc_nom = props.varGlob.focus.tinc_nom }
    if (data.presta_id === '') { data.presta_id = props.varGlob.focus.tinc_presta }
    data.tinc_id = props.varGlob.focus.tinc_id
    fetch('http://localhost:3001/tinc/update', lib.optionsREST('put',data))
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

  function soumettre_newTemp(data) {
    fetch('http://localhost:3001/tinc/create', lib.optionsREST('post',data))
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

  return (
    <div className="">
      {props.mode === 'sélection' && props.varGlob.focus !== '' &&
        <div className="container mx-auto ">
          <form id="form_ut"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit(soumettre_updateTinc)}
          >
            <table className="cadre-15">
            <thead>
                <th className='largeur-110'>Mise à jour</th>
                <th className='largeur-400 '>nom</th>
                <th className='largeur-300 '>presta en charge</th>
              </thead>
              <tbody>
                <tr>
                  <td className='largeur-110'>{props.varGlob.focus.tinc_id}</td>
                  <td className=''>
                    <input className='input-sans-bordure largeur-400'
                      id='tinc_nom' {...register('tinc_nom')} />
                  </td>
                  <td>
                    <select id='presta_id' {...register('presta_id')}
                      className='largeur-300'>
                      {prestaList.map(presta =>
                        <option       
                          value={presta.presta_id}
                          key={presta.presta_id}>
                          {presta.presta_nom} - {presta.presta_libelle}
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
                  screen: 'gestionTinc'
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
                <th className=''>Nouveau type</th>
                <th className='largeur-400 '>nom</th>
                <th className='largeur-300 '>prestataire en charge</th>
              </thead>
              <tbody>
                <tr>
                  <td className=''></td>
                  <td>
                    <input className='input-sans-bordure largeur-400' id='tinc_nom' {...register('tinc_nom', { required: true })} />
                    {errors.tinc_nom && <p>Nom obligatoire</p>}
                  </td>
                  <td>
                    <select id='presta_id' {...register('presta_id', { required: true })}
                      className='largeur-300'>
                      {prestaList.map(presta =>
                        <option
                          value={presta.presta_id}
                          key={presta.presta_id}>
                          {presta.presta_nom}
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
                  screen: 'gestionTinc'
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
