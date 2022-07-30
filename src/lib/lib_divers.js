//const { useDebugValue } = require("react")

//soumission
function optionsPost(data) {
  return {
    method: 'post',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
}

function optionsGet() {
  return {
    method: 'get',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }
}

// ListUser 
function findUserStatus(date_exp) {
  let statut = 'actif'
  if (date_exp !== null) {
    statut = 'inactif'
  }
  return statut
}
function findProfil(hab_profil) {
  let profil = 'actif'
  if (hab_profil === 0) {   // inusité
    profil = 'adm'
  }
  else if (hab_profil === 1) {
    profil = 'usager'
  }
  else if (hab_profil === 2) {
    profil = 'tech'
  }
  else if (hab_profil === 3) {
    profil = 'valid'
  }
  else if (hab_profil === 4) {
    profil = 'imm'
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
function determineStatus(ch, res) {    //charge_date, resolution_date
  let status = 'enAttente'
  // console.log('ch', ch, 'res', res)
  // console.log('ch !null : ', ch !== null, 'ch !undef : ', ch !== undefined)
  // console.log('res !null : ', res !== null, 'res !undef : ', res !== undefined)
  if (res !== null & res !== undefined) {
    status = 'termine'
  } else if (ch !== null & ch !== undefined) {
    status = 'enCours'
  }
  return status
}
// FicheInc
function statusLibelle(status) {
  if (status === 'enAttente') {
    return 'en attente'
  }
  else if (status === 'enCours') {
    return 'en cours'
  }
  else if (status === 'termine') {
    return 'terminé'
  }
}

// Demandes
function determineURL(caturl, data) {
  console.log('determineURL', data)
  let url = ''
  if (caturl == "demande") {
    if (data.profilEcran === 'usager') {
      url = 'http://localhost:3001/get_incByUser'
    }
    else if (data.profilEcran === 'techno') {
      if (data.profil === 'technicien' | data.profil === 'valideur') {
        url = 'http://localhost:3001/get_incByPresta'
      }
      else if (data.profil === 'imm') {
        url = 'http://localhost:3001/get_inc'
      }
    }
  }
  if (caturl == "affectation") {
    if (data.profil === 'technicien') {
      url = 'http://localhost:3001/affectation/' + data.inc_id
    }
    else {
      url = 'http://localhost:3001/affectation/' + data.inc_id + '/' + data.ut_id
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
      ecran: 'gestionUtilisateurs'
    }
  }
  else if (respProfil === 1) {
    return {
      profil: 'usager',
      ecran: 'gestionUtilisateurs'
    }
  }
  else if (respProfil === 2) {
    return {
      profil: 'technicien',
      ecran: 'gestionUtilisateurs',
    }
  }
  else if (respProfil === 3) {
    return {
      profil: 'valideur',
      ecran: 'gestionUtilisateurs',
    }
  }
  else if (respProfil === 4) {
    return {
      profil: 'imm',
      ecran: 'gestionUtilisateurs',
    }
  }
  else {
    return {
      profil: 'profil plus que surprenant !',
      ecran: 'gestionUtilisateurs',
    }
  }
}

module.exports = {
  optionsPost,
  optionsGet,
  findUserStatus,
  findProfil,
  cleanNull,
  cleanNothing,
  statusLibelle,
  determineProfil,
  determineURL,
  determineTitre,
  determineStatus,
}
