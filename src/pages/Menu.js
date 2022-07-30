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
      <div className=''>
        <Bouton
          txt={'retour accueil'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            ecran: 'accueil'
          })}
          couleur={'gris'}
        />
      </div>
      <div className='en-ligne'>
        <Bouton
          txt={'nouvelle demande'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            ecran: 'newInc'
          })}
          couleur={'vert'}
          menu={'menu'}
        />
        <Bouton
          txt={'mes demandes'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            profilEcran: 'usager',
            ecran: 'demandes',

          })}
          couleur={'vert'}
          menu={'menu'}
        />
        {props.varGlob.profil === 'imm' &&
          <Bouton
            txt={'gestion tables'}
            actionToDo={() => setSMenu('tables')}
            couleur={'bleu'}
            menu={'menu'}
          />
        }
        {(props.varGlob.profil === 'technicien' || props.varGlob.profil === 'valideur' || props.varGlob.profil === 'imm') &&
          <span>
            <Bouton
              txt={'suivi incidents'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                profilEcran: 'techno',
                ecran: 'demandes',

              })}
              couleur={'orange'}
              menu={'menu'}
            />
          </span>
        }
        {(props.varGlob.profil === 'valideur' || props.varGlob.profil === 'imm') &&
          <span>
            <Bouton
              txt={'KPI'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu',
              })}
              couleur={'rouge'}
              menu={'menu'}
            />
          </span>
        }
      </div >
      {(props.varGlob.profil === 'imm' && smenu === 'tables') &&
        <div className=''>
          <div className='en-ligne'>
            <Bouton
              txt={'utilisateurs'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'gestionUtilisateurs'
              })}
              couleur={'orange'}
              menu={'smenu'}
            />
            <Bouton
              txt={'habilitations'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'orange'}
              menu={'smenu'}
            />
            <Bouton
              txt={'presta'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'orange'}
              menu={'smenu'}
            />
            <Bouton
              txt={'emplacements'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'bleu'}
              menu={'smenu'}
            />
            <Bouton
              txt={'type d\'emplacement'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'bleu'}
              menu={'smenu'}
            />
            <Bouton
              txt={'mapping incident/presta'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'bleu'}
              menu={'smenu'}
            />
            <Bouton
              txt={'types d\'incidents'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'bleu'}
              menu={'smenu'}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default Menu;
