export const getRandomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}

export const getRandomArray = (arrlength, min, max) => {
  var array = []
  for (var i = 1; i <= arrlength; i++) {
    array.push(getRandomInt(min, max))
  }
  return array
}
