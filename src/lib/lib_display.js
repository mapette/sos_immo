// boutons
function boutonDisplay(couleur, menu, plein, particularite) {
  //console.log('couleur : ', couleur, '- menu : ', menu, ' - plein : ', plein, ' - particularite : ', particularite)
  let totalClass = ''
  if (couleur === undefined) { totalClass = undefined }
  else {
    let classCouleur = ''
    if (couleur === 'vert') {
      classCouleur = "-success"
    }
    else if (couleur === 'bleu') {
      classCouleur = "-primary"
    }
    else if (couleur === 'rouge') {
      classCouleur = "-danger"
    }
    else if (couleur === 'orange') {
      classCouleur = "-warning"
    }
    else if (couleur === 'gris') {    // gris réservé au bouton-retour
      classCouleur = '-secondary bouton-retour'
    }

    let classMenu = menu 
    if (particularite === undefined) {
      if (menu === undefined) {
        classMenu = " fontsize-12"
      }
      else if (menu === 'menu') {
        classMenu = " bouton-retour fontsize-20 margin-top-15 menu"
      }
      else if (menu === 'smenu') {
        classMenu = " bouton-retour fontsize-20 margin-top-15 smenu"
      }
    }
    else {
      classMenu = particularite
    }
   
    let outline = '-outline '
    if (plein) {
      outline = ''
    }
   
    let classBt = ' btn'    
    totalClass = classBt + ' ' + classBt + outline + classCouleur + classMenu
  }
  return totalClass
}

// fiches incident

function postItDisplay(style, status) {  // ecran uniquement pour detailInc du suivi
  let totalClass = ''
  if(style === undefined | status === undefined){totalClass = undefined}
  else{
    if (style === 'techno') { totalClass = 'fiche-commun gauche rubanTechno ' }
    else if (style === 'usager') { totalClass = 'fiche-commun postItUsager en-ligne ' }
    totalClass = totalClass + status
  }
  return totalClass
}

function alignement(critere) {
  if (critere === 'usager') {
    return 'en-ligne '
  }
  else if (critere === 'techno') {
    return ' '
  }
}
function textAlign(critere) {
  if (critere === 'usager') {
    return 'centre '
  }
  else if (critere === 'techno') {
    return 'gauche '
  }
}


module.exports = {
  boutonDisplay,
  postItDisplay,
  alignement,
  textAlign,

}
