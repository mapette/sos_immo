import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Button from './../../tools/Button'
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
    fetch(url_fetch, lib.optionsGet())
      .then(response => response.json())
      .then(response => {
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
          <div className='gras'>Incidents attente d'affectation</div>
          <div className="no-padding">
            {lInc.map(elem => elem.inc_affect_date === null &&
              <div className={display.alignement(props.varGlob.profilEcran)} key={elem.inc_id}>
                <PostItInc
                  elem={elem}
                  varGlob={props.varGlob}
                  setVarGlob={props.setVarGlob}
                />
              </div>
            )}
          </div>
          <div className='gras'>Interventions en cours</div>
          <div className="no-padding">
            {lInc.map(elem => elem.inc_affect_date != null && elem.inc_fin_date === null &&
              <div className={display.alignement(props.varGlob.profilEcran)} key={elem.inc_id}>
                <PostItInc
                  elem={elem}
                  varGlob={props.varGlob}
                  setVarGlob={props.setVarGlob}
                />
              </div>
            )}
          </div>
          {props.varGlob.profilEcran === 'usager' &&
            <div>
              <div className='gras'>Interventions terminées à valider</div>
              <div className="no-padding">
                {lInc.map(elem => elem.inc_fin_date != null && elem.inc_cloture_date === null &&
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
          }
          {props.varGlob.profilEcran === 'usager' &&
            <div>
              <div className='gras'>Interventions terminées depuis moins de 30 jours</div>
              <div className="no-padding">
                {lInc.map(elem => elem.inc_cloture_date != null &&
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
          }
        </div>
      </div>
      <br />
      <Button
        txt={lib.BT_RETOUR_ACCUEIL}
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