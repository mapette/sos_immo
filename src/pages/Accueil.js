import { useState, useEffect } from 'react';
import './../tools/App.css';
import Bouton from './../tools/Bouton'


function Menu(props) {
  let [smenu, setSMenu] = useState('aucun')

  useEffect(() => {
    setSMenu('aucun')
  }, [])

  return (
    <div>
      <p/>
      <div className='en-ligne'>
        <Bouton
          txt={'Nouvelle demande'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            ecran: 'newInc'
          })}
          couleur={'vert'}
          menu={'menu'}
          plein={true}
        />
        <Bouton
          txt={'Mes demandes'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            profilEcran: 'usager',
            ecran: 'demandes',

          })}
          couleur={'vert'}
          menu={'menu'}
          plein={true}
        />
        {props.varGlob.profil === 'admin' &&
          <Bouton
            txt={'Admin'}
            actionToDo={() => setSMenu('tables')}
            couleur={'bleu'}
            menu={'menu'}
            plein={true}
          />
        }
        {(props.varGlob.profil === 'technicien' || props.varGlob.profil === 'valideur' ) && //|| props.varGlob.profil === 'admin') &&
          <span>
            <Bouton
              txt={'Suivi des incidents'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                profilEcran: 'techno',
                ecran: 'demandes',

              })}
              couleur={'orange'}
              menu={'menu'}
              plein={true}
            />
          </span>
        }
        {(props.varGlob.profil === 'valideur' || props.varGlob.profil === 'admin') &&
          <span>
            <Bouton
              txt={'Pilotage'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'pilot',
                profilEcran: 'pilotage',
              })}
              couleur={'rouge'}
              menu={'menu'}
              plein={true}
            />
          </span>
        }
      </div >
      {
      (props.varGlob.profil === 'admin' && smenu === 'tables') &&
        <div className=''>
          <p/>
          <div className='en-ligne'>
            <Bouton
              txt={'Utilisateurs'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'gestionUtilisateurs'
              })}
              couleur={'orange'}
              menu={'smenu'}
              plein={true}
            />
            <Bouton
              txt={'Prestataires'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'gestionPresta'
              })}
              couleur={'orange'}
              menu={'smenu'}
              plein={true}
            />
            </div>
            <p/>
            <div >
            <Bouton
              txt={'Emplacements'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'gestionEmp'
              })}
              couleur={'bleu'}
              menu={'smenu'}
              plein={true}
            />
            <Bouton
              txt={'Type d\'emplacement'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'gestionTemp'
              })}
              couleur={'bleu'}
              menu={'smenu'}
              plein={true}
            />
            <Bouton
              txt={'Types d\'incidents'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'bleu'}
              menu={'smenu'}
              plein={true}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default Menu;
