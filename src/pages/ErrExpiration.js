import Button from './../tools/Button'

function ErrExpiration(props) {

  return (
    <div className="">
      <h2 className="titre gras cadre-15" >
        SESSION EXPIREE
      </h2>
      <div className='cadre-35'>
      <Button
        txt={`Retour à l'écran d'authentification`}
        actionToDo={() => props.setVarGlob({
          ...props.varGlob,
          screen: 'login',
        })}
        couleur={'bleu'}
        plein={true}
      />
      </div >
      <p />
      <button type="button"
        className='btn '
        onClick={() => props.setVarGlob({
          ...props.varGlob,
          screen: 'oubliMdp'
        })}
      >identifiant/mot de passe oublié</button>
    </div>
  );
}

export default ErrExpiration;
