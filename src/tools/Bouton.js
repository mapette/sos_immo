import './../tools/App.css';

const diplay = require('./../lib/lib_display')

function Bouton(props) {
  let margin = 'cadre-15'
  if (props.espaceEntreBt != undefined) {
    if (!props.espaceEntreBt) {
      margin = 'no-gutter'
    }
  }

  return (
    <span className={margin}>
      <button
        type="button"
        onClick={props.actionToDo}
        className={diplay.boutonDisplay(props.particularite,props.couleur, props.menu, props.plein)}
      >
        {props.txt}
      </button>
    </span>
  );
}
export default Bouton;
