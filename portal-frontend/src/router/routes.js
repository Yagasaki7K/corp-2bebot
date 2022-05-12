
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') },
    //   { path: ':id/edit', component: () => import('src/pages/Catalogo/Edit') },
    // ],
    children: [
      { path: '', component: () => import('src/pages/Catalogos/Catalogos.vue') },
      { path: ':id/edit', component: () => import('src/pages/Catalogo/Edit') },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/perfil',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Perfil.vue') },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/representantes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Representantes') },
      { path: 'novo', component: () => import('pages/Representantes/Novo.vue') },
      { path: ':id', component: () => import('pages/Representantes/Edit.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/customers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Customers') },
      { path: 'novo', component: () => import('pages/Customers/Novo.vue') },
      { path: ':id', component: () => import('pages/Customers/Edit.vue') },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/gerentes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Gerentes') },
      { path: 'novo', component: () => import('pages/Gerentes/Novo.vue') },
      { path: ':id', component: () => import('pages/Gerentes/Edit.vue') },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/admins',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Administradores') },
      { path: 'novo', component: () => import('pages/Administradores/Novo.vue') },
      { path: ':id', component: () => import('pages/Administradores/Edit.vue') }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Orders') },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/order/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Orders/Review') },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/catalogos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Catalogos/Catalogos.vue') },
      { path: ':id/edit', component: () => import('src/pages/Catalogo/Edit') },
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/catalogo/:id',
    component: () => import('pages/Catalogo'),
    // meta: { requiresAuth: true }
  },
  {
    path: '/catalogo/:id/edit',
    component: () => import('src/pages/Catalogo/Editor.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:catalogo/:representante',
    component: () => import('pages/Catalogo'),
    meta: { requiresAuth: true }
  },
  {
    path: '/produtos',
    component: () => import('pages/Produtos'),
    meta: { requiresAuth: true }
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
