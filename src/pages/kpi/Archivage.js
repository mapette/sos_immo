import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Button from '../../tools/Button'
import ListeInc from './ListeInc'
import SubmitButton from '../../tools/SubmitButton'
import Warning from '../../tools/Warning'
const cl = require('../../lib/lib_cl_incidents')
const lib = require('../../lib/lib_divers')

function Pilotage(props) {
  let inc_liste = new cl.Inc_manager() // liste totale d'incidents
  let inc_arch = new cl.Inc_manager()  // liste d'incidents archivés
  let [alertMsg, setAlertMsg] = useState('')
  let [lInc, setLInc] = useState([])
  let [btAction, setBtAction] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/inc/get_all', lib.optionsREST('GET',))
      .then(response => response.json())
      .then(response => {
        if (response.status === 666) {
          props.setVarGlob({
            ...props.varGlob,
            screen: 'errExp'
          })
        }
        else {
          if (response.length !== 0) {
            response.forEach(element => {
              inc_liste.liste.push(new cl.Incident(element))
            })
          }
        }
      })
      .catch(() => {
        props.setVarGlob({
          ...props.varGlob,
          screen: 'err503'
        })
      })
  }, [, lInc])

  function SoumettreArchiveIncident(event) {
    event.preventDefault()
    fetch('http://localhost:3001/inc/arc', lib.optionsREST('GET',))
      .then(response => response.json())
      .then(response => {
        response.forEach(inc => { inc_arch.liste.push(new cl.Incident(inc)) });
        inc_liste.archivage(inc_arch.liste) // maj liste à l'écran
        setLInc(inc_liste.liste)
        inc_clos()
      })
  }

  function inc_clos() {
    inc_liste.onlyOld()
    setLInc(inc_liste.liste)
    setBtAction('ArcInc')
    setAlertMsg('')
  }

  function archive() {
    setBtAction('')
    setAlertMsg('Non encore fonctionnel')
  }

  return (
    <div className=''>
      <h2 className="titre gras cadre-15">
        ARCHIVAGE
      </h2>
      <Button
        txt={'Incidents clôturés depuis + de 30 jours'}
        actionToDo={() => inc_clos()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={'Incidents archivés depuis + de 24 mois'}
        actionToDo={() => archive()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={'Utilisateurs inactifs depuis + de 6 mois'}
        actionToDo={() => archive()}
        couleur={'bleu'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={'Utilisateurs archivés depuis + de 36 mois'}
        actionToDo={() => archive()}
        couleur={'bleu'}
        menu={'menu'}
        plein={true}
      />
      <div className='decal gras fontsize-20 cadre-15 mx-auto'>
      </div>

      {alertMsg !== '' &&
        <Warning
          msg={alertMsg}
          niveau={'alerteRouge'}
        />
      }
      
      <ListeInc
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
        lInc={lInc}
      />

      {btAction == 'ArcInc' &&
        <form id="attribution" className='cadre-15'
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={SoumettreArchiveIncident}
        >
          <SubmitButton
            couleur={'rouge'}
            txt={"Archiver"}
            plein={true}
          />
        </form>
      }

      <Button
        txt={lib.BT_RETOUR_ACCUEIL}
        actionToDo={() => props.setVarGlob({
          ...props.varGlob,
          screen: 'menu'
        })}
        couleur={'gris'}
        plein={true}
      />
    </div>
  );
}

export default Pilotage;
