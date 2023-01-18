import { useState, useEffect } from 'react';
import './../../../tools/App.css';
import Button from '../../../tools/Button'
import FicheTinc from './FicheTinc';
import ListTinc from './ListTinc';
const lib = require('../../../lib/lib_divers')

function GestionTinc(props) {
  let [tincList, setTincList] = useState([])
  let [prestaList, setPrestaList] = useState([])
  let [mode, setMode] = useState('neutre')

  useEffect(() => {
    fetch('http://localhost:3001/tinc/get_all', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) { setTincList(tincList = response) }
      })
  }, [, mode, props.varGlob.focus])
  useEffect(() => {
    fetch('http://localhost:3001/presta/get_all', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) { setPrestaList(prestaList = response) }
      })
  }, [])

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION TYPES D'INCIDENTS
      </h2>
      <div className='decal mx-auto'>
        <div className='en-ligne'>
          {props.varGlob.focus === '' && mode === 'neutre' &&
            <span>
              <Button
                txt={lib.BT_RETOUR_ACCUEIL}
                actionToDo={() => props.setVarGlob({
                  ...props.varGlob,
                  ecran: 'menu'
                })}
                couleur={'gris'}
                plein={true}
              />
              <Button
                txt={'Nouveau type d\'emplacement'}
                actionToDo={() => setMode('création')}
                couleur={'vert'}
                plein={true}
              />
            </span>
          }
        </div>
      </div>
      {mode !== 'neutre' &&
        <FicheTinc
          mode={mode}
          setMode={setMode}
          varGlob={props.varGlob}
          setVarGlob={props.setVarGlob}
        />
      }
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <ListTinc
              tincList={tincList}
              mode={mode}
              setMode={setMode}
              varGlob={props.varGlob}
              setVarGlob={props.setVarGlob}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GestionTinc;
