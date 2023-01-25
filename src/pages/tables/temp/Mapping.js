import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../../tools/App.css';
import SubmitButton from '../../../tools/SubmitButton'
import Button from '../../../tools/Button'
import Warning from '../../../tools/Warning'
const lib = require('../../../lib/lib_divers')

function Mapping(props) {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  let [mappList, setMappList] = useState([])
  let [mappMode, setMappMode] = useState('neutre')
  let [mappFocus, setMappFocus] = useState('')
  let [triggerUpdate, setTriggetUpdate] = useState('')
  let [warning, setWarning] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/mapping/get_by_temp/' + props.varGlob.focus.temp_id, lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) { setMappList(mappList = response) }
        else { setMappList(mappList = []) }
      })
    setMappMode('neutre')
    setWarning('')
  }, [props.varGlob.focus, triggerUpdate])

  function showDetails(id) {
    setWarning('')
    if (props.mode !== 'création') {
      fetch('http://localhost:3001/mapping/get_one/' + id, lib.optionsGet())
        .then(response => response.json())
        .then(response => {
          setMappMode('sélectionMapping')
          setMappFocus(response[0])
        })
    }
  }

  function soumettre_newMapping(data) {
    let isAlreadyMapped = false
    mappList.forEach(map => {
      if (map.mapping_tinc === parseInt(data.tinc)) { isAlreadyMapped = true }
    })
    if (isAlreadyMapped === true) { setWarning('doublon') }
    else {
      data.temp = props.varGlob.focus.temp_id
      fetch('http://localhost:3001/mapping/creation', lib.optionsPost(data))
        .then(response => {
          if  (response.status === 666) {
            props.setVarGlob({
              ...props.varGlob,
              ecran: 'errExp'
            })
          } else {
            setMappMode('neutre')
            setTriggetUpdate(triggerUpdate + 1)
          }
        })
    }
  }

  function soumettre_delMapping() {
    fetch('http://localhost:3001/mapping/delete/' + mappFocus.mapping_id, lib.optionsGet())
      .then(response => {
        if  (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            ecran: 'errExp'
          })
        } else { setTriggetUpdate(triggerUpdate + 1) }
      })
  }

  return (
    <div className="container mx-auto bordure cadre-15">
      <h3 className="titre gras cadre-15">
        MAPPING types emplacements/incidents
      </h3>
      {/* nouveau mapping */}
      <form id="form_ut"
        type="POST"
        encType="application/x-www-form-urlencoded"
        onSubmit={handleSubmit(soumettre_newMapping)}
      >
        <table className="cadre-15">
          <thead>
            <th className=''>nouveau</th>
            <th className='largeur-300 '>types d'emplacement</th>
            <th className='largeur-300 '>types d'incidents</th>
          </thead>
          <tbody>
            <tr key={mappFocus.mapping_id}>
              <td />
              <td className='gauche' >{props.varGlob.focus.temp_nom}</td>
              <td>
                <select id='tinc' {...register('tinc', { required: true })}
                  className=''>
                  <option />
                  {props.tincList.map(tinc =>
                    <option
                      value={tinc.tinc_id}
                      key={tinc.tinc_id}>
                      {tinc.tinc_nom} -  {tinc.presta_nom}
                    </option>
                  )}
                </select>
                {errors.tinc && <p>Champs obligatoires</p>}
              </td>
            </tr>
          </tbody>
        </table>
        {warning === 'doublon' &&
          <Warning
            msg={`Type d'incident déjà référencé`}
            niveau={'alerteSimple'}
          />
        }
        <SubmitButton
          txt={'Création nouveau mapping'}
          couleur={'vert'}
          plein={true}
        />
      </form>

      {/* liste mapping pour ce type d'emplacement */}
      <table className="cadre-15">
        <thead>
          <th className='largeur-500 '>types d'incidents possibles</th>
          <th className='largeur-300 '>prestataire en charge</th>
        </thead>
        <tbody>
          {mappList.map(mapping =>
            <tr key={mapping.mapping_id} onClick={() => showDetails(mapping.mapping_id)}>
              <td className='gauche' >{mapping.tinc_nom}</td>
              <td className='gauche'>{mapping.presta_nom} - {mapping.presta_libelle}</td>
            </tr>
          )}
        </tbody>
      </table>


      {/* suppression du  mapping sélectionné */}
      {mappMode === 'sélectionMapping' &&
        <div>
          <table className="cadre-15">
            <thead className='largeur-500' >
              <th className=''>mapping</th>
              <th className='largeur-300 '>types d'emplacement</th>
              <th className='largeur-300 '>types d'incidents</th>
              <th className='largeur-110 '>prestataire en charge</th>
            </thead>
            <tbody>
              <tr>
                <td className='' >{mappFocus.mapping_id}</td>
                <td className='gauche' >{mappFocus.temp_nom}</td>
                <td className='gauche' >{mappFocus.tinc_nom}</td>
                <td className='gauche'>{mappFocus.presta_nom}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <Button
              txt={'Suppression mapping'}
              actionToDo={() => soumettre_delMapping()}
              couleur={'rouge'}
              plein={true}
            />
          </div>
        </div>
      }
      <p/>
    </div>
  );
}

export default Mapping;