function Alerte(props) {  //alerteRouge, alerteSimple

  return (
    <div className={props.niveau}>  
      <p>
        {props.msg}
      </p>
    </div>
  );
}

export default Alerte;
