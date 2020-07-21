import { mount } from '@vue/test-utils'
import MyvicMapTileLayer from './../MapTileLayer.vue'

describe('MyvicMapTileLayer', () => {
  let mockMap = {
    removeLayer: jest.fn(() => true),
    addLayer: jest.fn(() => true)
  }

  const wrapper = mount(MyvicMapTileLayer, {
    propsData: {
      type: 'OSM'
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
