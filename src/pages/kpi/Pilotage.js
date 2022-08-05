import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'
import ListeInc from './ListeInc'

const cl = require('../../lib/lib_cl_incidents')
const lib = require('../../lib/lib_divers')

function Pilotage(props) {
  let inc_liste = new cl.Inc_manager()
  let [lInc, setLInc] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/get_inc', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        response.forEach(element => {
          inc_liste.liste.push(new cl.Incident(element))
        });
      })
  }, [, lInc])

  function filterEnAttente() {
    inc_liste.filterEnAttente()
    setLInc(inc_liste.liste)
  }
  function filterEnCours() {
    inc_liste.filterEnCours()
    setLInc(inc_liste.liste)
  }
  function filterHorsDelais() {
    inc_liste.filterHorsDelais()
    setLInc(inc_liste.liste)
  }
 
  console.log('liste', lInc)
  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        PILOTAGE
      </h2>
      {/* <Bouton
        txt={'tous les incidents'}
        actionToDo={() =>  setLInc(inc_liste.liste)}
        couleur={'vert'}
        menu={'menu'}
      /> */}
      <Bouton
        txt={'En attente'}
        actionToDo={() => filterEnAttente()}
        couleur={'vert'}
        menu={'menu'}
      />
      <Bouton
        txt={'En Cours'}
        actionToDo={() => filterEnCours()}
        couleur={'vert'}
        menu={'menu'}
      />
      <Bouton
        txt={'Hors délais (24 H)'}
        actionToDo={() => filterHorsDelais()}
        couleur={'vert'}
        menu={'menu'}
      />
      <ListeInc
        varGlob={props.varGlob}
        setVarGlob={props.setVarGlob}
        lInc={lInc}
      />
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

export default Pilotage;

/*        

*/