// This is core loader.
// It should load all core components and create charts/maps dynamically based on provided data and config.
const loadComponent = (configs) => {
  let dataDrivenComp
  switch (configs.name) {
    // TODO: this will be next phase to create charts dynamically by given a component name and config/data.
    // case 'myvic_barchart':
    //   dataDrivenComp = {
    //     name: () => import(/* webackChunkName: 'yourvic-bar-chart' */ '@dpc-sdp/yourvic-bar-chart'),
    //     props: config.data
    //   }
    //   break
  }
  return dataDrivenComp
}

export default loadComponent
