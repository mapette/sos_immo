import './../../tools/App.css';
const lib = require('./../../lib/lib_divers')

function ListUser(props) {

  return (
    <div className="container no-gutter">
      <table className="table row cadre-15" key='titre'>
        <thead>
          <tr>
            <th className="col-1">username</th>
            <th className="col-2">nom</th>
            <th className="col-2">prénom</th>
            <th className="col-2">profil</th>
            <th className="col-2">employeur</th>
            <th className="col-1">statut</th>
            <td className="col-1"></td>
          </tr>
        </thead>
        <tbody>
          {props.userList.map(user =>
            <tr className="row" key={user.ut_uuid}>
              <td className="col-1">
                {user.ut_id}
              </td>
              <td className="col-2">
                {user.ut_nom}
              </td>
              <td className="col-2">
                {user.ut_prenom}
              </td>
              <td className="col-2">
                {lib.findProfil(user.hab_profil)}
              </td>
              <td className="col-2">
                {user.presta_nom}  {user.presta_libelle}
              </td>
              <td className="col-1">
                {lib.findStatus(user.ut_date_exp)}
              </td>
              <td className="col-1">
                <input className='form-check-input' type='radio' name='ut' id={user.ut_uuid} checked></input>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListUser;
