import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "demo" */ '../pages/Demo.vue')
  },
  {
    path: '/demo/bundle-1-bar-chart',
    name: 'Bundle1BarChart',
    component: () => import(/* webpackChunkName: "bundle-1-bar-chart" */ '../pages/Bundle1BarChart.vue')
  },
  {
    path: '/demo/bundle-2-map',
    name: 'Bundle2Map',
    component: import(/* webpackChunkName: "bundle-2-map" */ '../pages/Bundle2Map.vue')
  },
  {
    path: '/demo/bundle-3-bar-chart',
    name: 'Bundle3BarChart',
    component: () => import(/* webpackChunkName: "bundle-3-bar-chart" */ '../pages/Bundle3BarChart.vue')
  },
  {
    path: '/demo/bundle-3-map',
    name: 'Bundle3Map',
    component: () => import(/* webpackChunkName: "bundle-3-map" */ '../pages/Bundle3Map.vue')
  },
  {
    path: '/demo/sample-site-bar-chart',
    name: 'SampleSiteBarChart',
    component: () => import(/* webpackChunkName: "sample-site-bar-chart" */ '../pages/SampleSiteBarChart.vue')
  },
  {
    path: '/demo/sample-site-line-chart-labour',
    name: 'SampleSiteLineChartLabour',
    component: () => import(/* webpackChunkName: "sample-site-line-chart" */ '../pages/SampleSiteLineChartLabour.vue')
  },
  {
    path: '/demo/sample-site-line-chart-visitors',
    name: 'SampleSiteLineChartVisitors',
    component: () => import(/* webpackChunkName: "sample-site-line-chart-visitors" */ '../pages/SampleSiteLineChartVisitors.vue')
  },
  {
    path: '/demo/sample-site-map',
    name: 'SampleSiteMap',
    component: () => import(/* webpackChunkName: "sample-site-map" */ '../pages/SampleSiteMap.vue')
  },
  {
    path: '/demo/sample-site-pie-chart-decrease',
    name: 'SampleSitePieChartDecrease',
    component: () => import(/* webpackChunkName: "sample-site-pie-chart-decrease" */ '../pages/SampleSitePieChartDecrease.vue')
  },
  {
    path: '/demo/sample-site-pie-chart-increase',
    name: 'SampleSitePieChartIncrease',
    component: () => import(/* webpackChunkName: "sample-site-pie-chart-increase" */ '../pages/SampleSitePieChartIncrease.vue')
  },
  {
    path: '/demo/sample-site-tree-map',
    name: 'SampleSiteTreeMap',
    component: () => import(/* webpackChunkName: "sample-site-tree-map" */ '../pages/SampleSiteTreeMap.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
