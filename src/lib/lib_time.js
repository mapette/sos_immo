function FormatDate(dateR) {
  let date = new Date(dateR)
  return convDateToString(date)
}

function convDateToString(date){
  let mois
  if (date.getMonth() + 1 < 10) {
      mois = `0${date.getMonth() + 1}`
  }
  else {
      mois = `${date.getMonth() + 1}`
  }
  let jour
  if (date.getDate() < 10) {
      jour = `0${date.getDate()}`
  }
  else {
      jour = `${date.getDate()}`
  }
  return `${jour}-${mois}-${date.getFullYear()}`
}

function FormatHeure(dateR) {
  let date = new Date(dateR)
  return convHeureToString(date)
}

function convHeureToString(date){
  let heures
  if (date.getHours() + 1 < 10) {
    heures = `0${date.getHours()}`
  }
  else {
    heures = `${date.getHours()}`
  }
  let minutes
  if (date.getMinutes() < 10) {
    minutes = `0${date.getMinutes()}`
  }
  else {
    minutes = `${date.getMinutes()}`
  }
  return `${heures} heures ${minutes}`
}

function initDate() {
  return new Date()
}

///////////// placard /////////////
function convertDate(inputFormat) {
  if (inputFormat === null) return '';
  function pad(s) { return (s < 10) ? '0' + s : s; }
  let d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

function initDate2(nbDay) {
  let date = new Date()
  date = addDaysToDate(date, nbDay)
  return convDateToString(date)
}
function addDaysToDate(date, days) {
  var res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
}

module.exports = {
  FormatDate,
  FormatHeure,
  initDate,
  
}
