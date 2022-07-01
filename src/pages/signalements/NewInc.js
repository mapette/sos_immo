import { useState, useEffect } from 'react';
import './../../tools/App.css';
import NewIncInput from './NewIncInput'
import Bouton from './../../tools/Bouton'
import Alerte from './../../tools/Alerte'

const lib = require('./../../lib/lib_divers')

function NewInc(props) {
  let [etape, setEtape] = useState(0)
  //  0-étage 1-emplacement 2-type 3-commentaire+submit
  // listes pour le formulaire
  let lEtage = []
  let lEmpl = []
  let lInc = []

  function prepaListe(response){
    response.forEach(element => {
      console.log(element)
      // étage
      if (!(lEtage.includes(element['emp_etage']))){
        lEtage.push(element['emp_etage'])
      }
      // étage
      if (!(lEmpl.includes(element['emp_etage']))){
        lEtage.push(element['emp_etage'])
      }
   });
   console.log(lEtage)
  }

  useEffect(() => {
    fetch('http://localhost:3001/get_empl', {
      method: 'get',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
       .then(response => {    // résultat brut
          console.log('response1', response)
         return response.json()  // récupère que les données résultat
       })
       .then(response => {
          console.log('response empl list', response) // laisser cette ligne sinon ça marche pas !
          prepaListe(response)
         //   if (response.length !== 0) {
      //     setPrestaList(prestaList = response)
      //   }
       })
  }, [])

  function incEtape() {
    props.setEtape(props.etape + 1)
  }

  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        NOUVELLE DEMANDE
      </h2>

      <NewIncInput
        etape={etape}
        setEtape={setEtape}
        selectionNum={0}
        selectionNom={'étage'}
        actionOnChange={incEtape}
      />
      {etape > 0 &&
        <NewIncInput
          etape={etape}
          setEtape={setEtape}
          selectionNum={1}
          selectionNom={'empl'}
        />
      }
      {etape > 1 &&
        <NewIncInput
          etape={etape}
          setEtape={setEtape}
          selectionNum={2}
          selectionNom={'type'}
        />
      }
      {etape > 2 &&
        <div>
          <NewIncInput
            etape={etape}
            setEtape={setEtape}
            selectionNum={3}
            selectionNom={'comm'}
          />
          <div className='cadre-15 '>
            <Bouton
              txt={'Validation'}
              typeBt={'submit'}
              couleur={'vert'}
            />
          </div>  
        </div>
      }
 
      <div className="">
        <br/>
        <Bouton
          txt={'retour au menu'}
          actionToDo={() => props.setVarGlob({
            ...props.varGlob,
            ecran: 'menu'
          })}
          couleur={'gris'}
        />
      </div>
    </div>
  );
}

export default NewInc;
