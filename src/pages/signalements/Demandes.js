import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from './../../tools/Bouton'
import PostItInc from './PostItInc'

const lib = require('./../../lib/lib_divers')
const display = require('./../../lib/lib_display')

function Demandes(props) {
  let [lInc, setLInc] = useState([])

  useEffect(() => {
    // liste des incidents selon qui profilEcran et profil du demandeur
    let data = {
      profilEcran: props.varGlob.profilEcran,
      profil: props.varGlob.profil,
    }
    let url_fetch = lib.determineURL("demande", data)
    console.log('url', url_fetch)
    fetch(url_fetch, lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        console.log('response liste incidents', response) // laisser cette ligne sinon ça marche pas !
        setLInc(response)
      })
  }, [])

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        {lib.determineTitre(props.varGlob.profilEcran)}
      </h2>
      <br />
      <div className={display.textAlign(props.varGlob.profilEcran)}>
        <div className='row no-gutter'>
          <div className="no-padding">
            {lInc.map(elem =>
              <div className={display.alignement(props.varGlob.profilEcran)} key={elem.inc_id}>
                <PostItInc
                  elem={elem}
                  varGlob={props.varGlob}
                  setVarGlob={props.setVarGlob}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <Bouton
        txt={'retour au menu'}
        actionToDo={() => props.setVarGlob({
          ...props.varGlob,
          ecran: 'menu'
        })}
        couleur={'gris'}
        plein={true}
      />

    </div>
  );
}

export default Demandes;

/*        

*/