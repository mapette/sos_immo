import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from './../../tools/Bouton'
import PostItInc from './PostItInc'
import DetailsInc from './DetailsInc'

const lib = require('./../../lib/lib_divers')

function Demandes(props) {
  let [lInc, setLInc] = useState([])
  let [focus, setFocus] = useState('') // id de l'incident détaillé

  useEffect(() => {
    let option = {
      method: 'get',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }
    let url_fetch = lib.determineURL(props.varGlob.profil_ecran)
    fetch(url_fetch, option)
      .then(response =>  response.json())  // récupère que les données résultat
      .then(response => {
        console.log('response liste incidents', response) // laisser cette ligne sinon ça marche pas !
        setLInc(response)
      })
  }, [])

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        {lib.determineTitre(props.varGlob.profil_ecran)}
      </h2>
      <br />
      <div className='container no-gutter'>
        <div className='row no-gutter'>
          {focus != '' &&
            <div className="col-sx-7 col-sm-5 col-lg-3 col-xl-3 no-padding">
              < DetailsInc
                ecran={props.varGlob.ecran}
                profil_ecran={props.varGlob.profil_ecran}
                lInc={lInc}
                focus={focus}
                setFocus={setFocus}
              />
            </div>
          }
          <div className="col-sx-5 col-sm-7 col-lg-9 col-xl-9 no-padding">
            {lInc.map(elem =>
              <div className='en-ligne' key={elem.id}>
                <PostItInc
                  elem={elem}
                  ecran={props.varGlob.ecran}
                  setFocus={setFocus}
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
      />

    </div>
  );
}

export default Demandes;

/*        

*/