export const createHTMLElementFromString = (text) => {
  const div = document.createElement('div')
  div.innerHTML = text.trim()
  return div.firstElementChild
}
