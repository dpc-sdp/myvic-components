import { mount } from '@vue/test-utils'
import YourvicMapCore from './../index.vue'

describe('YourvicMapCore', () => {
  const wrapper = mount(YourvicMapCore, {
    propsData: {
      baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}'
    }
  })

  it('renders a div', () => {
    expect(wrapper.contains('div')).toBe(true)
  })
})
