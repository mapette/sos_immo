import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'
import BoutonSubmit from '../../tools/BoutonSubmit'
import ListeInc from './ListeInc'

const cl = require('../../lib/lib_cl_incidents')
const lib = require('../../lib/lib_divers')

function Pilotage(props) {
  // let inc_liste_originale = new cl.Inc_manager()
  let inc_liste = new cl.Inc_manager()
  let [lInc, setLInc] = useState([])
  let [typeListe, setTypeListe] = useState('')
  let [btCloture, setBtCloture] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3001/get_inc', lib.optionsGet())
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
    fetch('http://localhost:3001/clotureInc', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        //   console.log('response clôture', response) // laisser cette ligne sinon ça marche pas !
        inc_liste.clotureAutomatique(response)
        setLInc(inc_liste.liste)
        setTypeListe('tous les incidents')
      })
  }

  function tousIncidents() {
    //   inc_liste.liste = cl.Inc_manager.cloneListe(inc_liste_originale.liste)
    setLInc(inc_liste.liste)
    setTypeListe('tous les incidents')
    setBtCloture(false)
  }
  function filterEnAttente() {
    //  inc_liste.liste = cl.Inc_manager.cloneListe(inc_liste_originale.liste)
    inc_liste.filterEnAttente()
    setLInc(inc_liste.liste)
    setTypeListe('incidents en attente')
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

  // console.log('liste', lInc)
  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        PILOTAGE
      </h2>
      <Bouton
        txt={'tous les incidents'}
        actionToDo={() => tousIncidents()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Bouton
        txt={'En attente'}
        actionToDo={() => filterEnAttente()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Bouton
        txt={'En Cours'}
        actionToDo={() => filterEnCours()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Bouton
        txt={'Hors délais (24 H)'}
        actionToDo={() => filterHorsDelais()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Bouton
        txt={'Fermés non clôturés'}
        actionToDo={() => filterFermesNonClotures()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <div className='decal gras gauche fontsize-20 cadre-15'>
        {typeListe}
      </div>

      <ListeInc
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
        lInc={lInc}
      />

      {btCloture === true &&
        <form id="attribution" className='cadre-15'
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={SoumettreClotureIncident}
        >
          <BoutonSubmit
            couleur={'rouge'}
            txt={"Clôturer les incidents fermés depuis 48 heures"}
            plein={true}
          />
        </form>
      }
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

export default Pilotage;

/*        

*/