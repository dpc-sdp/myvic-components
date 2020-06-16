export const autoCompleteTemplate = `
<form>
  <auto-complete
    :items="items"
    :result-item-line-style="resultItemLineStyle"
    :get-item-secondary-text="getItemSecondaryText"
    :showIcon="showIcon"
    :debugMode="true"
  />
</form>
`
export const acItems = [
  {
    name: 'home',
    description: '',
    tag: 'tag',
    icon: 'home',
    iconColor: 'primary'
  }, {
    name: 'some place',
    description: 'description for some place',
    tag: 'special tag',
    icon: 'map_marker',
    iconColor: 'secondary'
  }, {
    name: 'some other place',
    description: 'description for some other place',
    tag: 'special tag',
    icon: 'map_marker',
    iconColor: 'secondary'
  }
]

export const getItemSecondaryText = ({ description }) => description
