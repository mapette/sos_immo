import './../tools/App.css';

const diplay = require('./../lib/lib_display')

function Bouton(props) {

  return (
    <span className='cadre-15'>
      <button
        type="button"
        onClick={props.actionToDo}
        className={diplay.boutonDisplay(props.couleur, props.menu, props.plein)}
      >
        {props.txt}
      </button>
    </span>
  );
}
export default Bouton;
