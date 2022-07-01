//import './../App.css';

function Alerte(props) {

  return (
    <div className={props.niveau}>
      <p>
        {props.msg}
      </p>
    </div>
  );
}

export default Alerte;
