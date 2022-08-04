import { useState, useEffect } from 'react';
import './../../tools/App.css';
import Bouton from './../../tools/Bouton'
const lib = require('./../../lib/lib_divers')
const display = require('./../../lib/lib_display')
const time = require('../../lib/lib_time')

function ListeInc(props) {
  let [lInc, setLInc] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/get_inc', lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        console.log('response liste incidents', response) // laisser cette ligne sinon ça marche pas !
        setLInc(response)
      })
  }, [])


  console.log('liste', props)
  return (
    <div className="">
      <h2 className="titre gras cadre-15">
        liste incidents
      </h2>
      <table className='cadre-15 '>
        <thead>
          <th>id</th>
          <th>emplacement</th>
          <th>étage</th>
          <th>incident</th>
          <th>presta</th>
          <th>signalement</th>
          <th>affectation</th>
          <th>fin intervention</th>
          <th>clôture</th>
          <th>temps restant</th>
        </thead>
        <tbody>
          {lInc.map(ligne =>
            <tr key={ligne.inc_id}>
              <td>{ligne.inc_id}</td>
              <td>{ligne.emp_nom}</td>
              <td>{ligne.emp_etage}</td>
              <td>{ligne.tinc_nom}</td>
              <td>{ligne.presta_nom}</td>
              <td width='200px'>{time.displayDateKpi(ligne.inc_signal_date)}</td>
              <td width='200px'>{time.displayDateKpi(ligne.inc_affect_date)}</td>
              <td width='200px'>{time.displayDateKpi(ligne.inc_fin_date)}</td>
              <td width='200px'>{time.displayDateKpi(ligne.inc_cloture_date)}</td>
              <td width='200px'>{time.tempsRestant(ligne.inc_signal_date,ligne.inc_cloture_date)}</td>
              
              <td><input type="checkbox" checked /></td>
            </tr>
          )}
        </tbody>
      </table>


      {/* <table className='cadre-15 gras tab-cartouche'>
      <thead>
            <th>signalement</th>
            <th>date</th>
            <th>heure</th>
          </thead>
          <tr>
            <td> {props.incident.inc_id}</td>
            <td> {time.FormatDate(props.incident.inc_signal_date)} </td>
            <td> {time.FormatHeure(props.incident.inc_signal_date)} </td>
          </tr>

        </table> */}


      {/* <br />
      <div className={display.textAlign(props.varGlob.profilEcran)}>
        <div className='row no-gutter'>
          <div className="no-padding">
            {lInc.map(elem =>
              <div className={display.alignement(props.varGlob.profilEcran)} key={elem.inc_id}>
                <PostItInc
                  elem={elem}
                  varGlob={props.varGlob}
                  setVarGlob={props.setVarGlob}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
       */}

    </div>
  );
}

export default ListeInc;

/*        

*/