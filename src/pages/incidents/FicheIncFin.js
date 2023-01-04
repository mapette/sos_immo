import './../../tools/App.css';
import SubmitButton from '../../tools/SubmitButton'
const lib = require('../../lib/lib_divers')
const time = require('../../lib/lib_time')

function FicheIncFin(props) {
   function SoumettreFinIntervention(event) {
    event.preventDefault()
      fetch('http://localhost:3001/inc/end/' + props.varGlob.focus , lib.optionsGet())
        .then(response => response.json())
        .then(response => {
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
          <SubmitButton
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

