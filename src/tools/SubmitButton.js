import './../tools/App.css';
const diplay = require('../lib/lib_display')

function SubmitButton(props) {

  return (
    <span className='cadre-15'>
      <button
        type="submit"
        className={diplay.boutonDisplay(props.couleur, props.menu, props.plein)}
      >
        {props.txt}
      </button>
    </span>
  );
}
export default SubmitButton;
