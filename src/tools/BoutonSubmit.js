import './../tools/App.css';

const diplay = require('../lib/lib_display')

function BoutonSubmit(props) {

  // function goSubmit(event, actionToDo, id, setFocus) {
  //   actionToDo(event, id, setFocus)
  // }
//  console.log('bouton sumbit',props.setFocus)
  return (
    <span className='cadre-15'>
      <button
        type="submit"
        className={diplay.boutonDisplay(props.couleur, props.menu, props.plein)}
 //       onClick={event => { goSubmit(event, props.submitToDo, props.id, props.setFocus) }}
      >
        {props.txt}
      </button>
    </span>
  );
}
export default BoutonSubmit;
