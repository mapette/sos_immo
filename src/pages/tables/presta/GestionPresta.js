import { useState, useEffect } from 'react';
import './../../../tools/App.css';
import Bouton from '../../../tools/Bouton'
import ListPresta from './ListPresta';
import FichePresta from './FichePresta';

const lib = require('../../../lib/lib_divers')

function GestionPresta(props) {
  let [prestaList, setPrestaList] = useState([])
  let [mode, setMode] = useState('neutre')
  
  useEffect(() => {
    fetch('http://localhost:3001/get_presta', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) {
          setPrestaList(prestaList = response)
        }
      })
  }, [,mode,props.varGlob.focus,])



  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION ENTREPRISES PRESTATAIRES
      </h2>
      <ListPresta
        prestaList={prestaList}
        mode={mode}
        setMode={setMode}
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
      />

      {mode != 'neutre' &&
        <FichePresta
          mode={mode}
          setMode={setMode}
          varGlob={props.varGlob}
          setVarGlob={props.setVarGlob}

        />
      }

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
                txt={'Nouveau prestataire'}
                actionToDo={() => setMode('création')}
                couleur={'vert'}
                plein={true}
              />
            </span>
          }
        </div>
      </div>
    </div>
  );
}

export default GestionPresta;
