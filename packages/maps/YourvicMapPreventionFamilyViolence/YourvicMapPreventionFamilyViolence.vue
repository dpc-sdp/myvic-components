<template>
  <div class="yourvic-map">
    <h2 v-if="title" class="yourvic-map__title">{{title}}</h2>
    <RplMarkup v-if="description" :html="description"/>
    <p
      class="rpl-visually-hidden"
    >The following is an interactive map component, showing the location of programs being run in support of the Prevention of Family Violence initiative.</p>
    <div>
      <div ref="yourvicMapContainer" class="yourvic-map__container">
        <div :class="expandedMapClass">
          <rpl-button
            class="full-screen-btn"
            theme="primary"
            @click.native.prevent="toggleMapFullScreen"
          >
            <rpl-text-icon
              :symbol="buttonIcon"
              color="white"
              size="m"
              placement="before"
              :text="buttonText"
            />
          </rpl-button>
          <div class="yourvic-map__container__expand-btn-container" >
            <yourvicMapExpandButton :expanded="expanded" @click="toggleExpand"/>
          </div>
          <yourvic-map :baseMapUrl="baseMapUrl" :customMethods="customMethods" :minZoom="6" :refreshOn="refreshOn"/>

        </div>
        <div class="yourvic-map__sidebar-container">
          <yourvicMapSidebarHome
            :categories="allCategories"
            :areas="allAreas"
            :projects="projects"
            :selectedProjects="selectedProjects"
            :parentSelectedProject="selectedProject"
            :parentSelectedCategory="selectedCategory"
            v-on:set-selected-project="setSelectedProject"
            v-on:back-clicked="clickBack"
            v-on:home-clicked="clickHome"
            v-on:set-area="setSelectedArea"
            v-on:set-category="setSelectedCategory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// This component is referenced by the Data-Driven Component
// from Drupal, used for now to display the Free Wifi map.
// Props set in tide.config.js within the data-driven-component package in this monorepo
import RplMarkup from '@dpc-sdp/ripple-markup'
import RplButton from '@dpc-sdp/ripple-button'
import { RplTextIcon } from '@dpc-sdp/ripple-icon'
import { YourVicMap } from '@dpc-sdp/yourvic-map-core'
import ol from '@dpc-sdp/yourvic-map-core/lib/ol'
import YourVicMapSidebarHome from './YourVicMapSidebarHome'
import YourVicMapExpandButton from './YourVicMapExpandButton'
import { emptyArray, toggleFullScreen, isFullscreen } from './helper'
const { createImageIconStyle } = ol

const baseMapUrl = 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
const geoserverDomainName = 'gis-app-cdn.dev.myvictoria.vic.gov.au'
const themeColor = '#0052c2'
const disabledColor = '#666666'
const clusterColor = '#FFFFFF'

const _allCategories = [
  { key: 'children_young_people', title: 'Children and young people' },
  { key: 'higher_education', title: 'Higher education' },
  { key: 'aboriginal', title: 'Aboriginal' },
  { key: 'lgbqti', title: 'LGBTIQ' },
  { key: 'seniors', title: 'Seniors' },
  { key: 'parents', title: 'Parents' },
  { key: 'disability_focus', title: 'Disability focus' },
  {
    key: 'culturally_linguistically_diverse',
    title: 'Culturally and linguistically diverse'
  },
  {
    key: 'workforce',
    title: 'Workforce'
  },
  {
    key: 'education_children_young_people',
    title: 'Education'
  },
  { key: 'sports_recreation', title: 'Sports and recreation' },
  { key: 'arts', title: 'Arts' },
  { key: 'research_or_action_research', title: 'Research or action research' },
  { key: 'workplace_cultural_change', title: 'Workplace cultural change' },
  {
    key: 'public_spaces_infrastructure_and_facilities',
    title: 'Public spaces, infrastructure and facilities'
  },
  { key: 'technology_online', title: 'Technology and online' },
  {
    key: 'health_family_and_community_services',
    title: 'Health, family and community services'
  },
  { key: 'media', title: 'Media' },
  { key: 'bystander', title: 'Bystander' }
]

