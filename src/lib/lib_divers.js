const { useDebugValue } = require("react")

// ListUser 
function findStatus(date_exp) {
  let statut = 'actif'
  if (date_exp !== null) {
    statut = 'inactif'
  }
  return statut
}
function findProfil(hab_profil) {
  let profil = 'actif'
  if (hab_profil === 0) {
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

// FCreaUt - DetailsInc
function cleanNull(dataToClean) {
  if (dataToClean === '' | dataToClean === null | dataToClean === undefined) {
    return null
  }
  return dataToClean
}

// DetailsInc
function cleanNothing(dataToClean) {
  if (dataToClean === null | dataToClean === undefined) {
    return ''
  }
  return dataToClean
}

// PostIt + DetailsInc
function determineStatus(charge_date, resolution_date) {
  console.log('ch', charge_date, 'res', resolution_date)
  if (resolution_date !== null & resolution_date !== undefined) {
    return ('termine')
  } else if (charge_date !== null & charge_date !== undefined) {
    return ('enCours')
  }
  else { return ('enAttente') }
}
// DetailsInc
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
function determineURL(critere) {
  if (critere === 'usager') {
    return 'http://localhost:3001/get_incByUser'
  }
  else if (critere === 'techno') {
    return 'http://localhost:3001/get_incByPresta'
  }
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
  findStatus,
  findProfil,
  cleanNull,
  cleanNothing,
  statusLibelle,
  determineProfil,
  determineURL,
  determineTitre,
  determineStatus,
}
