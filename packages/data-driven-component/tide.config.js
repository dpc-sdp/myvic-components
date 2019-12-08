module.exports = {
  mapping: {
    // Mapping for landing page `field_landing_page_component` field paragraphs.
    landingPageComponents: {
      'paragraph--data_driven_component': {
        expression: (item) => {
          return item.field_data_driven_component
        },
        components: [
          {
            case: 'myvic_vicfreewifi',
            component: 'yourvic-vic-free-wifi-map',
            ssr: false,
            props: {
              title: 'field_paragraph_title',
              description: ['field_paragraph_body', 'processed']
            }
          }, {
            case: 'myvic_family_violence_women_programs',
            component: 'yourvic-map-prevention-family-violence',
            ssr: false,
            props: {
              title: 'field_paragraph_title',
              description: ['field_paragraph_body', 'processed']
            }
          }
        ]
      }
    }
  }
}
