
const temps = require('./temperature.json')

// проверка на валидные значения
function checkTemperatures(temps) {
  const validTemps = temps.filter(temp => temp !== 'NaN')
  const numbers = validTemps.map(temp => Number(temp))
  return  numbers
    
}
// проверка невалидных значений и подсчет их колличества в процентах
function invalidTemps(temps) {
  const nanCount = temps.filter(temp => isNaN(temp)).length
  const invalidTemp = (nanCount / temps.length) * 100
  return invalidTemp
}

// экспорт фенкций
module.exports = { checkTemperatures,invalidTemps }


