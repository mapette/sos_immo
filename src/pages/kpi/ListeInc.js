import './../../tools/App.css';
import ListeIncLine from './ListeIncLine'

function ListeInc(props) {

  return (
    <table className='cadre-15 mx-auto'>
      <thead>
        <th>id</th>
        <th>emplacement</th>
        <th>étage</th>
        <th>incident</th>
        <th>presta</th>
        <th>status</th>
        <th>signalement</th>
        <th>affectation</th>
        <th>fin intervention</th>
        <th>clôture</th>
        <th>temps restant</th>
      </thead>
      <tbody>
        {props.lInc.map(ligne => ligne.inc_affect_date === null &&
          <ListeIncLine
            ligne={ligne}
            varGlob={props.varGlob}
            setVarGlob={props.setVarGlob}
          />
        )}
        {props.lInc.map(ligne => ligne.inc_affect_date != null && ligne.inc_fin_date === null &&
          <ListeIncLine
            ligne={ligne}
            varGlob={props.varGlob}
            setVarGlob={props.setVarGlob}
          />
        )}
        {props.lInc.map(ligne => ligne.inc_fin_date != null && ligne.inc_cloture_date === null &&
          <ListeIncLine
            ligne={ligne}
            varGlob={props.varGlob}
            setVarGlob={props.setVarGlob}
          />
        )}
        {props.lInc.map(ligne => ligne.inc_cloture_date !== null &&
          <ListeIncLine
            ligne={ligne}
            varGlob={props.varGlob}
            setVarGlob={props.setVarGlob}
          />
        )}
      </tbody>
    </table>
  );
}

export default ListeInc;
