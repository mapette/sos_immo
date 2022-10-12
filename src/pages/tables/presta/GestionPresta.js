import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './../../../tools/App.css';
import Bouton from '../../../tools/Bouton'
import BoutonSubmit from '../../../tools/BoutonSubmit'
import ListPresta from './ListPresta';

const lib = require('../../../lib/lib_divers')

function GestionPresta(props) {
  let [prestaList, setPrestaList] = useState([])
  let [mode, setMode] = useState('neutre')
  let [focus, setFocus] = useState('') // prestataire en focus
  const { register, handleSubmit, formState: { errors }, } = useForm()

  useEffect(() => {
    fetch('http://localhost:3001/get_presta', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) {
          setPrestaList(prestaList = response)
        }
      })
  }, [])
  useEffect(() => {
    if (focus !== '') {
      document.getElementById('presta_nom').value = focus.presta_nom
      document.getElementById('presta_libelle').value = focus.presta_libelle
    }
  }, [focus])

  function soumettre_updatePresta(data) {
    data.presta_id = focus.presta_id
    console.log('data', data)
    fetch('http://localhost:3001/update_presta', lib.optionsPost(data))
      //.then(response => response.json())
      .then(() => {
        setMode('neutre')
        setFocus('')
        //  lib.prepaMail(data.ut_mail, 'Identifiants SOS Immo', msgMail(data))
    })
  }

  function soumettre_newPresta(data) {
    console.log('data', data)
     fetch('http://localhost:3001/crea_presta', lib.optionsPost(data))
      //.then(response => response.json())
      .then(() => {
        setMode('neutre')
        setFocus('')
        //  lib.prepaMail(data.ut_mail, 'Identifiants SOS Immo', msgMail(data))
    })

  }

 // console.log('focus', focus)
  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        GESTION ENTREPRISES PRESTATAIRES
      </h2>
      <ListPresta
        prestaList={prestaList}
        setFocus={setFocus}
      />

      {mode !== 'création' && focus != '' &&
        <div className="container no-gutter">
          <form id="form_ut"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit(soumettre_updatePresta)}
          >
            <table className="cadre-15 width-90p">
              <thead>
                <th className='largeur-110 '>mise à jour</th>
                <th className='largeur-110 '>nom</th>
                <th className='largeur-200 '>libellé</th>
              </thead>
              <tbody>
                <tr>
                  <td className=''>{focus.presta_id}</td>
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
            <BoutonSubmit
              txt={'Validation update'}
              couleur={'vert'}
              plein={true}
            />
          </form>
        </div>
      }
      {mode === 'création' &&
        <div className="container no-gutter">
          <form id="form_ut"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit(soumettre_newPresta)}
          >
            <table className="cadre-15 width-90p">
              <thead>
                <th className='largeur-110 '>Nouveau prestataire</th>
                <th className='largeur-110 '>nom</th>
                <th className='largeur-200 '>libellé</th>
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
            <BoutonSubmit
              txt={'Validation création'}
              couleur={'vert'}
              plein={true}
            />
          </form>
        </div>
      }
      <div className='gauche decal'>
        <div className='en-ligne'>
          {focus == '' && mode === 'neutre' &&
            <span>
              
              <Bouton
                txt={'Nouvel utilisateur'}
                actionToDo={() => setMode('création')}
                couleur={'vert'}
                plein={true}
              />
            </span>
          }
          <Bouton
                txt={lib.BT_RETOUR_ACCUEIL}
                actionToDo={() => props.setVarGlob({
                  ...props.varGlob,
                  ecran: 'menu'
                })}
                couleur={'gris'}
                plein={true}
              />
        </div>
      </div>
    </div>
  );
}

export default GestionPresta;
