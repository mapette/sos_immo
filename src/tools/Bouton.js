import './../tools/App.css';

function BtVert(props) {

  let classBt
  if (props.couleur === 'vert') {
    classBt = "btn btn-outline-success fontsize-12"
  }
  else if (props.couleur === 'bleu') {
    classBt = "btn btn-outline-primary fontsize-12"
  }
  else if (props.couleur === 'rouge') {
    classBt = "btn btn-outline-danger fontsize-12"
  }
  else if (props.couleur === 'gris') {
    classBt = "btn btn-outline-secondary bouton-retour fontsize-12"
  }
  else if (props.couleur === 'menu-vert') {
    classBt = "btn btn-success bouton-retour fontsize-20 margin-top-15 menu"
  }
  else if (props.couleur === 'menu-rouge') {
    classBt = "btn btn-danger bouton-retour fontsize-20 margin-top-15 menu"
  }
  else if (props.couleur === 'menu-bleu') {
    classBt = "btn btn-primary bouton-retour fontsize-20 margin-top-15 menu"
  }
  else if (props.couleur === 'menu-orange') {
    classBt = "btn btn-warning bouton-retour fontsize-20 margin-top-15 menu"
  }
  else if (props.couleur === 'smenu-vert') {
    classBt = "btn btn-sucess bouton-retour fontsize-20 margin-top-15 smenu"
  }
  else if (props.couleur === 'smenu-rouge') {
    classBt = "btn btn-danger bouton-retour fontsize-20 margin-top-15 smenu"
  }
  else if (props.couleur === 'smenu-orange') {
    classBt = "btn btn-warning bouton-retour fontsize-20 margin-top-15 smenu"
  }
  else if (props.couleur === 'smenu-bleu') {
    classBt = "btn btn-info bouton-retour fontsize-20 margin-top-15 smenu"
  }

  if (props.typeBt === 'submit') {
    return (
      <span className='cadre-15'>
        <button
          type="submit"
          className={classBt}
          onClick={props.submitToDo}
        >
          {props.txt}
        </button>
      </span>
    );
  }
  else {
    return (
      <span className='cadre-15'>
        <button
          type="button"
          onClick={props.actionToDo}
          className={classBt}
        >
          {props.txt}
        </button>
      </span>
    );
  }
}
export default BtVert;
