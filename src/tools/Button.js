import './../tools/App.css';

const diplay = require('../lib/lib_display')

function Button(props) {
  let margin = 'cadre-15'
  if (props.espaceEntreBt !== undefined) {
    if (!props.espaceEntreBt) {
      margin = 'no-gutter'
    }
  }

  return (
    <span className={margin}>
      <button
        type="button"
        onClick={props.actionToDo}
        className={diplay.boutonDisplay(props.couleur, props.menu, props.plein,props.particularite)}
      >
        {props.txt[0].toUpperCase() + props.txt.slice(1)}
      </button>
    </span>
  );
}
export default Button;

