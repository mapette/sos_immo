import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from './../../tools/Bouton'
import ListUser from './ListUser'
import FCreaUt from './FCreaUt'

function GestionUtilisateurs(props) {
  let [mode, setMode] = useState('neutre')
  let [userList, setUserList] = useState([])
  let [userNameList, setUserNameList] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/get_users', {
      method: 'get',
      credentials: 'include',
      headers: { Accept: "application/json", 'Content-Type': 'application/json' },
    })
      .then(response => {    // résultat brut
        //  console.log('response1', response)
        return response.json()  // récupère que les données résultat
      })
      .then(response => {
        console.log('response user list', response) // laisser cette ligne sinon ça marche pas !
        if (response.length !== 0) {
          setUserList(userList = response)
        }
        console.log('userList',userList)
        let usl = []
        response.forEach(r => {
          usl.push(r['ut_id'])
        });
        setUserNameList(usl)
      })
  }, [, mode])

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION UTILISATEURS
      </h2>
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
