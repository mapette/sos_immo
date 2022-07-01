function FormateDate(dateR) {
  let date = new Date(dateR)
  return convDateToString(dateR)
}
function initDate(nbDay) {
  let date = new Date()
  date = addDaysToDate(date, nbDay)
  return convDateToString(date)
}
function addDaysToDate(date, days) {
  var res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
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
  return `${date.getFullYear()}-${mois}-${jour}`
}

function convertDate(inputFormat) {
  if (inputFormat === null) return '';
  function pad(s) { return (s < 10) ? '0' + s : s; }
  let d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}



module.exports = {
  FormateDate,
  initDate,
  convertDate,
}