const _projects = []
const _selectedProjects = []
const _selectedProject = [] // Even though this is a single item, I had to use an array to get the ref for vue to be able to communicate to the global methods.
const _selectedCategory = []
const _allAreas = []
const _features = []
const _mapLayers = []
const _lgaStyleCache = {}
const _lgaFeaturesCache = {}
const _councilToLgaMapping = {}
const _lgaToCouncilMapping = {}
const _globalMap = []
let _selectedLga = null

// Calling the feature.changed method seems to cause all other features to re render (Which is what we want)
const triggerMapRedraw = () => {
  _features.length > 0 && _features[0].changed()
}

const resetLgaSource = () => {
  const source = new ol.source.Vector({
    format: new ol.format.GeoJSON()
  })
  _mapLayers[0].setSource(source)
  _mapLayers[0].changed()
  triggerMapRedraw()
}

const zoomMapToLayerExtent = (layer, padding = 20) => {
  const layerExtent = layer.getSource().getExtent()
  if (layerExtent) {
    zoomMapToExtent(layerExtent, padding)
  }
}

const zoomMapToExtent = (extent, padding = 20) => {
  _globalMap[0].getView().fit(extent, { padding: [padding, padding, padding, padding], duration: 1000, constrainResolution: false })
}

const showEntireState = () => {
  resetLgaSource()
  const victoriaFeature = _lgaFeaturesCache['Victoria']
  if (!victoriaFeature) {
    let source = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: extent =>
        `https://${geoserverDomainName}/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=myvic:state&outputFormat=application/json`,
      strategy: ol.loadingstrategy.all
    })
    _mapLayers[0].setSource(source)
  }

  _mapLayers[0].getSource().on('addfeature', function () {
    // this is called when a feature is loaded onto the layer
    _mapLayers[0].getSource().forEachFeature(function (feature) {
      const lgaCode = feature.get('name') // Victoria
      if (!_lgaFeaturesCache[lgaCode]) {
        _lgaFeaturesCache[lgaCode] = feature
      }
      feature.drawState = 'active'
      _mapLayers[0].changed()
    })
    zoomMapToLayerExtent(_mapLayers[0], 20)
  })

  if (victoriaFeature) {
    _mapLayers[0].getSource().addFeature(victoriaFeature)
  }
  _mapLayers[0].changed()
}

const showSingleLga = lga => {
  _selectedLga = lga
  const queryString = `'${lga}'`
  const source = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: extent =>
      `https://${geoserverDomainName}/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=myvic:lga&cql_filter=lga_code IN(${queryString})&outputFormat=application/json`,
    strategy: ol.loadingstrategy.all
  })
  _mapLayers[0].setSource(source)
  _mapLayers[0].getSource().on('addfeature', function () {
    // this is called when a feature is loaded onto the layer
    _mapLayers[0].getSource().forEachFeature(function (feature) {
      feature.drawState = 'active'
      _mapLayers[0].changed()
    })
    zoomMapToLayerExtent(_mapLayers[0], 110)
  })
  _mapLayers[0].changed()
}

