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
    path: '/storybook*',
    name: 'StoryBookPage',
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
