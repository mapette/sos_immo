import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Button from '../../tools/Button'
import SubmitButton from '../../tools/SubmitButton'
import ListeInc from './ListeInc'
const cl = require('../../lib/lib_cl_incidents')
const lib = require('../../lib/lib_divers')

function Pilotage(props) {
  let inc_liste = new cl.Inc_manager()
  let [lInc, setLInc] = useState([])
  let [typeListe, setTypeListe] = useState('')
  let [btCloture, setBtCloture] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/inc/get_all', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) {
          response.forEach(element => {
            inc_liste.liste.push(new cl.Incident(element))
          });
        }
      })
  }, [, lInc])

  function SoumettreClotureIncident(event) {
    event.preventDefault()
    fetch('http://localhost:3001/inc/closing', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        inc_liste.clotureAutomatique(response)
        setLInc(inc_liste.liste)
        filterFermesNonClotures()
      })
  }

  function tousIncidents() {
    setLInc(inc_liste.liste)
    setTypeListe('tous les incidents non clôturés ou clôturés depuis moins de 30 jours')
    setBtCloture(false)
  }
  function filterEnAttente() {
    inc_liste.filterEnAttente()
    setLInc(inc_liste.liste)
    setTypeListe(`incidents en attente d'affection`)
    setBtCloture(false)
  }
  function filterEnCours() {
    inc_liste.filterEnCours()
    setLInc(inc_liste.liste)
    setTypeListe('incidents en cours')
    setBtCloture(false)
  }
  function filterHorsDelais() {
    inc_liste.filterHorsDelais()
    setLInc(inc_liste.liste)
    setTypeListe('incidents hors délais')
    setBtCloture(false)
  }
  function filterFermesNonClotures() {
    inc_liste.filterFermesNonClotures()
    setLInc(inc_liste.liste)
    setTypeListe('incidents fermés, non clôturés')
    setBtCloture(true)
  }

  return (
    <div className=''>
      <h2 className="titre gras cadre-15">
        PILOTAGE
      </h2>
      <Button
        txt={'tous les incidents'}
        actionToDo={() => tousIncidents()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={`En attente d'affectation`}
        actionToDo={() => filterEnAttente()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={'En Cours'}
        actionToDo={() => filterEnCours()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={'Hors délais (24 H)'}
        actionToDo={() => filterHorsDelais()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={'Fermés non clôturés'}
        actionToDo={() => filterFermesNonClotures()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <div className='decal gras fontsize-20 cadre-15 mx-auto'>
        {typeListe}
      </div>

      <ListeInc
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
        lInc={lInc}
      />

      {btCloture === true && props.varGlob.profil === 'admin' &&
        <form id="attribution" className='cadre-15'
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={SoumettreClotureIncident}
        >
          <SubmitButton
            couleur={'rouge'}
            txt={"Clôturer les incidents fermés depuis 48 heures"}
            plein={true}
          />
        </form>
      }
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

export default Pilotage;
