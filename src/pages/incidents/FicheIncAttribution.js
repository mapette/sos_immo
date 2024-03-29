import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../tools/App.css';
import SubmitButton from '../../tools/SubmitButton'
const lib = require('../../lib/lib_divers')

function FicheIncAttribution(props) {
  let [lPresta, setLPresta] = useState([])
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    //  => liste des presta (profil admin)
    fetch('http://localhost:3001/presta/get_all', lib.optionsREST('get',))
      .then(response => response.json())  // récupère que les données résultat
      .then(response => {
        setLPresta(response)
      })
  }, [props.incident])

  function soumettreAttribution(data) {
    if (IsAttributionPossible(data.presta)) {
      fetch('http://localhost:3001/inc/attrib/'
        + props.varGlob.focus + '/' + data.presta, lib.optionsREST('get',))
        .then(response => response.json())
        .then(response => {
          if (response.status === 666) {
            props.setVarGlob({
              ...props.varGlob,
              screen: 'errExp'
            })
          } else {
            lPresta.forEach(element => {
              if (element.presta_id === parseInt(data.presta)) {
                props.setIncident({
                  ...props.incident,
                  presta_id: data.presta,
                  presta_nom: element.presta_nom,
                })
              }
            })
          }
        })
    }
  }
  
  function IsAttributionPossible(newPresta) {
    let okAttribution = true
    // empêcher ré-affectation vide ou au même prestataire
    if (newPresta === '' ||
        parseInt(newPresta) === props.incident.presta_id) {
        okAttribution = false
    }
    return okAttribution
  }

  return (
    <div>
      {(props.varGlob.profil === 'admin') &&   // normalement inutile - je garde par précausion
        <form id="attribution" className='cadre-15'
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={handleSubmit(soumettreAttribution)}
        >
          <select id='presta' name='prestat'
            {...register('presta')}
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
          <SubmitButton
            couleur={'bleu'}
            txt={"Changer le prestataire en charge"}
            plein={true}
          />
        </form>
      }
    </div>
  );

}

export default FicheIncAttribution;