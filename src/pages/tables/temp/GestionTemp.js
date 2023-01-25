import { useState, useEffect } from 'react';
import './../../../tools/App.css';
import Button from '../../../tools/Button'
import ListTemp from './ListTemp';
import FicheTemp from './FicheTemp';
import Mapping from './Mapping';

const lib = require('../../../lib/lib_divers')

function GestionEmp(props) {
  let [tempList, setTempList] = useState([])
  let [tincList, setTincList] = useState([])
  let [mode, setMode] = useState('neutre')

  useEffect(() => {
    // récupérer tous les temp/tinc pour ne pas avoir à relancer la requête à chaque 
    //    maj de mapping
    fetch('http://localhost:3001/temp/get_all', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if  (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            ecran: 'errExp'
          })
        } else if (response.length !== 0) { setTempList(tempList = response) }
      })
      .catch(() => {
        props.setVarGlob({
          ...props.varGlob,
          ecran: 'err503'
        })
      })
    fetch('http://localhost:3001/tinc/get_all', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) { setTincList(tincList = response) }
      })
  }, [, mode, props.varGlob.focus]) // pour maj auto de la liste

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION TYPES D'EMPLACEMENTS
      </h2>
      <div className='decal mx-auto cadre-15'>
        <div className='en-ligne cadre-15'>
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

        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <ListTemp
              tempList={tempList}
              mode={mode}
              setMode={setMode}
              varGlob={props.varGlob}
              setVarGlob={props.setVarGlob}
            />
          </div>
          <div className='col-6'>
            {mode !== 'neutre' &&
              <FicheTemp
                mode={mode}
                setMode={setMode}
                varGlob={props.varGlob}
                setVarGlob={props.setVarGlob}
              />
            }
            {mode == 'sélection' &&
              <Mapping
                tincList={tincList}
                tempList={tempList}
                mode={mode}
                setMode={setMode}
                varGlob={props.varGlob}
                setVarGlob={props.setVarGlob}
              />
            }
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default GestionEmp;
