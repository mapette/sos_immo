import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../../tools/App.css';
import Bouton from '../../../tools/Bouton'
import BoutonSubmit from '../../../tools/BoutonSubmit'

const lib = require('../../../lib/lib_divers')

function FichePresta(props) {
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    if (props.mode === 'sélection') {
      document.getElementById('presta_nom').value = props.varGlob.focus.presta_nom
      document.getElementById('presta_libelle').value = props.varGlob.focus.presta_libelle
    }
    else if (props.mode === 'création') {
      document.getElementById('presta_nom').value = ''
      document.getElementById('presta_libelle').value = ''
    }
  }, [props.varGlob.focus])

  function soumettre_updatePresta(data) {
    data.presta_id = props.varGlob.focus.presta_id
    if (data.presta_nom === '') { data.presta_nom = props.varGlob.focus.presta_nom }
    if (data.presta_libelle === '') { data.presta_nom = props.varGlob.focus.presta_libelle }
    fetch('http://localhost:3001/update_presta', lib.optionsPost(data))
      .then(() => {
        props.setMode('neutre')
        props.setVarGlob({
          ...props.varGlob,
          focus: ''
        })
    })
  }

  function soumettre_newPresta(data) {
    fetch('http://localhost:3001/crea_presta', lib.optionsPost(data))
      .then(() => {
        props.setMode('neutre')
        props.setVarGlob({
          ...props.varGlob,
          focus: ''
        })
      })
  }

  return (
    <div className="">
      {props.mode === 'sélection' && props.varGlob.focus !== '' &&
        <div className="container no-gutter mx-auto ">
          <form id="form_ut"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit(soumettre_updatePresta)}
          >
            <table className="cadre-15">
              <thead>
                <th className='largeur-110'>mise à jour</th>
                <th className='largeur-300 '>nom</th>
                <th className='largeur-400 '>libellé</th>
              </thead>
              <tbody>
                <tr>
                  <td className=''>{props.varGlob.focus.presta_id}</td>
                  <td>
                    <input className='input-sans-bordure' id='presta_nom' {...register('presta_nom')} />      
                  </td>
                  <td>
                    <input className='input-sans-bordure' id='presta_libelle' {...register('presta_libelle')} />        
                  </td>
                </tr>
              </tbody>
            </table>
            <Bouton
              txt={lib.BT_RETOUR_LISTE}
              actionToDo={() => {
                props.setMode('neutre')
                props.setVarGlob({
                  ...props.varGlob,
                  focus: '',
                  ecran: 'gestionPresta'
                })
              }}
              couleur={'gris'}
              plein={true}
            />
            <BoutonSubmit
              txt={'Mise à jour'}
              couleur={'vert'}
              plein={true}
            />
           
          </form>
        </div>
      }

      {props.mode === 'création' &&
        <div className="container no-gutter mx-auto">
          <form id="form_ut"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit(soumettre_newPresta)}
          >
            <table className="cadre-15">
              <thead>
                <th className=''>Nouveau prestataire</th>
                <th className='largeur-300 '>nom</th>
                <th className='largeur-400 '>libellé</th>
              </thead>
              <tbody>
                <tr>
                  <td className=''></td>
                  <td>
                    <input className='input-sans-bordure' id='presta_nom' {...register('presta_nom', { required: true })} />
                    {errors.presta_nom && <p>Nom obligatoire</p>}
                  </td>
                  <td>
                    <input className='input-sans-bordure' id='presta_libelle' {...register('presta_libelle', { required: true })} />
                    {errors.presta_libelle && <p>Libellé obligatoire</p>}
                  </td>
                </tr>
              </tbody>
            </table>
            <Bouton
              txt={lib.BT_RETOUR_LISTE}
              actionToDo={() => {
                props.setMode('neutre')
                props.setVarGlob({
                  ...props.varGlob,
                  focus: '',
                  ecran: 'gestionPresta'
                })
              }}
              couleur={'gris'}
              plein={true}
            />
            <BoutonSubmit
              txt={'Validation création'}
              couleur={'vert'}
              plein={true}
            />
          </form>
        </div>
      }
    </div>
  );
}

export default FichePresta;
