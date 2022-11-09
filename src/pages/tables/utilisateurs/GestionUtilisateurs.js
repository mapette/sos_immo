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

  useEffect(() => {
    fetch('http://localhost:3001/get_presta', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
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
      nom: null,
      presta: null,
    })
  }
  function switchBt(btASwitcher) {
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
  function filtreRecherches() {
    setBt({
      ...bt,
      nom: document.getElementById('nomToFind').value.toLowerCase(),
      presta: document.getElementById('prestaToFind').value,
    })
  }
  function tri() {
    filtreRecherches()
    ut_liste.gdFiltre(bt)
    setLUser(ut_liste.liste)
  }

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION UTILISATEURS
      </h2>
      {mode !== 'création' && props.varGlob.focus === '' &&
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
                  <label>Prestataire</label>
                  <select id='prestaToFind' >
                    <option value=''></option>
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
                <p />
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
                    txt={'admin'}
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
          <p />
          <div className='gauche decal en-ligne'>
            {props.varGlob.focus === '' && mode === 'neutre' &&
              <span>
                <Bouton
                  txt={lib.BT_RETOUR_ACCUEIL}
                  actionToDo={() => props.setVarGlob({
                    ...props.varGlob,
                    ecran: 'menu',
                    focus: '',
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
          <p />
        </div>
      }

      {mode === 'création' &&
        <FCreaUt
          setMode={setMode}
          prestaList={prestaList}
          setPrestaList={setPrestaList}
          userList={lUser}
        />
      }
      {mode !== 'création' && props.varGlob.focus !== '' &&
        <FicheUser
          varGlob={props.varGlob}
          setVarGlob={props.setVarGlob}
          setMode={setMode}
          prestaList={prestaList}
        />
      }

      <ListUser
        userList={lUser}
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
        prestaList={prestaList}
        setMode={setMode}
      />
    </div>
  );
}

export default GestionUtilisateurs;
