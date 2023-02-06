import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Button from '../../tools/Button'
import PostItInc from './PostItInc'
const lib = require('../../lib/lib_divers')
const display = require('../../lib/lib_display')

function MyInc(props) {
  let [lInc, setLInc] = useState([])
  let [refresh, setRefresh] = useState(false)

  useEffect(() => {
    // liste des incidents selon qui profilScreen et profil du demandeur
    let data = {
      profilScreen: props.varGlob.profilScreen,
      profil: props.varGlob.profil,
    }
    let url_fetch = lib.determineURL("demande", data)
    fetch(url_fetch, lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            screen: 'errExp'
          })
        } else
          setLInc(response)
      })
      .catch(() => {
        props.setVarGlob({
          ...props.varGlob,
          screen: 'err503'
        })
      })
  }, [,refresh])

  return (
    <>
      <h2 className="titre gras cadre-15">
        {lib.determineTitre(props.varGlob.profilScreen)}
      </h2>
      <br />
      <div className={display.textAlign(props.varGlob.profilScreen)}>
        <div className='row no-gutter'>
          <div className='gras'>Incidents attente d'affectation</div>
          <div className="no-padding">
            {lInc.map(elem => elem.inc_affect_date === null &&
              <div className={display.alignement(props.varGlob.profilScreen)} key={elem.inc_id}>
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
              <div className={display.alignement(props.varGlob.profilScreen)} key={elem.inc_id}>
                <PostItInc
                  elem={elem}
                  varGlob={props.varGlob}
                  setVarGlob={props.setVarGlob}
                />
              </div>
            )}
          </div>
          {props.varGlob.profilScreen === 'usager' &&
            <>
              <div className='gras'>Interventions terminées à valider</div>
              <div className="no-padding">
                {lInc.map(elem => elem.inc_fin_date != null && elem.inc_cloture_date === null &&
                  <div className={display.alignement(props.varGlob.profilScreen)} key={elem.inc_id}>
                    <PostItInc
                      elem={elem}
                      varGlob={props.varGlob}
                      setVarGlob={props.setVarGlob}
                    />
                  </div>
                )}
              </div>
            </>
          }
          {props.varGlob.profilScreen === 'usager' &&
            <div>
              <div className='gras'>Interventions terminées depuis moins de 30 jours</div>
              <div className="no-padding">
                {lInc.map(elem => elem.inc_cloture_date != null &&
                  <div className={display.alignement(props.varGlob.profilScreen)} key={elem.inc_id}>
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
          screen: 'menu'
        })}
        couleur={'gris'}
        plein={true}
      />
      {props.varGlob.profilScreen === 'usager' &&
        <Button
          txt={'Nouvelle demande'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            screen: 'newInc'
          })}
          couleur={'vert'}
          plein={true}
        />
      }
      <Button
        txt={lib.BT_REFRESH}
        actionToDo={() => setRefresh(!refresh)}
        couleur={'bleu'}
        plein={true}
      />
    </>
  );
}

export default MyInc;
