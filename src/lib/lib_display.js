// boutons
function boutonDisplay(couleur, menu, plein) {
  //console.log('bouton : ',couleur, menu, plein)
  let classBt = 'btn'
  let outline = '-outline'
  if (plein | menu != undefined) {    // menus forcément plein
    outline = ''
  }
  let classMenu = menu
  if (menu === undefined) {
    classMenu = " fontsize-12"
  }
  else if (menu === 'menu') {
    classMenu = " bouton-retour fontsize-20 margin-top-15 menu"
  }
  else if (menu === 'smenu') {
    classMenu = " bouton-retour fontsize-20 margin-top-15 smenu"
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
  return totalClass
}

// fiches incident
function fichePostItDisplay(status) {  // ecran uniquement pour detailsInc du suivi
  //console.log('params ', detail, status, profil_ecran)
  let ficheInc = 'fiche-commun postItUsager en-ligne'
  let classStatus;
  if (status === 'enAttente') {
    classStatus = ' enAttente'
  }
  else if (status === 'enCours') {
    classStatus = ' enCours'
  }
  else if (status === 'termine') {
    classStatus = ' termine'
  }
  let totalClass = ficheInc + classStatus
  return totalClass
  //retour fiche-commun + detail + en-ligne + status
}

function textAlign(critere) {
  if (critere === 'usager') {
    return 'centre '
  }
  else if (critere === 'techno') {
    return 'gauche '
  }
  
}
function alignement(critere) {
  if (critere === 'usager') {
    return 'en-ligne '
  }
  else if (critere === 'techno') {
    return ' '
  }
}

function rubanPostItDisplay(status) {  // ecran uniquement pour detailsInc du suivi
  //console.log('params ', detail, status, profil_ecran)
  let ficheInc = 'fiche-commun rubanTechno'
  let classStatus;
  if (status === 'enAttente') {
    classStatus = ' enAttente'
    // if (profilEcran === 'techno') {
    //   hauteurFiche = ' hauteur-fiche-en-attente'
    // }
  }
  else if (status === 'enCours') {
     classStatus = ' enCours'
    // if (profilEcran === 'techno') {
    //   //hauteurFiche = ' hauteur-fiche-en-cours'
    // }
  }
  else if (status === 'termine') {
    classStatus = ' termine'
  }
  let totalClass = ficheInc + classStatus
  return totalClass
  //retour fiche-commun + detail + en-ligne + status
}

module.exports = {
  fichePostItDisplay,
  rubanPostItDisplay,
  boutonDisplay,
  alignement,
  textAlign,

}
