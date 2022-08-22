// boutons
function boutonDisplay(particularite, couleur, menu, plein) {
  console.log('particularite : ',particularite)
  let classBt = 'btn'
  let outline = '-outline'
  if (plein) {
    outline = ''
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
    classCouleur = '-secondary bouton-retour '
  }
  let totalClass = classBt + ' ' + classBt + outline + classCouleur + classMenu
  console.log(totalClass)
  return totalClass
}

// fiches incident
function fichePostItDisplay(status) {  // ecran uniquement pour detailsInc du suivi
  //console.log('params ', detail, status, profil_ecran)
  let ficheInc = 'fiche-commun postItUsager en-ligne'
  let totalClass = ficheInc + ' ' + status
  return totalClass
  //retour fiche-commun + detail + en-ligne + status
}

function rubanPostItDisplay(status) {  // ecran uniquement pour detailsInc du suivi
  console.log('params ', status)
  let ficheInc = 'fiche-commun rubanTechno'
  let totalClass = ficheInc + ' ' + status
  return totalClass
  //retour fiche-commun + detail + en-ligne + status
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
  fichePostItDisplay,
  rubanPostItDisplay,
  alignement,
  textAlign,

}
