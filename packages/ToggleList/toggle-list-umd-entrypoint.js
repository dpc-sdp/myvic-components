import YourVicToggleList from './ToggleList.vue'

export function mountToggleList (el, props) {
  // eslint-disable-next-line no-new
  new window.Vue({
    el,
    render: h => h(YourVicToggleList, { props })
  })
}
