import React from 'react';
import './../tools/App.css';
import ic_reset from './../img/ic_change_password.png'
import ic_logout from './../img/ic_logout.jfif'
import logo from './../img/logo.jfif'

function Ribbon(props) {

  return (
    <header className="App-header">
      <div>
        <img src={logo}
          width="150" height="150"></img>
      </div>
      <div className="gras noir largeur-400 cadre-15">
        SOS IMMO
      </div>

      {props.varGlob.ecran !== 'login' &&
        <div className='largeur-1000'>
          <div className='gauche ut-titre cadre-15'>
            <span>utilisateur : </span>
            <span>{props.varGlob.nom}</span>
          </div>
          <div className='gauche ut-id cadre-15'>
            <span>profil : </span>
            <span>{props.varGlob.profil}</span>
          </div>
        </div>
        }
      {props.varGlob.ecran !== 'login' &&
        <div>
          <div className='bt-exit'>
            <button type="image"
              className='cadre-3'
              onClick={() => props.setVarGlob({
                ...props.varGlob,
                ecran: 'changemdp'
              })} >
              <img className='arr-img' src={ic_reset}
                width="50" height="50" />
            </button>
            <a href='' className='cadre-3'>
              <img className='arr-img' src={ic_logout}
                width="60" height="60" />
            </a>
          </div>
        </div>
      }
    </header>
  );
}

export default Ribbon;
