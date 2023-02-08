import './../tools/App.css';
import Button from './../tools/Button'

function Menu(props) {

  return (
    <div>
      <p />
      <div className='en-ligne'>
        <Button
          txt={'Nouvelle demande'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            screen: 'newInc',
            smenu: '',
          })}
          couleur={'vert'}
          menu={'menu'}
          plein={true}
        />
        <Button
          txt={'Mes demandes'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            profilScreen: 'usager',
            screen: 'myReport',
            smenu: '',
          })}
          couleur={'vert'}
          menu={'menu'}
          plein={true}
        />

        {(props.varGlob.profil === 'valideur' || props.varGlob.profil === 'admin') &&
          <span>
            <Button
              txt={'Pilotage'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                screen: 'pilot',
                smenu: '',
                profilScreen: 'pilotage',
              })}
              couleur={'rouge'}
              menu={'menu'}
              plein={true}
            />
          </span>
        }
        {props.varGlob.profil === 'technicien' &&
          <span>
            <Button
              txt={'Suivi des incidents'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                profilScreen: 'techno',
                screen: 'myReport',
                smenu: '',
              })}
              couleur={'orange'}
              menu={'menu'}
              plein={true}
            />
          </span>
        }

        {props.varGlob.profil === 'admin' &&
          <Button
            txt={'Admin'}
            actionToDo={() => props.setVarGlob({
              ...props.varGlob,
              smenu: 'tables',
            })}
            couleur={'bleu'}
            menu={'menu'}
            plein={true}
          />
        }

        {props.varGlob.profil === 'admin' &&
          <span>
            <Button
              txt={'Archivage'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                screen: 'archivage',
                smenu: '',
                profilScreen: 'pilotage',
              })}
              couleur={'bleu'}
              menu={'menu'}
              plein={true}
            />
          </span>
        }
      </div >

      {(props.varGlob.profil === 'admin' && props.varGlob.smenu === 'tables') &&
        <div className=''>
          <p />
          <div className='en-ligne'>
            <Button
              txt={'Utilisateurs'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                screen: 'gestionUtilisateurs',
              })}
              couleur={'orange'}
              menu={'smenu'}
              plein={true}
            />
            <Button
              txt={'Prestataires'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                screen: 'gestionPresta'
              })}
              couleur={'orange'}
              menu={'smenu'}
              plein={true}
            />
          </div>
          <p />
          <div >
            <Button
              txt={'Emplacements'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                screen: 'gestionEmp'
              })}
              couleur={'orange'}
              menu={'smenu'}
              plein={true}
            />
            <Button
              txt={'Type d\'emplacement'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                screen: 'gestionTemp'
              })}
              couleur={'orange'}
              menu={'smenu'}
              plein={true}
            />
            <Button
              txt={'Types d\'incidents'}
              actionToDo={() => props.setVarGlob({
                ...props.varGlob,
                // screen: 'gestionTemp',
                screen: 'gestionTinc',
              })}
              couleur={'orange'}
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
