// Set Webpack public path so that dynamic imports can be found in the same directory as the main bundle entrypoint
function getCurrentScriptPath () {
  let currentScriptSrc = ''
  if (document && document.currentScript) { // Most browsers
    currentScriptSrc = document.currentScript.src
  } else { // IE
    let scripts = document.getElementsByTagName('script')
    currentScriptSrc = scripts[scripts.length - 1].src
  }
  return currentScriptSrc.substring(0, currentScriptSrc.lastIndexOf('/')) + '/'
}

// eslint-disable-next-line camelcase,no-undef
__webpack_public_path__ = process.env.YOURVIC_ASSET_PATH || getCurrentScriptPath()
