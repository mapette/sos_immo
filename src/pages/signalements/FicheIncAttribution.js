import { useState, useEffect } from 'react';
import './../../tools/App.css';
import BoutonSubmit from '../../tools/BoutonSubmit'

const lib = require('../../lib/lib_divers')

function FicheIncAttribution(props) {
  let [lPresta, setLPresta] = useState([])

  useEffect(() => {
    //  => liste des presta (profil imm)
    fetch('http://localhost:3001/get_presta', lib.optionsGet())
      .then(response => response.json())  // récupère que les données résultat
      .then(response => {
        console.log('response liste presta', response) // laisser cette ligne sinon ça marche pas !
        setLPresta(response)
      })
  }, [props.incident])

  function soumettreAttribution(event) {
    event.preventDefault()
    let newPresta = parseInt(document.getElementById('presta').value)
    if (IsAttributionPossible(newPresta)) {

      console.log('focus ', props.varGlob.focus)
      fetch('http://localhost:3001/attribution/'
        + props.varGlob.focus + '/' + document.getElementById('presta').value, lib.optionsGet())
        .then(response => response.json())
        .then(response => {
          console.log('response prestataire', response) // laisser cette ligne sinon ça marche pas !
          lPresta.forEach(element => {
            if (element.presta_id === newPresta) {
              props.setIncident({
                ...props.incident,
                presta_id: newPresta,
                presta_nom: element.presta_nom,
              })
            }
          })
        })
    }
  }
  function IsAttributionPossible(newPresta) {
    let okAttribution = false
    // empêcher ré-affectation vide ou au même prestataire
    if (document.getElementById('presta').value !== '') {
      if (newPresta !== props.incident.presta_id) {
        okAttribution = true
      }
    }
    console.log(okAttribution)
    return okAttribution
  }

  return (
    <div>
      {(props.varGlob.profil == 'imm') &&   // normalement inutile - je garde par précausion
        <form id="attribution" className='cadre-15'
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={soumettreAttribution}
        >
          <select id='presta' name='prestat'
            className='largeur-200'>
            <option value=''> </option>
            {lPresta.map(elem =>
              <option
                value={elem.presta_id}
                key={elem.presta_id}>
                {elem.presta_nom} - {elem.presta_libelle}
              </option>
            )}
          </select>
          <BoutonSubmit
            couleur={'bleu'}
            txt={"changer le prestataire en charge"}
            plein={true}
          />
        </form>
      }
    </div>
  );

}

export default FicheIncAttribution;

/*        

*/

