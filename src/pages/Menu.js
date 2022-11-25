import { useState, useEffect } from 'react';
import './../tools/App.css';
import Button from './../tools/Button'


function Menu(props) {

  return (
    <div>
      <p/>
      <div className='en-ligne'>
        <Button
          txt={'Nouvelle demande'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            ecran: 'newInc',
            smenu:'',
          })}
          couleur={'vert'}
          menu={'menu'}
          plein={true}
        />
        <Button
          txt={'Mes demandes'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            profilEcran: 'usager',
            ecran: 'demandes',
            smenu:'',
          })}
          couleur={'vert'}
          menu={'menu'}
          plein={true}
        />
        {props.varGlob.profil === 'admin' &&
          <Button
            txt={'Admin'}
            actionToDo={() => props.setVarGlob({
              ...props.varGlob,
              smenu:'tables',
            })}
            couleur={'bleu'}
            menu={'menu'}
            plein={true}
          />
        }
        {(props.varGlob.profil === 'technicien' || props.varGlob.profil === 'valideur' ) && //|| props.varGlob.profil === 'admin') &&
          <span>
            <Button
              txt={'Suivi des incidents'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                profilEcran: 'techno',
                ecran: 'demandes',
                smenu:'',
              })}
              couleur={'orange'}
              menu={'menu'}
              plein={true}
            />
          </span>
        }
        {(props.varGlob.profil === 'valideur' || props.varGlob.profil === 'admin') &&
          <span>
            <Button
              txt={'Pilotage'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'pilot',
                smenu:'',
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
      (props.varGlob.profil === 'admin' && props.varGlob.smenu === 'tables') &&
        <div className=''>
          <p/>
          <div className='en-ligne'>
            <Button
              txt={'Utilisateurs'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'gestionUtilisateurs',
              })}
              couleur={'orange'}
              menu={'smenu'}
              plein={true}
            />
            <Button
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
            <Button
              txt={'Emplacements'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'gestionEmp'
              })}
              couleur={'bleu'}
              menu={'smenu'}
              plein={true}
            />
            <Button
              txt={'Type d\'emplacement'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'gestionTemp'
              })}
              couleur={'bleu'}
              menu={'smenu'}
              plein={true}
            />
            <Button
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
