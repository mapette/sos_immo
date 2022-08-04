import { useState, useEffect } from 'react';
import './../../tools/App.css';
import BoutonSubmit from '../../tools/BoutonSubmit'

const lib = require('../../lib/lib_divers')
const time = require('../../lib/lib_time')

function FicheIncFin(props) {
   function SoumettreFinIntervention(event) {
    event.preventDefault()
         console.log('focus ', props.varGlob.focus)
      fetch('http://localhost:3001/finIntervention' + props.varGlob.focus , lib.optionsGet())
        .then(response => response.json())
        .then(response => {
          console.log('response prestataire', response) // laisser cette ligne sinon ça marche pas !
          props.setIncident({
            ...props.incident,
            inc_fin_date: time.initDate(),
        
          })
        })
  }
 
  return (
    <div>
      {(props.varGlob.profil !== 'usager') &&    // normalement inutile - je garde par précausion
        <form id="attribution" className='cadre-15'
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={SoumettreFinIntervention}
        >  
          <BoutonSubmit
            couleur={'vert'}
            txt={"Intervention terminée"}
            plein={true}
          />
        </form>
      }
    </div>
  );

}

export default FicheIncFin;

/*        

*/

