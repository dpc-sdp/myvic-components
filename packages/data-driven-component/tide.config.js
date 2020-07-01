module.exports = {
  mapping: {
    landingPageComponents: {
      'paragraph--data_driven_component': {
        component: 'yourvic-data-driven',
        props: {
          title: 'field_paragraph_title',
          description: ['field_paragraph_body', 'processed'],
          configs: {
            field: 'field_data_driven_component',
            filters: ['dataDrivenComponent']
          }
        }
      }
    }
  }
}
