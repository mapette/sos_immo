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
          couleur={'menu-vert'}
        />
         <Bouton
          txt={'mes demandes'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            ecran: 'menu'
          })}
          couleur={'menu-vert'}
        />
        {props.varGlob.profil === 'administrateur' &&
          <Bouton
            txt={'gestion tables'}
            actionToDo={() => setSMenu('tables')}
            couleur={'menu-bleu'}
          />
        }
        {(props.varGlob.profil === 'technicien' || props.varGlob.profil === 'valideur' || props.varGlob.profil === 'imm') &&
          <span>
            <Bouton
              txt={'suivi incidents'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'menu-orange'}
            />
          </span>
        }
        {(props.varGlob.profil === 'valideur' || props.varGlob.profil === 'imm') &&
          <span>
            <Bouton
              txt={'KPI'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'menu-rouge'}
            />
          </span>
        }
      </div >
      {(props.varGlob.profil === 'administrateur' && smenu === 'tables') &&
        <div className=''>
          <div className='en-ligne'>
            <Bouton
              txt={'utilisateurs'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'gestionUtilisateurs'
              })}
              couleur={'smenu-orange'}
            />
            <Bouton
              txt={'habilitations'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'smenu-orange'}
            />
            <Bouton
              txt={'presta'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'smenu-orange'}
            />
            <Bouton
              txt={'emplacements'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'smenu-bleu'}
            />
            <Bouton
              txt={'type d\'emplacement'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'smenu-bleu'}
            />
            <Bouton
              txt={'mapping incident/presta'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'smenu-bleu'}
            />
            <Bouton
              txt={'types d\'incidents'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'menu'
              })}
              couleur={'smenu-bleu'}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default Menu;
