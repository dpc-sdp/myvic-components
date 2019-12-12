<template>
  <div class="YourVic-map-sidebar-home" ref="scrollElement">
    <YourVicMapSidebarHeader
      :title="headerTitle"
      :description="headerDescription"
      :showBackButton="showBackButton"
      :showHomeButton="showProjects"
      v-on:back-clicked="clickBack"
      v-on:home-clicked="clickHome"
      v-on:view-all-clicked="clickViewAll"
    />
    <div class="YourVic-map-sidebar-home__content">
      <div v-if="showProjects">
        <YourVicMapProjectCard
          v-for="(proj, index) in projectsToShow"
          @click="setProject"
          :key="index"
          :project="proj"
        />
      </div>

      <div v-if="showHome">
        <YourVicMapCategoriesPage
          :items="items"
          :isArea="!state.showCategories"
          v-on:clickShowArea="clickShowArea"
          v-on:clickShowCategories="clickShowCategories"
          v-on:clickCategory="setCategory"
        />
      </div>

      <div v-if="showSingleProject">
        <YourVicMapProjectDetails
          :project="selectedProject"
          @click="itemClicked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import YourvicMapCard from './YourvicMapCard'
import YourvicMapProjectCard from './YourvicMapProjectCard'
import YourvicMapProjectDetails from './YourvicMapProjectDetails'
import YourvicMapSidebarHeader from './YourvicMapSidebarHeader'
import YourvicMapCategoriesPage from './YourvicMapCategoriesPage'
import { sortByTitle, emptyArray } from './helper'

export default {
  name: 'YourVicMapSidebarHome',
  components: {
    YourVicMapCard,
    YourVicMapProjectDetails,
    YourVicMapSidebarHeader,
    YourVicMapCategoriesPage,
    YourVicMapProjectCard
  },
  props: {
    categories: Array,
    areas: Array,
    projects: Array,
    selectedProjects: Array,
    parentSelectedProject: Array,
    parentSelectedCategory: Array
  },
  data: function () {
    return {
      state: {
        showCategories: true,
        category: null
      }
    }
  },
  computed: {
    selectedProject () {
      const { parentSelectedProject } = this
      return parentSelectedProject.length === 1
        ? parentSelectedProject[0]
        : null
    },
    selectedCategory () {
      console.log('selectedCategory')
      console.log(this.state.category)
      const { parentSelectedCategory } = this
      if (parentSelectedCategory.length === 1) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.state.category = parentSelectedCategory[0]
        emptyArray(parentSelectedCategory)
      }
      return null
    },
    items () {
      const {
        state: { showCategories },
        categories,
        areas
      } = this
      return sortByTitle(showCategories ? categories : areas)
    },
    showSingleProject () {
      const { selectedProject } = this
      return selectedProject !== null
    },
    showBackButton () {
      const { selectedProject, selectedProjects } = this
      return selectedProject !== null || selectedProjects.length > 0
    },
    showProjects () {
      const {
        state: { category },
        selectedCategory,
        selectedProject,
        selectedProjects
      } = this
      console.log(category)
      console.log(selectedCategory)
      return (
        (category !== null || selectedProjects.length > 1) &&
        selectedProject === null
      )
    },
    showHome () {
      const {
        state: { category },
        selectedProject,
        selectedProjects
      } = this
      return (
        selectedProjects.length === 0 && !selectedProject && !category
      )
    },
    headerTitle () {
      const {
        state: { category },
        selectedProjects,
        selectedProject,
        selectedCategory,
        showHome,
        projects
      } = this

      console.log(selectedCategory)
      console.log(category)

      if (selectedProject !== null) {
        return selectedProject.title
      }

      if (category !== null) {
        return category.title
      }

      const count = selectedProjects.length
      if (count > 1) {
        return `${count} Project${count === 1 ? '' : 's'} at this site`
      }

      if (showHome) {
        return `${projects.length} family violence prevention projects across Victoria`
      }
    },
    projectsToShow () {
      const {
        state: { category },
        projects,
        selectedProjects
      } = this
      if (selectedProjects.length > 0) {
        return sortByTitle(selectedProjects)
      }

      if (!category) {
        return []
      }

      let projectsToShow = projects
      if (!category.isAll) {
        if (category.isArea) {
          let projectsToShowCouncil = projects.filter(p =>
            p.areas.some(c => c.key === category.key)
          )
          let projectsToShowStatewide = projects.filter(p =>
            p.areas.some(c => c.key === 'Statewide')
          )
          projectsToShow = projectsToShowCouncil.concat(projectsToShowStatewide)
        } else {
          projectsToShow = projects.filter(p =>
            p.categories.some(c => c.key === category.key)
          )
        }
      }
      return sortByTitle(projectsToShow)
    },
    headerDescription () {
      const {
        state: { category },
        showHome,
        selectedProject,
        projectsToShow
      } = this

      if (showHome || selectedProject !== null) {
        return null
      }

      let categoryTest = true
      if (category !== null && category.isArea) {
        categoryTest = false
      }
      const count = projectsToShow.length
      const suffix = categoryTest ? 'category' : 'area'
      const text = count === 1 ? 'project' : 'projects'
      return `${count} ${text} in this ${suffix}`
    }
  },
  methods: {
    clickHome () {
      this.$emit('home-clicked')
      this.state.category = null
    },
    clickBack () {
      this.$emit('back-clicked', [this.projectsToShow, this.state.category])
    },
    clickViewAll () {
      // Dummying category to show all projects
      this.state.category = {
        title: 'All projects',
        projects: this.projects,
        isAll: true
      }
    },
    itemClicked (item) {
      this.setProject()
      this.setCategory(item)
    },
    setCategory (cat) {
      this.scrollToTop()
      this.state.category = cat
      console.log('setCat')
      console.log(cat)
      if (!this.state.showCategories || cat.isArea) {
        console.log('here')
        // we are showing projects by area
        this.$emit('set-area', cat)
      }
    },
    setProject (proj) {
      this.scrollToTop()
      this.$emit('set-selected-project', proj)
    },
    clickShowCategories () {
      this.scrollToTop()
      if (this.state.showCategories) {
        return
      }
      this.state.showCategories = !this.state.showCategories
      this.$emit('set-filter-by-category')
    },
    clickShowArea () {
      this.scrollToTop()
      if (!this.state.showCategories) {
        return
      }
      this.state.showCategories = !this.state.showCategories
      this.$emit('set-filter-by-area')
    },
    scrollToTop () {
      this.$refs.scrollElement.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

$yourvic-map-sidebar-home-background-color: rpl-color('mid_neutral_2') !default;

.yourvic-map-sidebar-home {
  height: 100%;
  overflow: auto;
  background-color: $yourvic-map-sidebar-home-background-color;
  .yourvic-map-sidebar-home__content {
    padding: $rpl-space-4;
    padding-top: $rpl-space-2;
  }
}
</style>