const setSelectedProject = proj => {
  _selectedLga = null
  emptyArray(_selectedProject)
  emptyArray(_selectedProjects)
  let source = new ol.source.Vector({
    format: new ol.format.GeoJSON()
  })
  const projectLgas = []
  const unloadedProjectLgas = []
  const loadedProjectLgas = []
  if (proj) {
    if (proj.associatedLgas.length === 1 && proj.associatedLgas[0].key === 'ALL') {
      showEntireState()
      _selectedProject.push(proj)
      return
    }
    for (let lga of proj.associatedLgas) {
      projectLgas.push(lga.title)
    }
    for (let lga of projectLgas) {
      if (!_lgaFeaturesCache[lga]) {
        unloadedProjectLgas.push(lga)
      } else {
        loadedProjectLgas.push(lga)
      }
    }
    let queryString = ''
    for (let lga of unloadedProjectLgas) {
      if (queryString.length > 0) {
        queryString += `, '${lga}'`
      } else {
        queryString = `'${lga}'`
      }
    }
    if (queryString.length > 0) {
      source = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: extent =>
          `https://${geoserverDomainName}/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=myvic:lga&cql_filter=lga_code IN(${queryString})&outputFormat=application/json`,
        strategy: ol.loadingstrategy.all
      })
    }
    _mapLayers[0].setSource(source)

    _mapLayers[0].getSource().on('addfeature', function () {
      // this is called when a feature is loaded onto the layer
      _mapLayers[0].getSource().forEachFeature(function (feature) {
        const lgaCode = feature.get('lga_code')
        if (!_lgaFeaturesCache[lgaCode]) {
          _lgaFeaturesCache[lgaCode] = feature
        }
        if (projectLgas.includes(lgaCode)) {
          feature.drawState = 'active'
        } else {
          feature.drawState = 'hidden'
        }
        _mapLayers[0].changed()
      })
    })

    for (let lga of loadedProjectLgas) {
      _mapLayers[0].getSource().addFeature(_lgaFeaturesCache[lga])
    }
    _selectedProject.push(proj)
    if (unloadedProjectLgas.length === 0) {
      zoomMapToLayerExtent(_mapLayers[0], 20)
    }
  } else {
    _mapLayers[0].setSource(source)
    _mapLayers[0].changed()
  }
  if (unloadedProjectLgas.length > 0) {
    var sourceEventListener = _mapLayers[0].getSource().on('change', function (e) {
      if (_mapLayers[0].getSource().getState() === 'ready') {
        _mapLayers[0].getSource().un('change', sourceEventListener)
        zoomMapToLayerExtent(_mapLayers[0], 20)
      }
    })
  }
}

const setSelectedProjects = projects => {
  emptyArray(_selectedProject)
  emptyArray(_selectedProjects)
  _mapLayers[0].getSource().clear()
  for (let proj of projects) {
    _selectedProjects.push(proj)
  }
  _mapLayers[0].changed()
  triggerMapRedraw()
}

const hexToRgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

const projectsInLga = lga => {
  return _projects
    .filter(x => x.associatedLgas.length > 0)
    .filter(x => x.associatedLgas.find(projectLga => projectLga.key === lga || projectLga.key === 'ALL'))
}

const projectsInCategory = category => {
  return _projects
    .filter(x => x.categories.length > 0)
    .filter(proj => !!proj.categories.find(cat => cat.key === category.key))
}

const projectsLeadByLga = lga => {
  const projects = []
  for (let project of _projects) {
    if (project.associatedLgas[0]) {
      if (project.associatedLgas[0].key === lga) {
        projects.push(project)
      }
    }
  }
  return projects
}

const extractLgas = feature => {
  let lgasText = feature.get('lga_code')
  if (lgasText === '' && feature.get('lga_name') === 'Statewide') {
    lgasText = 'ALL'
  }
  const extractedLgas = []
  if (lgasText) {
    const associatedLgas = lgasText.split('|')
    associatedLgas.forEach(l => {
      // Don't want to add empty values
      if (!l || !l.trim()) {
        return
      }
      const lgaVal = l.trim()
      const newLgaObject = { key: lgaVal, title: lgaVal }
      extractedLgas.push(newLgaObject)
    })
  }
  return extractedLgas
}

