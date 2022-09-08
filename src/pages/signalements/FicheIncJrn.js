import { useState, useEffect } from 'react';
import './../../tools/App.css';
import BoutonSubmit from '../../tools/BoutonSubmit'

const time = require('../../lib/lib_time')
const lib = require('../../lib/lib_divers')

function FicheIncJrn(props) {
  let [journal, setJournal] = useState([])

  useEffect(() => {
    function infoImmoInclude() {
      if (props.varGlob.profilEcran !== 'usager') {
        return true
      }
      else {
        return false
      }
    }
    fetch('http://localhost:3001/get_inc_journal/' + props.varGlob.focus + '/' + infoImmoInclude(),
      lib.optionsGet())
      .then(response => response.json())  // récupère que les données résultat
      .then(response => {
        console.log('journal ', response) // laisser cette ligne sinon ça marche pas !
        setJournal(response)
      })
  }, [, props.incident])

  function majCommentaire(event) {
    event.preventDefault()
    if (document.getElementById("comm").value != '') {
      let data = {
        jrn_inc: props.varGlob.focus,
        jrn_msg: document.getElementById("comm").value
      }
      console.log('comm', document.getElementById("comm").value)
      if (document.getElementById("infoImm") === null) {
        data.jrn_imm = false
      }
      else {
        data.jrn_imm = document.getElementById("infoImm").checked
      }
      fetch('http://localhost:3001/update_comm', lib.optionsPost(data))
        .then(response => response.json())  // récupère que les données résultat
        .then(response => {
          document.getElementById("comm").value = ''
          console.log('journal id ', response) // laisser cette ligne sinon ça marche pas !
          data.jrn_id = response
          data.jrn_date = new Date()
          setJournal(journal.concat([data]))
        })
    }
  }

  function affBtInfoImm() {
    if (props.varGlob.profilEcran === 'usager') {
      return 'invisible'
    }
  }
  console.log('inc incident', props.incident)
  return (
    <div>
      <div className="cadre-15">
        <table className='cadre-15 width-90p'>
          <thead>
            <th>date</th>
            <th>message</th>
            {props.varGlob.profilEcran != 'usager' &&
              <th>info imm</th>
            }
          </thead>
          <tbody>
            {journal.map(ligne =>
              <tr key={ligne.jrn_id}>
                <td width='220px'>{time.FormatDate(ligne.jrn_date)} à {time.FormatHeure(ligne.jrn_date)}</td>
                <td width='800px' className='gauche'>{ligne.jrn_msg}</td>

                {props.varGlob.profilEcran != 'usager' && ligne.jrn_imm == true &&
                  <td width='50px'><input type="checkbox" checked /></td>
                }
              </tr>
            )}
          </tbody>
        </table>
        {props.incident.inc_cloture_date === null &&
          <form id="msgInfo"
            type="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={majCommentaire}
          >
            <div>
              <textarea type='text'
                id='comm' name='comm'
                rows="2" cols="100"
                placeholder="complément info :"
              />
            </div>
            <div>
              {props.varGlob.profilEcran != 'usager' &&
                <span className={affBtInfoImm()}>
                  <label className="form-check-label petit" for="infoImm">
                    info immo
                  </label>
                  <input className="form-check-input" name='infoImm' type="checkbox" value="" id="infoImm" />
                </span>
              }
              <BoutonSubmit
                couleur={'orange'}
                txt={'Valider'}
                plein={true}
              />
            </div>
          </form>
        }
      </div>
    </div>
  );

}

export default FicheIncJrn;

/*        

*/

