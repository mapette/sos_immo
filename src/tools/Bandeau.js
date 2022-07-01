import React from 'react';
import './../tools/App.css';

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
          <a href='' className='cadre-3'>
              <img className='arr-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLhebUSApSBT0k2djGywo6tA9kUhheCR0kew&usqp=CAU"
                width="70" height="70"></img>
            </a>
            <a href='' className='cadre-3'>
              <img className='arr-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6RcYRF_8ZcI6b0C9GqsR4AkzKsnSfdN1Jfg&usqp=CAU"
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
