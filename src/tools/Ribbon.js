import ic_reset from './../img/ic_change_password.png'
import ic_logout from './../img/ic_logout.jfif'
import logo from './../img/logo.jfif'
import './Ribbon.css';

const lib = require('../lib/lib_divers')

function Ribbon(props) {

  return (
    <header className="App-header">
      <div className="ribbon-marge"></div>
      <div className="ribbon-logo">
        <img src={logo}
          width="150" height="150"></img>
      </div>
      <div className="gras noir ribbon-nom-appli cadre-15">
        SOS IMMO
      </div>

      {props.varGlob.screen !== 'login' && props.varGlob.screen !== 'oubliMdp' &&
        <div  className='ribbon-nom-profil'>
          <div>
            <div className='gauche color-titre cadre-15'>
              <span>utilisateur : </span>
              <span>{props.varGlob.userName}</span>
            </div>
            <div className='gauche color-id cadre-15'>
              <span>profil : </span>
              <span>{props.varGlob.profil}</span>
            </div>
          </div>
        </div>
      }

      {props.varGlob.screen !== 'login' && props.varGlob.screen !== 'oubliMdp' &&
        <div className='ribbon-bt'>
          <button type="image"
            className='cadre-3'
            onClick={() => props.setVarGlob({
              ...props.varGlob,
              screen: 'changemdp'
            })} >
            <img title='changer le mot de passe'
              className='arr-img ribbon-bt-length' src={ic_reset} />
          </button>
        </div>
      }

      {props.varGlob.screen !== 'login' && props.varGlob.screen !== 'oubliMdp' &&
        <div className='ribbon-bt' >
          <button
            type="image"
            className='cadre-3 '
            onClick={() => {
              fetch('http://localhost:3001/logout', lib.optionsREST('get',))
              fetch('http://localhost:3001/welcome', lib.optionsREST('get',))
              props.setVarGlob({
                ...props.varGlob,
                screen: 'login',
                smenu: '',
                profilScreen: '',
                focus: '',
              })
            }} >
            <img title='déconnexion'
              className='arr-img ribbon-bt-length' src={ic_logout} />
          </button>
        </div>
      }
      
      <div className="ribbon-marge"></div>
    </header>
  );
}

export default Ribbon;
