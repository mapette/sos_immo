import './../../../tools/App.css';
const cl_ut = require('../../../lib/lib_cl_ut')
const lib = require('./../../../lib/lib_divers')

function ListUser(props) {

  function showDetails(id) {
    fetch('http://localhost:3001/user/get_one/' + id, lib.optionsGet())
      .then(response => response.json())
      .then(response => {
        props.setVarGlob({
          ...props.varGlob,
          focus: new cl_ut.Utilisateur(response),
        })
        props.setMode("selection")
      })
  }

  return (
    <div className="mx-auto container no-gutter">
      <table className="cadre-15 width-90p">
        <thead>
          <th className='largeur-110'>identifiant</th>
          <th className='largeur-110 gauche'>nom</th>
          <th className='largeur-110 gauche'>prénom</th>
          <th className='largeur-110 gauche'>profil</th>
          <th className='largeur-300 gauche'>employeur</th>
          <th className='largeur-110'>statut</th>
          <th className='largeur-110 gauche'>téléphone</th>
          <th className='gauche'>mail</th>
        </thead>
        <tbody>
          {props.userList.map(user =>
            <tr key={user.ut_uuid} onClick={() => showDetails(user.ut_uuid)}>
              <td className=''>{user.ut_id}</td>
              <td className='gauche'>{user.ut_nom}</td>
              <td className='gauche'>{user.ut_prenom}</td>
              <td className='gauche'>{lib.findProfil(user.hab_profil)}</td>
              <td className='gauche'>{user.presta_nom} - {user.presta_libelle}</td>
              <td className=''>{lib.findUserStatus(user.ut_date_exp)}</td>
              <td className='gauche'>{user.ut_tel}</td>
              <td className='gauche'>{user.ut_mail}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListUser;
