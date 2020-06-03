import { mount } from '@vue/test-utils'
import YourvicMapTileLayer from './../MapTileLayer.vue'

describe('YourvicMapTileLayer', () => {
  let mockMap = {
    removeLayer: jest.fn(() => true),
    addLayer: jest.fn(() => true)
  }

  const wrapper = mount(YourvicMapTileLayer, {
    propsData: {
      type: 'OSM'
    },
    provide: {
      getMap: () => {
        return new Promise((resolve, reject) => {
          resolve(mockMap)
        })
      }
    }
  })

  it('removes existing layer from the map', () => {
    expect(mockMap.removeLayer).toHaveBeenCalledWith(undefined) // null on first mount
  })

  it('adds the layer to the map', () => {
    expect(mockMap.addLayer).toHaveBeenCalledWith(wrapper.vm.$data.layer)
  })
})
