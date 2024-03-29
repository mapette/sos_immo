function prepaMail(mailTo, subject, body) {
  let mail = 'mailTo:' + mailTo
    + '?subject=' + subject
    + '&body=' + body
  document.location = mail
}

//soumission
function optionsREST(methodApi, data) {
  let request = {
    method: methodApi,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }
  if (data != undefined
    & data != null
    & typeof (data) != 'number'
    & typeof (data) != 'string') { request.body = JSON.stringify(data) }
  return request
}

// ListUser 
function findUserStatus(date_exp) {
  // entrée : attribut date_exp de l'objet Utilisateur (date d'inactivation)
  // sortie : string -> 'actif' si date_exp Null, 'inactif' sinon
  let statut = 'actif'
  if (date_exp !== null) {
    statut = 'inactif'
  }
  return statut
}
function findProfil(hab_profil) {
  let profil = 'actif'
  if (hab_profil === 0) {  
    profil = 'inactif'
  }
  else if (hab_profil === 1) {
    profil = 'usager'
  }
  else if (hab_profil === 2) {
    profil = 'technicien'
  }
  else if (hab_profil === 3) {
    profil = 'valideur'
  }
  else if (hab_profil === 4) {
    profil = 'admin'
  }
  return profil
}

// FCreaUt - FicheInc
function cleanNull(dataToClean) {
  if (dataToClean === '' | dataToClean === null | dataToClean === undefined) {
    return null
  }
  return dataToClean
}

// FicheInc
function cleanNothing(dataToClean) {
  if (dataToClean === null | dataToClean === undefined) {
    return ''
  }
  return dataToClean
}

// PostIt + FicheInc
function determineStatus(aff, fin, clo) {    //inc_affect_date, inc_fin_date, inc_cloture_date
  let status = 'enAttente'
  if (clo !== null & clo !== undefined) {
    status = 'clos'
  } else if (fin !== null & fin !== undefined) {
    status = 'termine'
  } else if (aff !== null & aff !== undefined) {
    status = 'enCours'
  }
  //console.log(ch, fin, clo, status)
  return status
}
// FicheInc
function statusLibelle(status) {
  let libelle;
  if (status === 'enAttente') {
    libelle = 'En attente d\'affectation'
  }
  else if (status === 'enCours') {
    libelle = 'Pris en charge'
  }
  else if (status === 'termine') {
    libelle = 'Intervention terminée'
  }
  else if (status === 'clos') {
    libelle = 'Incident clôturé'
  }
  return libelle
}

// Demandes
function determineURL(catUrl, data) {
  let url = ''
  if (catUrl === "demande") {
    if (data.profilScreen === 'usager') {
      url = 'http://localhost:3001/inc/get_byUser'
    }
    else if (data.profilScreen === 'techno') {
      if (data.profil === 'technicien') {
        url = 'http://localhost:3001/inc/get_byPresta'
      }
      else if (data.profil === 'admin') {
        url = 'http://localhost:3001/inc/get_all'
      }
    }
  }
  if (catUrl === "affectation") {
    if (data.profil === 'technicien') {
      url = 'http://localhost:3001/inc/affect/' + data.inc_id
    }
    else {
        url = 'http://localhost:3001/inc/affect/' + data.inc_id + '/' + data.techno      
    }
  }
  return url
}
function determineTitre(critere) {
  if (critere === 'usager') {
    return 'MES DEMANDES'
  }
  else if (critere === 'techno') {
    return 'SUIVI INCIDENTS'
  }
}

// Accueil
function determineProfil(respProfil) {
  if (respProfil === 0) {
    return {
      profil: 'administrateur',
      screen: 'gestionUtilisateurs'
    }
  }
  else if (respProfil === 1) {
    return {
      profil: 'usager',
      screen: 'gestionUtilisateurs'
    }
  }
  else if (respProfil === 2) {
    return {
      profil: 'technicien',
      screen: 'gestionUtilisateurs',
    }
  }
  else if (respProfil === 3) {
    return {
      profil: 'valideur',
      screen: 'gestionUtilisateurs',
    }
  }
  else if (respProfil === 4) {
    return {
      profil: 'admin',
      screen: 'gestionUtilisateurs',
    }
  }
  else {
    return {
      profil: 'profil plus que surprenant !',
      screen: 'gestionUtilisateurs',
    }
  }
}

const BT_RETOUR_ACCUEIL = 'Retour au menu'
const BT_REFRESH = 'Rafraîchir'
const BT_RETOUR_LISTE = 'Retour à la liste'

module.exports = {
  prepaMail,
  optionsREST,
  findUserStatus,
  findProfil,
  cleanNull,
  cleanNothing,
  statusLibelle,
  determineProfil,
  determineURL,
  determineTitre,
  determineStatus,
  BT_RETOUR_ACCUEIL,
  BT_RETOUR_LISTE,
  BT_REFRESH, 
}
