function FormatDate(dateR) {
  let date = new Date(dateR)
  return convDateToString(date)
}

function convDateToString(date) {
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

function FormatHeure(dateR, kpi) {
  let date = new Date(dateR)
  return convHeureToString(date, kpi)
}

function convHeureToString(date, kpi) {
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
  if (kpi) {
    return `${heures}H${minutes}`
  }
  return `${heures} heures ${minutes}`
}

function initDate() {
  return new Date()
}

function displayDateKpi(date){
  let result = 'néant'
  if (date !== null){
   result =  FormatDate(date,true) + ' - ' + FormatHeure(date,true)
  }
  return result
}

function tempsRestant(date1,date2){
  let result = 'néant'
  // now - signalement si cloture == null
   result = date1 - date2
  return result
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
  displayDateKpi,
  tempsRestant,

}
