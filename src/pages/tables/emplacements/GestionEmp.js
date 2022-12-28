import { useState, useEffect } from 'react';
import './../../../tools/App.css';
import Button from '../../../tools/Button'
import ListEmp from './ListEmp';
import FicheEmp from './FicheEmp';
const lib = require('../../../lib/lib_divers')

function GestionEmp(props) {
  let [empList, setEmpList] = useState([])
  let [mode, setMode] = useState('neutre')
  
  useEffect(() => {
    fetch('http://localhost:3001/emp/get_all', lib.optionsGet())
       .then(response => response.json())
       .then(response => {
         if (response.length !== 0) { setEmpList(empList = response) }
        })
  }, [,mode,props.varGlob.focus])

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION EMPLACEMENTS / LIEUX
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
                txt={'Nouvel emplacement'}
                actionToDo={() => setMode('création')}
                couleur={'vert'}
                plein={true}
              />
            </span>
          }
        </div>
      </div>
      {mode !== 'neutre' &&
        <FicheEmp
          mode={mode}
          setMode={setMode}
          varGlob={props.varGlob}
          setVarGlob={props.setVarGlob}
        />
      }
      <ListEmp
        empList={empList}
        mode={mode}
        setMode={setMode}
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
      />

    </div>
  );
}

export default GestionEmp;
