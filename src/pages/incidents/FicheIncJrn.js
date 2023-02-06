import { useState, useEffect } from 'react';
import './../../tools/App.css';
import SubmitButton from '../../tools/SubmitButton'
const time = require('../../lib/lib_time')
const lib = require('../../lib/lib_divers')

function FicheIncJrn(props) {
  let [journal, setJournal] = useState([])

  useEffect(() => {
    function infoImmoInclude() {
      if (props.varGlob.profilScreen !== 'usager') {
        return true
      }
      else {
        return false
      }
    }
    fetch('http://localhost:3001/inc/get_jnr/' + props.varGlob.focus + '/' + infoImmoInclude(),
      lib.optionsGet())
      .then(response => response.json()) 
      .then(response => {
        setJournal(response)
      })
  }, [, props.incident])

  function ajoutCommentaire(event) {
    event.preventDefault()
    if (document.getElementById("comm").value !== '') {
      let data = {
        jrn_inc: props.varGlob.focus,
        jrn_msg: document.getElementById("comm").value
      }
      if (document.getElementById("infoImm") === null) {
        data.jrn_imm = false
      }
      else {
        data.jrn_imm = document.getElementById("infoImm").checked
      }
      let url
      if (props.varGlob.profilScreen == "usager") { url = 'http://localhost:3001/jrn/update_user' }
      else { url = 'http://localhost:3001/jrn/update_techno' }
      fetch(url, lib.optionsPost(data))
        .then(response => response.json())
        .then(response => {
          if (response.status === 666) {
            props.setVarGlob({
              ...props.varGlob,
              screen: 'errExp'
            })
          }
          else {
            document.getElementById("comm").value = ''
            data.jrn_id = response
            data.jrn_date = new Date()
            setJournal(journal.concat([data]))
          }
        })
    }
  }

  function affBtInfoImm() {
    if (props.varGlob.profilScreen === 'usager') {
      return 'invisible'
    }
  }

  return (
    <div className="cadre-15">
      <table className='cadre-15 mx-auto'>
        <thead>
          <th>date</th>
          <th>message</th>
          {props.varGlob.profilScreen !== 'usager' &&
            <th>info immo</th>
          }
        </thead>
        <tbody>
          {journal.map(ligne =>
            <tr key={ligne.jrn_id}>
              <td className='largeur-300'>{time.formatDate(ligne.jrn_date)} à {time.formatHeure(ligne.jrn_date)}</td>
              <td className='largeur-1000 gauche'>{ligne.jrn_msg}</td>
              {props.varGlob.profilScreen !== 'usager' && ligne.jrn_imm == true &&
               <td width='25px'><input type="checkbox" checked /></td>
              }
            </tr>
          )}
        </tbody>
      </table>
      {props.incident.inc_fin_date === null &&
        <form id="msgInfo"
          type="POST"
          encType="application/x-www-form-urlencoded"
          onSubmit={ajoutCommentaire}
        >
          <div>
            <textarea type='text'
              id='comm' name='comm'
              rows="2" cols="100"
              placeholder="complément info :"
            />
          </div>
          <div>
            {props.varGlob.profilScreen !== 'usager' &&
              <span className={affBtInfoImm()}>
                <label className="form-check-label petit" for="infoImm">
                  info immo
                </label>
                <input className="form-check-input" name='infoImm' type="checkbox" value="" id="infoImm" />
              </span>
            }
            <SubmitButton
              couleur={'orange'}
              txt={'Valider nouveau message'}
              plein={true}
            />
          </div>
        </form>
      }
    </div>
  );
}

export default FicheIncJrn;
