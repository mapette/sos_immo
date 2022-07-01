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

function clean(dataToClean) {
  if ( dataToClean === '') {
    return null
  }
  return dataToClean
}

module.exports = {
  findStatus,
  findProfil,
  clean,
}
