import { mount } from '@vue/test-utils'
import MyvicMapVectorLayer from './../MapVectorLayer.vue'

describe('MyvicMapVectorLayer', () => {
  let mockMap = {
    removeLayer: jest.fn(() => true),
    addLayer: jest.fn(() => true)
  }

  const wrapper = mount(MyvicMapVectorLayer, {
    propsData: {
      loader: () => {},
      dataFormat: 'GeoJSON'
    },
    provide: {
      getMap: () => {
        return new Promise((resolve, reject) => {
          resolve(mockMap)
        })
      },
      interceptError: () => {}
    }
  })

  it('removes existing layer from the map', () => {
    expect(mockMap.removeLayer).toHaveBeenCalledWith(undefined) // null on first mount
  })

  it('adds the layer to the map', () => {
    expect(mockMap.addLayer).toHaveBeenCalledWith(wrapper.vm.$data.layer)
  })
})
