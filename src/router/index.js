import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const MarkdownPageView = () => import(/* webpackChunkName: "markdown-page-view" */ '../views/MarkdownPage');

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/storybook',
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/storybook*',
    name: 'MarkdownPage',
    component: MarkdownPageView,
  },
  {
    path: '/reference/element/:tag',
    name: 'ElementPage',
    component: () => import(/* webpackChunkName: "element-view" */ '../views/Element'),
  },
  {
    path: '/reference/attribute/:attr',
    name: 'AttributePage',
    component: () => import(/* webpackChunkName: "attribute-view" */ '../views/Attribute'),
  },
  {
    path: '/reference/*',
    name: 'MarkdownPage',
    component: MarkdownPageView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
