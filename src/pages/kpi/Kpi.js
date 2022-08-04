import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from '../../tools/Bouton'
import ListeInc from './ListeInc'

const lib = require('../../lib/lib_divers')
const display = require('../../lib/lib_display')

function Kpi(props) {
 
 console.log('kpi', props)
  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        KPI
      </h2>
    
      <ListeInc
                  varGlob={props.varGlob}
                  setVarGlob={props.setVarGlob}
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

export default Kpi;

/*        

*/