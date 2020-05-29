import ol from './../lib/ol'

describe('ol', () => {
  it('registers EPSG:4283 projection with OpenLayers', () => {
    let epsg4283 = ol.proj.getProjection('EPSG:4283')
    expect(epsg4283).toBeNull()
    ol.registerCustomProjections()
    epsg4283 = ol.proj.getProjection('EPSG:4283')
    expect(epsg4283).not.toBeNull()
  })

  it('creates a tile grid', () => {
    let zoomLevels = 22
    let tileGrid = ol.createTileGrid(new ol.View(), zoomLevels, [512, 512])
    expect(tileGrid.maxZoom).toBe(zoomLevels - 1)
    expect(tileGrid.tileSize_).toEqual([512, 512])
  })
})