const customMethods = {
  exposeMap: map => {
    _globalMap.push(map)
    _globalMap.push(map.getView().calculateExtent(map.getSize()))
  },

  readFeatureData: features => {
    features.forEach(f => {
      const id = f.getId()
      const found = _projects.filter(p => p.id === id)[0]
      if (found) {
        return
      }
      const title = f.get('project_name')
      const program = f.get('program_name')
      const providedBy = f.get('providing_agency')
      const details = f.get('overview_initiative')
      const councils = f.get('council_name')
      const href = f.get('agency_public_content_web')
      const project = {
        id,
        title: title ? title.trim() : '',
        program,
        providedBy,
        details,
        href,
        categories: [],
        areas: [],
        associatedLgas: []
      }
      _projects.push(project)
      _features.push(f)
      _allCategories.forEach(c => {
        if (f.get(c.key)) {
          project.categories.push(c)
        }
      })

      if (councils) {
        const areas = councils.split('|')
        areas.forEach(a => {
          // Don't want to add empty values
          if (!a || !a.trim()) {
            return
          }
          const areaVal = a.trim()
          const newAreaObject = { key: areaVal, title: areaVal, isArea: true }
          project.areas.push(newAreaObject)

          // Don't want to add duplicated
          if (!_allAreas.find(ma => ma.key === newAreaObject.key)) {
            _allAreas.push(newAreaObject)
          }
        })
      }

      const associatedLgas = extractLgas(f)
      if (associatedLgas.length > 0) {
        for (let lga of associatedLgas) {
          project.associatedLgas.push(lga)
        }
      } else if (project.areas.length === 1 && project.areas[0].key === 'Statewide') {
        const newLgaObject = { key: 'ALL', title: 'ALL' }
        project.associatedLgas.push(newLgaObject)
      }
      // map the council names to the lga codes for lookups
      for (var i = 0; i < project.areas.length; i++) {
        _councilToLgaMapping[project.areas[i].key] = project.associatedLgas[i].key
        _lgaToCouncilMapping[project.associatedLgas[i].key] = project.areas[i].key
      }
    })
  },

  lgaFeatureStyleFunction: (feature, resolution) => {
    var state = feature.drawState
    if (state === undefined) {
      state = 'hidden'
    }
    if (!_lgaStyleCache[state]) {
      switch (state) {
        case 'hidden':
          _lgaStyleCache[state] = null
          break
        case 'disabled':
          const disabledStyle = new ol.style.Style({
            fill: new ol.style.Fill({
              color: hexToRgba(disabledColor, 0.1)
            }),
            stroke: new ol.style.Stroke({
              color: hexToRgba(disabledColor, 1),
              width: 3
            }),
            zIndex: 1
          })
          _lgaStyleCache[state] = [disabledStyle]
          break
        case 'active':
          const activeStyle = new ol.style.Style({
            fill: new ol.style.Fill({
              color: hexToRgba(themeColor, 0.1)
            }),
            stroke: new ol.style.Stroke({
              color: hexToRgba(themeColor, 1),
              width: 3
            }),
            zIndex: 100
          })
          _lgaStyleCache[state] = [activeStyle]
          break
      }
    }
    return _lgaStyleCache[state]
  },
  themeFeatureStyleFunction: (feature, resolution) => {
    const features = feature.get('features')
    customMethods.readFeatureData(features)
    const size = 30
    const fontSizeInPx = '3.7'
    const clusterSize = features.length

    const featureIds = features.map(f => f.getId()).sort()
    let match = true
    if (_selectedProject.length > 0) {
      // Try match selectedProject to feature
      const selectedId = _selectedProject[0].id
      match = featureIds.some(id => id === selectedId)
    } else {
      if (_selectedProjects.length > 0) {
        // extract the lga codes for the entry points of the projects
        const projectLgas = []
        if (_selectedLga !== null) {
          for (let project of projectsLeadByLga(_selectedLga)) {
            const leadingLgaCode = project.associatedLgas[0].key
            if (leadingLgaCode !== 'ALL') {
              projectLgas.push(leadingLgaCode)
            }
          }
        } else {
          for (let project of _selectedProjects) {
            const leadingLgaCode = project.associatedLgas[0].key
            if (leadingLgaCode !== 'ALL') {
              projectLgas.push(leadingLgaCode)
            }
          }
        }
        // Try match selectedProjects to feature - the feature can change when zooming so this stops working when feature is changed during a zoom event.
        for (let feature of features) {
          const featureLgas = extractLgas(feature)
          // select the entry point lga for the feature
          const featureLeadingLga = featureLgas[0].key
          if (projectLgas.includes(featureLeadingLga)) {
            match = true
          } else {
            match = false
          }
        }
      }
    }

    // only cluster when there is more than one point in the area, and the other points are visible
    const isCluster = clusterSize > 1 && _selectedProject.length !== 1
    const clusterSizeText =
      clusterSize > 99
        ? `99<tspan style="font-size:${fontSizeInPx * 0.75}px">+</tspan>`
        : clusterSize.toString()
    let circleFill = isCluster ? clusterColor : themeColor
    let circleOutline = themeColor
    let textColor = isCluster ? themeColor : clusterColor

    if (!match) {
      if (_selectedProject.length === 1) {
        const svgDefinition =
          'data:image/svg+xml;charset=utf-8,' +
          encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg"
              width="${size}"
              height="${size}"
              viewBox="0 0 8 8">
            </svg>
          `)
        return [createImageIconStyle(svgDefinition, 'anonymous', [size, size])]
      }
      circleFill = isCluster ? clusterColor : disabledColor
      circleOutline = disabledColor
      textColor = isCluster ? disabledColor : clusterColor
    }
    let svgText = `
      <text
        x="50%"
        y="50%"
        dy="1.25"
        text-anchor="middle"
        fill="${textColor}"
        style="font-size:${fontSizeInPx}px;
          font-weight: bold;
          font-family:VIC-Regular, Arial, Helvetica, sans-serif;"
      >${clusterSizeText}</text>`

    if (match && _selectedProject.length === 1) {
      // we have one project selected
      // dont render the number
      svgText = ''
    }
    // NOTE: the whitespace in the <text> element is
    // important: `>${clusterSizeText}</text>`
    // IE doesn't trim all the whitespace and it leads
    // to off-center text
    const svgDefinition =
      'data:image/svg+xml;charset=utf-8,' +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg"
          width="${size}"
          height="${size}"
          viewBox="0 0 8 8">
          <circle
            stroke="${circleOutline}"
            fill="${circleFill}"
            stroke-width="1"
            cx="4"
            cy="4"
            r="3.5"/>
          ${svgText}
        </svg>
      `)
    return [createImageIconStyle(svgDefinition, 'anonymous', [size, size])]
  },
  // called when the app is mounted
  createThemeLayers: ol => {
    const isIE =
      navigator.appName === 'Microsoft Internet Explorer' ||
      !!(
        navigator.userAgent.match(/Trident/) ||
        navigator.userAgent.match(/rv:11/)
      )

    const lgaSource = new ol.source.Vector()
    _mapLayers.push(
      new ol.layer.Vector({
        source: lgaSource,
        name: 'lgaLayer',
        style: customMethods.lgaFeatureStyleFunction
      })
    )

    const themeSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: extent =>
        `https://${geoserverDomainName}/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=myvic:family_violence&outputFormat=application/json&srsname=EPSG:3857&bbox=${extent.join()},EPSG:3857`,
      strategy: ol.loadingstrategy.bbox
    })

    const clusterSource = new ol.source.ClusterSource({
      source: themeSource,
      distance: 40
    })

    if (isIE) {
      // internet explorer throws an error when using AnimatedCluster
      _mapLayers.push(
        new ol.layer.Vector({
          source: clusterSource,
          style: customMethods.themeFeatureStyleFunction,
          name: 'clusterLayer'
        })
      )
    } else {
      _mapLayers.push(
        new ol.source.AnimatedCluster({
          animationDuration: 600,
          source: clusterSource,
          style: customMethods.themeFeatureStyleFunction,
          name: 'clusterLayer'
        })
      )
    }
    return _mapLayers
  },

  featureMapper: feature => {
    switch (feature.layerName) {
      case 'clusterLayer':
        switch (feature.event) {
          case 'click':
            const features = feature.get('features')
            emptyArray(_selectedProjects)
            emptyArray(_selectedProject)
            const selectedProjects = []
            const count = features.length
            if (count > 0) {
              features.forEach(f => {
                const id = f.getId()
                const p = _projects.find(p => p.id === id)
                if (count === 1) {
                  setSelectedProject(p)
                } else {
                  selectedProjects.push(p)
                }
              })
              if (selectedProjects.length > 0) {
                setSelectedProjects(selectedProjects)
              }
              if (count > 1) {
                _selectedCategory.push({ isArea: true, title: '', key: 'cluster' })
              }
            }
            _selectedLga = null
            break
        }
        break

      case 'lgaLayer':
        const lgaCode = feature.get('lga_code')
        switch (feature.event) {
          case 'click':
            emptyArray(_selectedProject)
            showSingleLga(lgaCode)
            const council = _lgaToCouncilMapping[lgaCode]
            _selectedCategory.push({
              title: council,
              key: council,
              isArea: true
            })
            const projectsIn = projectsInLga(lgaCode)
            setSelectedProjects(projectsIn)
            _selectedLga = lgaCode
            break
          case 'move':
            _mapLayers[0].getSource().forEachFeature(function (f) {
              if (lgaCode === f.get('lga_code')) {
                f.drawState = 'active'
              } else {
                f.drawState = 'disabled'
              }
            })
            _mapLayers[0].changed()
            break
        }
        break
      case 'none':
        switch (feature.event) {
          case 'move':
            _mapLayers[0].getSource().forEachFeature(function (f) {
              f.drawState = 'active'
            })
            _mapLayers[0].changed()
            break
        }
    }
    triggerMapRedraw()
  }
}

