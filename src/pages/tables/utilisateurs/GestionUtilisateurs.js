import { useState, useEffect } from 'react';
import './../../../tools/App.css';
import Bouton from './../../../tools/Bouton'
import ListUser from './ListUser'
import FCreaUt from './FCreaUt'
import FicheUser from './FicheUser'

const cl_ut = require('../../../lib/lib_cl_ut')
const lib = require('../../../lib/lib_divers')

function GestionUtilisateurs(props) {
  let [bt, setBt] = useState({
    actif: true,
    inactif: false,
    usager: true,
    imm: false,
    technicien: false,
    valideur: false,
  })

  let [mode, setMode] = useState('neutre')
  let ut_liste = new cl_ut.Ut_manager()
  let [lUser, setLUser] = useState([])
  let [prestaList, setPrestaList] = useState([])

  let [focus, setFocus] = useState('') // utilisateur en focus

  useEffect(() => {
    fetch('http://localhost:3001/get_presta', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        //  console.log('response presta list', response) // laisser cette ligne sinon ça marche pas !
        if (response.length !== 0) {
          setPrestaList(prestaList = response)
        }
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/get_users', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) {
          response.forEach(element => {
            //  console.log('elem', element)
            ut_liste.liste.push(new cl_ut.Utilisateur(element))
          });

        }
      })
  }, [, lUser])

  function initFiltre() {
    setBt({
      ...bt,
      actif: true,
      inactif: false,
      usager: false,
      imm: false,
      technicien: false,
      valideur: false,
    })
  }
  function switchBt(btASwitcher) {
    console.log('mode',mode)
    if (mode !== 'création') {
      if (bt[btASwitcher]) {
        setBt({
          ...bt,
          [btASwitcher]: false
        })
      }
      else {
        setBt({
          ...bt,
          [btASwitcher]: true
        })
      }
    }
  }
  function tri() {
    ut_liste.gdFiltre(bt)
    setLUser(ut_liste.liste)
  }

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION UTILISATEURS
      </h2>
      <div className='container bordure cadre-15 '>
        <div className='row'>
          <div className='col-2'>
           { mode !== 'création'  && focus === '' &&
           <Bouton
              txt={'Init filtres'}
              actionToDo={() => initFiltre()}
              couleur={'vert'}
              plein={true}
              espaceEntreBt={false}
              particularite={' bouton-retour fontsize-20 margin-top-15 menu'}
            />}
          </div>
          <div className='col-6 cadre-15'>
            <div className='row'>
              <div className='col-4 en-ligne'>
                <label htmlFor='nomToFind'>nom</label>
                <input id='nomToFind' className='largeur-110'>
                </input>
              </div>
              <div className='col-7 en-ligne'>
                <label>presta</label>
                <select id='prestaToFind' >
                  <option value=''> </option>
                  {prestaList.map(elem =>
                    <option
                      value={elem.presta_id}
                      key={elem.presta_id}>
                      {elem.presta_nom} - {elem.presta_libelle}
                    </option>
                  )}
                </select>
              </div>
            </div>
            <div className='row'>
              <p></p>
            </div>
            <div className='row'>
              <div className='col-3 en-ligne'>
                <Bouton
                  txt={'actif'}
                  actionToDo={() => switchBt('actif')
                  }
                  couleur={'bleu'}
                  plein={bt.actif}
                  espaceEntreBt={false}
                />
                <Bouton
                  txt={'inactif'}
                  actionToDo={() => switchBt('inactif')
                  }
                  couleur={'bleu'}
                  plein={bt.inactif}
                  espaceEntreBt={false}
                />
              </div>
              <div className='col-8 en-ligne'>
                <Bouton
                  txt={'usager'}
                  actionToDo={() => switchBt('usager')
                  }
                  couleur={'orange'}
                  plein={bt.usager}
                  espaceEntreBt={false}
                />
                <Bouton
                  txt={'imm'}
                  actionToDo={() => switchBt('imm')
                  }
                  couleur={'orange'}
                  plein={bt.imm}
                  espaceEntreBt={false}
                />
                <Bouton
                  txt={'technicien'}
                  actionToDo={() => switchBt('technicien')
                  }
                  couleur={'orange'}
                  plein={bt.technicien}
                  espaceEntreBt={false}
                />
                <Bouton
                  txt={'valideur'}
                  actionToDo={() => switchBt('valideur')
                  }
                  couleur={'orange'}
                  plein={bt.valideur}
                  espaceEntreBt={false}
                />
              </div>
            </div>
          </div>
          {mode !== 'création' && focus === '' &&
          <div className='col-2'>
            <Bouton
              txt={'Rafraichir la liste'}
              actionToDo={() => tri()}
              couleur={'vert'}
              plein={true}
              espaceEntreBt={false}
              particularite={' bouton-retour fontsize-20 margin-top-15 menu'}
            />
          </div>}
        </div>
        <p/>
      </div>

      {mode === 'création' &&
        <FCreaUt
          setMode={setMode}
          prestaList={prestaList}
          setPrestaList={setPrestaList}
          userList={lUser}
        />
      }
      { mode !== 'création' && focus != '' &&
        <FicheUser
          varGlob={props.varGlob}
          setVarGlob={props.setVarGlob}
          focus={focus}
          setFocus={setFocus}
          setMode={setMode}
          prestaList={prestaList}
        />
      }
      <div className='gauche decal'>
        <div className='en-ligne'>
          { focus == '' && mode === 'neutre' &&
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
                txt={'Nouvel utilisateur'}
                actionToDo={() => setMode('création')}
                couleur={'vert'}
                plein={true}
              />
            </span>
          }
        </div>
      </div>

      <ListUser
        userList={lUser}
        setFocus={setFocus}
      />

    </div>
  );
}

export default GestionUtilisateurs;