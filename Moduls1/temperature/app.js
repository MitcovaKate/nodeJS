// импорт модулей
const { add, div } = require('./math')
const { checkTemperatures,invalidTemps} = require('./types')
const temps = require("./temperature.json")
const result = checkTemperatures(temps)
const invalidTemp =  invalidTemps(temps)

// среднее арифметическое валидных температур
const sum = result.reduce((acc, num) => add(acc, num), 0);
const average = div(sum, result.length)

console.log('Valid temperatures:', result)
console.log('Average:', average)
console.log(`Invalid temperatures:${invalidTemp.toFixed(2)}%`)