export default {
  name: 'YourVicMapPreventionFamilyViolence',
  components: {
    RplMarkup,
    YourVicMap,
    YourVicMapExpandButton,
    YourVicMapSidebarHome,
    RplTextIcon,
    RplButton
  },
  props: {
    title: String,
    description: String
  },
  data: function () {
    return {
      baseMapUrl,
      customMethods,
      allCategories: _allCategories,
      allAreas: _allAreas,
      projects: _projects,
      selectedCategory: _selectedCategory,
      selectedProjects: _selectedProjects,
      selectedProject: _selectedProject,
      isFullScreen: false,
      expanded: false,
      refreshOn: false,
      buttonText: 'Enter full screen',
      buttonIcon: 'fullscreen'
    }
  },
  computed: {
    expandedMapClass () {
      return this.expanded ? 'yourvic-map__map-container map-expanded' : 'yourvic-map__map-container'
    }
  },
  mounted () {
    // We need to listen to the Document global fullscreen change event as user can use "Esc" to escape the fullscreen which will bypass our component toggle event.
    document.addEventListener('fullscreenchange', this.toggleButtonText)
  },
  methods: {
    toggleButtonText () {
      if (isFullscreen()) {
        this.buttonText = 'Exit full screen'
        this.buttonIcon = 'close'
      } else {
        this.buttonText = 'Enter full screen'
        this.buttonIcon = 'fullscreen'
      }
    },

    toggleExpand () {
      this.expanded = !this.expanded
      this.refreshMapSize()
    },

    refreshMapSize () {
      // Not sure why, but the yourvic map api has a watch on the refreshOn prop. This watch method triggers a map resize when the refreshOn prop is set to true.
      // Toggling it off an on with a timeout seems to consistently trigger the method and resize the map - Yay.
      this.refreshOn = false
      setTimeout(() => (this.refreshOn = true), 100)
    },

    toggleMapFullScreen () {
      toggleFullScreen(this.$refs.yourvicMapContainer)
      this.isFullScreen = !this.isFullScreen
      this.refreshMapSize()
    },

    clickBack (projectsAndCategory) {
      if (_selectedProject.length > 0) {
        // Clear selectedProject first
        emptyArray(_selectedProject)
      } else {
        // Otherwise clear selectedProjects
        emptyArray(_selectedProjects)
      }
      resetLgaSource()
      // setSelectedProjects(projects)
      if (projectsAndCategory[1]) {
        const lga = _councilToLgaMapping[projectsAndCategory[1].key]
        showSingleLga(lga)
      } else {
        zoomMapToExtent(_globalMap[1], 0)
      }
      triggerMapRedraw()
    },

    clickHome () {
      resetLgaSource()
      zoomMapToExtent(_globalMap[1], 0)
    },

    setSelectedProject (proj) {
      setSelectedProject(proj)
      triggerMapRedraw()
    },

    setSelectedArea (councilName) {
      let lga = null
      if (councilName.key === 'Statewide') {
        showEntireState()
      } else {
        lga = _councilToLgaMapping[councilName.key]
        showSingleLga(lga)
      }
      const projectsIn = projectsInLga(lga)
      setSelectedProjects(projectsIn)
      _selectedLga = lga
      triggerMapRedraw()
    },

    setSelectedCategory (category) {
      const projects = projectsInCategory(category)
      setSelectedProjects(projects)
      _selectedLga = null
      triggerMapRedraw()
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

.yourvic-map {
  &__title {
    @include rpl_mobile_padding;

    @include rpl_breakpoint_down(m) {
      font-size: 1em !important;
    }

    @include rpl_breakpoint(m) {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

/* Do the following when large (wide) screen */
.yourvic-map__container:fullscreen {
  .yourvic-map__sidebar-container,
  .yourvic-map__map-container {
    height: 100vh;
  }
}
.yourvic-map__container {
  width: 100%;
  display: flex;
  overflow: hidden;
  .yourvic-map__sidebar-container {
    width: 450px;
    min-width: 450px;
    margin-right: 0 !important;
    float: left !important;
    z-index: 1;
    order: 1;
    box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.2);
  }
  .yourvic-map__map-container {
    width: 100%;
    margin-left: 0 !important;
    order: 2;
    position: relative;
  }
  .yourvic-map__sidebar-container,
  .yourvic-map__map-container {
    height: 600px;
  }
  .full-screen-btn {
    top: $rpl-space-2;
    right: $rpl-space-2;
    z-index: 1000;
    width: auto;
    position: absolute;
    .rpl-icon--close {
      height: $rpl-space-2 !important;
      width: $rpl-space-2 !important;
    }
  }
  .yourvic-map__container__expand-btn-container {
    display: none;
  }
  // Hack to make the map fullscreen
  .yourvic-map {
    height: 100%;
    &__map {
      height: 100%;
    }
    &__container {
      height: 100%;
      padding-top: 0px;
    }
  }
}

/* Do the following when small(narrow) screen */
@media (max-width: 768px) {
  .yourvic-map__container {
    .rpl-text-label--emphasis.rpl-text-label--small {
      font-size: 0.75rem;
    }

    &:fullscreen .rpl-text-label--emphasis.rpl-text-label--small {
      font-size: 0.875rem;
    }
    .yourvic-map__container__expand-btn-container {
      position: absolute;
      z-index: 1000;
      bottom: $rpl-space-2;
      right: $rpl-space-2;
      display: block;
    }
  }
  .yourvic-map__container,
  .yourvic-map__container:fullscreen {
    .full-screen-btn {
      font-size: 1rem;
      padding-top: $rpl-space-2;
      padding-bottom: $rpl-space-2;
    }
    display: block;
    .yourvic-map__sidebar-container {
      height: 70vh;
      min-width: 0px;
    }
    .yourvic-map__map-container {
      height: 30vh;
      &.map-expanded {
        height: 60vh;
      }
    }
    .yourvic-map__sidebar-container,
    .yourvic-map__map-container {
      width: 100% !important;
      float: none !important;
    }
  }
}
</style>
