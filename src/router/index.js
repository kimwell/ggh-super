import Vue from 'vue';
import iView from 'iview'
import Router from 'vue-router';
import store from '@/store/store'
import * as types from '@/store/types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Router);


// 页面刷新时，重新赋值token
if (Vue.ls.get('authorization_bg')) {
  store.commit(types.LOGIN, {
    authorization: Vue.ls.get('authorization_bg'),
    loginId: Vue.ls.get('loginId_bg')
  })
}

const router = new Router({
  mode: 'history',
  base: '/bg/',
  routes: [{
      path: '/',
      name: '/',
      component: resolve => require(['@/views/index/index'], resolve),
      children: [{
        path: 'order',
        name: 'order',
        component: resolve => require(['@/views/order/index'], resolve)
      }, {
        path: 'interface',
        name: 'interface',
        component: resolve => require(['@/views/interface/index'],resolve)
      },{
        path: 'jurisdiction',
        name: 'jurisdiction',
        component: resolve => require(['@/views/jurisdiction/index'],resolve)
      },{
        path: 'system',
        name: 'system',
        component: resolve => require(['@/views/system/index'], resolve),
        children: [{
          path: 'dictionary',
          name: 'dictionary',
          component: resolve => require(['@/views/system/dictionary/index'], resolve)
        }, {
          path: 'parameter',
          name: 'parameter',
          component: resolve => require(['@/views/system/parameter/index'], resolve)
        }, {
          path: 'buyOffer',
          name: 'buyOffer',
          component: resolve => require(['@/views/system/buyOffer/index'], resolve)
        }]
      }, {
        path: 'news',
        name: 'news',
        component: resolve => require(['@/views/news/index'], resolve),
        children: [{
          path: 'nadd/:id/:type',
          name: 'nadd',
          component: resolve => require(['@/views/news/nadd/index'], resolve)
        }, {
          path: 'nlist',
          name: 'nlist',
          component: resolve => require(['@/views/news/nlist/index'], resolve)
        }, {
          path: 'nconfig',
          name: 'nconfig',
          component: resolve => require(['@/views/news/nconfig/index'], resolve)
        }]
      }]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/views/login/index'], resolve),
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    next();
  } else {
    if (store.state.authorization) {
      next();
    } else {
      iView.Modal.error({
        content: '登录过期，请重新登录。',
        onOk() {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
        }
      })
    }
  }
})

router.afterEach((to, from, next) => {

});

export default router;
