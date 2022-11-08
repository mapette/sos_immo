import { useState, useEffect } from 'react';
import './../../../tools/App.css';
import Bouton from '../../../tools/Bouton'
import ListEmp from './ListEmp';
import FicheEmp from './FicheEmp';

const cl_emp = require('../../../lib/lib_cl_emp')
const lib = require('../../../lib/lib_divers')

function GestionEmp(props) {
  let [empList, setEmpList] = useState([])  // emplacements après Refresh
  let [etageList, setEtageList] = useState([])
  let [mode, setMode] = useState('neutre')
  let emp_liste = new cl_emp.Emp_manager()
  let [filtre, setFiltre] = useState({})

  useEffect(() => {
    fetch('http://localhost:3001/get_emp', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) {
          let etages = []
          response.forEach(element => {
            // tous les emplacements de la base
            emp_liste.liste.push(new cl_emp.Emplacement(element))
            if (!(etages.includes(element['emp_etage']))) {
              etages.push(element['emp_etage'])
            }
          })
          setEtageList(etages)
        }
        console.log('fetch',emp_liste.liste)
      })
  }, [, mode, props.varGlob.focus, empList,])



  function initFiltre() { }
  function tri() {
    // setFiltre({
    //   ...filtre,
    //   etage: lib.cleanNull(document.getElementById('etage').value),
    // })
    // console.log('0',emp_liste.liste)
    // emp_liste.gdFiltre(filtre)
    // setEmpList(emp_liste.liste)
    console.log('tri', emp_liste.liste)   // emp_liste.liste est vide !!!!!!!!!!!!!!!
   // setEmpList(emp_liste.liste)
   }

// console.log('props', emp_liste.liste)
  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION EMPLACEMENTS / LIEUX
      </h2>
      <div className='decal mx-auto'>
        <div className='en-ligne'>
          {props.varGlob.focus === '' && mode === 'neutre' &&
            <span>
              <div className='mx-auto container bordure arr-img cadre-15 '>
                <div className='row'>
                  <div className='col-2'>
                    <Bouton
                      txt={'Init filtres'}
                      actionToDo={() => initFiltre()}
                      couleur={'vert'}
                      plein={true}
                      espaceEntreBt={false}
                      particularite={' bouton-retour fontsize-20 margin-top-15 menu'}
                    />
                  </div>
                  <div className='col-6 cadre-15'>
                    <div className='row'>
                      <div className='col-4 en-ligne'>
                        <label htmlFor='nomToFind'>Critère</label>
                        <input id='nomToFind' className='largeur-110'>
                        </input>
                      </div>
                      <div className='col-7 en-ligne'>
                        <label>étage</label>
                        <select id='etage' >
                          <option value=''></option>
                          {etageList.map(elem =>
                            <option
                              value={elem}
                              key={elem}>
                              {elem}
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className='row'>
                      <p></p>
                    </div>
                    
                  </div>
                  <div className='col-2'>
                    <Bouton
                      txt={'Rafraichir la liste'}
                      actionToDo={() => tri()}
                      couleur={'vert'}
                      plein={true}
                      espaceEntreBt={false}
                      particularite={' bouton-retour fontsize-20 margin-top-15 menu'}
                    />
                  </div>
                </div>

        </div>
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
