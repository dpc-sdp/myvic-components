import { mount } from '@vue/test-utils'
import YourvicMapVectorTileLayer from './../MapVectorTileLayer.vue'

describe('YourvicMapVectorTileLayer', () => {
  let mockMap = {
    removeLayer: jest.fn(() => true),
    addLayer: jest.fn(() => true)
  }

  const wrapper = mount(YourvicMapVectorTileLayer, {
    propsData: {
      loader: () => {},
      dataFormat: 'MVT'
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
