export const createHTMLElementFromString = (text) => {
  const div = document.createElement('div')
  div.innerHTML = text.trim()
  return div.firstElementChild
}

export const callIfFunction = (thing, parameters) => {
  if (typeof thing === 'function') return thing(parameters)
  return thing
}
