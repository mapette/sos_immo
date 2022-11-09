import { useState, useEffect } from 'react';
import './../../../tools/App.css';
import Bouton from '../../../tools/Bouton'
import ListTemp from './ListTemp';
import FicheTemp from './FicheTemp';

const lib = require('../../../lib/lib_divers')

function GestionEmp(props) {
  let [tempList, setTempList] = useState([])
  let [mode, setMode] = useState('neutre')

  useEffect(() => {
    fetch('http://localhost:3001/get_temp', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) { setTempList(tempList = response) }
      })
  }, [, mode, props.varGlob.focus])

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION TYPES D'EMPLACEMENTS
      </h2>
      <div className='decal mx-auto'>
        <div className='en-ligne'>
          {props.varGlob.focus === '' && mode === 'neutre' &&
            <span>
              <Bouton
                txt={lib.BT_RETOUR_ACCUEIL}
                actionToDo={() => props.setVarGlob({
                  ...props.varGlob,
                  ecran: 'menu'
                })}
                couleur={'gris'}
                plein={true}
              />
              <Bouton
                txt={'Nouveau type d\'emplacement'}
                actionToDo={() => setMode('création')}
                couleur={'vert'}
                plein={true}
              />
            </span>
          }
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
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
          </div>
        </div>
      </div>

    </div>
  );
}

export default GestionEmp;
