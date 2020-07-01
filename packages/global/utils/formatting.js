
export const commarize = function (number) {
  if (number > 99999) {
    const units = ['k', 'm', 'b', 't']
    // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
    const unit = Math.floor(((number).toFixed(0).length - 1) / 3) * 3
    // Calculate the remainder
    let num = (number / ('1e' + unit))
    if (!(num % 1)) {
      num = num.toFixed(0)
    } else {
      num = num.toFixed(1)
    }

    const unitname = units[Math.floor(unit / 3) - 1]
    return num + unitname
  }
  // return formatted original number
  return number.toLocaleString()
}

export const commarizeSimple = function (num) {
  if (typeof num !== 'number') return num
  num = parseFloat(num)
  if (num % 1) {
    num = num.toFixed(2)
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
