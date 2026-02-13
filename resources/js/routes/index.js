import { createRouter, createWebHistory } from 'vue-router'

import App from '../layouts/App.vue'
import Loading from '../pages/Loading.vue'
import Landing from '../pages/Landing.vue'
import Register from '../pages/Register.vue'
import Purpose from '../pages/Purpose.vue'
import ScanQR from '../pages/ScanQR.vue'
import ExistingVisitor from '../pages/ExistingVisitor.vue'
import FaceCapture from '../pages/FaceCapture.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import Dashboard from '../pages/admin/Dashboard.vue'
import VisitorLogbook from '../pages/admin/VisitorLogbook.vue'
import Reports from '../pages/admin/Reports.vue'
import Blacklist from '../pages/admin/Blacklist.vue'
import Settings from '../pages/admin/Settings.vue'

const routes = [
  {
    path: '/',
    component: App,
    children: [
      { path: '', name: 'loading', component: Loading },
      { path: 'landing', name: 'landing', component: Landing },
      { path: 'register', name: 'register', component: Register },
      { path: 'purpose', name: 'purpose', component: Purpose },
      { path: 'scan', name: 'scan-qr', component: ScanQR },
      { path: 'existing-visitor', name: 'existing-visitor', component: ExistingVisitor },
      { path: 'face-capture', name: 'face-capture', component: FaceCapture }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', name: 'admin-dashboard', component: Dashboard },
      { path: 'visitor-logbook', name: 'admin-visitor-logbook', component: VisitorLogbook },
      { path: 'reports', name: 'admin-reports', component: Reports },
      { path: 'blacklist', name: 'admin-blacklist', component: Blacklist },
      { path: 'settings', name: 'admin-settings', component: Settings }
    ]
  }
]

/*const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  // other pages can be added here
]*/

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router