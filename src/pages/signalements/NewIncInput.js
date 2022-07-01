import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from './../../tools/Bouton'
import Alerte from './../../tools/Alerte'

const lib = require('./../../lib/lib_divers')

function NewIncInput(props) {
  // 3 étapes au total


  function TxtInput() {
    console.log(props.selectionNom)
    if (props.selectionNom == 'empl') {
      return 'salle/emplacement'
    }
    if (props.selectionNom == 'type') {
      return 'type d\'incident'
    }
    if (props.selectionNom == 'comm') {
      return 'informations complémentaires'
    }
    return props.selectionNom
  }

  function stypeInput() {
    console.log(props.selectionNum, props.etape)
    if (props.selectionNum == props.etape) {
      return 'alerteSimple rouge'
    }
  }

  return (
    <div className="container cadre-15">
      <div className='row'>
        <div className='droite col-6'>
          <label className={stypeInput()} htmlFor={props.selectionNom}>{TxtInput()}</label>
        </div>
        <div className='gauche col-6'>
          <input type=""
            id={props.selectionNom}
            onChange={event => { props.setEtape(props.selectionNum + 1) }}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default NewIncInput;

/*
  <span className='cadre-15'>
            <label htmlFor='presta'>si prestataire, nom de l'entreprise </label>
            <select id='presta' name='presta'
              onChange={event => {
                contrInput(
                  document.getElementById("username").value,
                  document.getElementById("profil").value,
                  event.target.value,
                )
              }}
              className='largeur-200'>
              <option value=''> </option>
              {prestaList.map(elem =>
                <option
                  value={elem.presta_id}
                  key={elem.presta_id}>
                  {elem.presta_nom} - {elem.presta_libelle}
                </option>
              )}
            </select>
          </span>
*/
