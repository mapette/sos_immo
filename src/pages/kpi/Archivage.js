import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Button from '../../tools/Button'
import SubmitButton from '../../tools/SubmitButton'
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

  function archive() {
  }

 
  return (
    <div className=''>
      <h2 className="titre gras cadre-15">
        ARCHIVAGE
      </h2>
      <Button
        txt={'Incidents clôturés depuis + de 30 jours'}
        actionToDo={() => archive()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={'Incidents archivés depuis + de 24 mois'}
        actionToDo={() => archive()}
        couleur={'vert'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={'Utilisateurs inactifs depuis + de 6 mois'}
        actionToDo={() => archive()}
        couleur={'bleu'}
        menu={'menu'}
        plein={true}
      />
      <Button
        txt={'Utilisateurs archivés depuis + de 36 mois'}
        actionToDo={() => archive()}
        couleur={'bleu'}
        menu={'menu'}
        plein={true}
      />
      <div className='decal gras fontsize-20 cadre-15 mx-auto'>
      </div>

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
