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
function ficheDisplay(detail, status, profil_ecran) {  // ecran uniquement pour detailsInc du suivi
//console.log('params ', detail, status, profil_ecran)
  let ficheInc = 'fiche-commun'
  let classDetail;
  if (detail) {
    classDetail = ' detailsInc'
  }
  else {
    classDetail = ' postItInc'
  }
  let classStatus;
  let hauteurFiche = '';
  if (status === 'enAttente') {
    classStatus = ' en-ligne enAttente'
    if (profil_ecran === 'techno') {
      hauteurFiche = ' hauteur-fiche-en-attente'
    }
  }
  else if (status === 'enCours') {
    classStatus = ' en-ligne enCours'
    if (profil_ecran === 'techno') {
      hauteurFiche = ' hauteur-fiche-en-cours'
    }
  }
  else if (status === 'termine') {
    classStatus = ' en-ligne termine'
  }
  let totalClass = ficheInc + classDetail + classStatus + hauteurFiche
//console.log('display fiche : ', totalClass)
  return totalClass
  //retour fiche-commun + detail + en-ligne + status
}

module.exports = {
  ficheDisplay,
  boutonDisplay,

}
