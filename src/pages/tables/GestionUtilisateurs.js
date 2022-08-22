import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from './../../tools/Bouton'
import ListUser from './ListUser'
import FCreaUt from './FCreaUt'

function GestionUtilisateurs(props) {
  let [bt, setBt] = useState({
    actif: true,
    inactif: true,
    usager: true,
    imm: true,
    technicien: true,
    valideur: true,
  })
  let [mode, setMode] = useState('neutre')
  let [userList, setUserList] = useState([])
  let [userNameList, setUserNameList] = useState([])  //passé en props création

  useEffect(() => {
    fetch('http://localhost:3001/get_users', {
      method: 'get',
      credentials: 'include',
      headers: { Accept: "application/json", 'Content-Type': 'application/json' },
    })
      .then(response => {    // résultat brut
        return response.json()  // récupère que les données résultat
      })
      .then(response => {
        console.log('response user list', response) // laisser cette ligne sinon ça marche pas !
        if (response.length !== 0) {
          setUserList(userList = response)
        }
        console.log('userList', userList)  // on pourrait ne le faire qu'en cas de création
        let listeTempo = []
        response.forEach(r => {
          listeTempo.push(r['ut_id'])
        });
        setUserNameList(listeTempo)
      })
    console.log('username', userNameList)
    console.log('user', userList)
  }, [, mode, bt])

  function switchBt(btASwitcher) {
    console.log('bt.usager',bt.usager)
    console.log('btASwitcher',bt[btASwitcher])
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
    // retirer de userList les éléments de bt False

  }

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION UTILISATEURS
      </h2>
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
            <Bouton
              txt={'init filtres'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'newInc'
              })}
              couleur={'vert'}
              plein={true}
              espaceEntreBt={false}
              particularite={' bouton-retour fontsize-20 margin-top-15 menu'}
            />
          </div>
          <div className='col-8 cadre-15'>
            <div className='row'>
              <div class='col-3 en-ligne'>
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
              <div class='col-8 en-ligne'>
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
            <div className='row'>
              <p></p>
            </div>
            <div className='row'>
              <div class='col-3 en-ligne'>
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
              <div class='col-8 en-ligne'>
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
        </div>
      </div>

      {mode === 'création' &&
        <FCreaUt
          setMode={setMode}
          userNameList={userNameList}
        />
      }
      {mode === 'sélection' &&
        <div className='cadre-15'>
          <span className='cadre-15'>
            <label htmlFor='deb'>inscription </label>
            <input type="date" id='deb'></input>
          </span>
          <span className='cadre-15'>
            <label htmlFor='operateur'>operateur </label>
            <input id='operateur'></input>
          </span>
          <span className='cadre-15'>
            <label htmlFor='exp'>expiration </label>
            <input type="date" id='exp'></input>
          </span>
        </div>
      }
      <div className='en-ligne'>
        {mode === 'neutre' &&
          <span>
            <Bouton
              txt={'retour au menu'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'gris'}
            />
            <Bouton
              txt={'Nouvel utilisateur'}
              actionToDo={() => setMode('création')}
              couleur={'vert'}
            />
            <Bouton
              txt={'Affichage utilisateur sélectionné'}
              actionToDo={() => setMode('sélection')}
              couleur={'bleu'}
            />
          </span>
        }
        {mode === 'sélection' &&
          <span>
            <Bouton
              txt={'retour liste'}
              actionToDo={() => setMode('neutre')}
              couleur={'gris'}
            />
            <Bouton
              txt={'Validation mises à jours'}
              actionToDo={() => setMode('sélection')}
              couleur={'bleu'}
            />
            <Bouton
              txt={'Résiliation'}
              actionToDo={() => setMode('sélection')}
              couleur={'rouge'}
            />
          </span>
        }
      </div>
      <ListUser
        userList={userList}
      />
    </div>
  );
}

export default GestionUtilisateurs;
