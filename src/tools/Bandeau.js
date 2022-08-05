import React from 'react';
import './../tools/App.css';
import Bouton from './Bouton'
import im_reset_pw from './../reset_pw.png'
import im_logout from './../logout.jfif'

function Accueil(props) {
  return (
    <header className="App-header">
      <div>
        <img src="https://th.bing.com/th/id/OIP.AH6aNXRlFeyInatyjgermwHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7"
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
              <img className='arr-img' src={im_reset_pw}
                width="70" height="70" />
            </button>
            <a href='' className='cadre-3'>
              <img className='arr-img' src={im_logout}
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
