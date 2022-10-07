import React from 'react';
import './../tools/App.css';
import ic_reset from './../img/ic_change_password.png'
import ic_logout from './../img/ic_logout.jfif'
import logo from './../img/logo.jfif'

function Accueil(props) {
  return (
    <header className="App-header">
      <div>
        <img src={logo}
          width="100" height="100"></img>
      </div>
      <div className="gras cadre-15">
        SOS IMMO
      </div>
      <div className='gauche ut-titre cadre-15'>
        <div>
          utilisateur
        </div>
        <div>
          profil
        </div>
      </div>
      <div className='gauche ut-id cadre-15'>
        <div>
          {props.varGlob.nom}
        </div>
        <div>
          {props.varGlob.profil}
        </div>
      </div>
      <div>

      </div>
      {props.varGlob.ecran !== 'accueil' &&
        <div>
          <div className='bt-exit'>
            <button type="image"
              className='cadre-3'
              onClick={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'changemdp'
              })} >
              <img className='arr-img' src={ic_reset}
                width="70" height="70" />
            </button>
            <a href='' className='cadre-3'>
              <img className='arr-img' src={ic_logout}
                width="70" height="70"></img>
            </a>
          </div>
          <div className='bt-exit'>
          </div>
        </div>
      }

    </header>
  );
}

export default Accueil;



/*

  <img href='https://www.bing.com/th?q=Herisson+Dessin+Simple&w=80&h=80&c=7&rs=1&p=0&o=5&pid=1.7&mkt=fr-FR&cc=FR&setlang=fr&adlt=moderate&t=1'>
    
*/
