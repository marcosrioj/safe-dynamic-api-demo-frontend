export const authRoles = {
  sa: ['sa'], // Only Super Admin has access
  admin: ['sa', 'admin'], // Only SA & Admin has access
  editor: ['sa', 'admin', 'editor'], // Only SA & Admin & Editor has access
  user: ['sa', 'admin', 'editor', 'user'], // Only SA & Admin & Editor & User has access
  guest: ['sa', 'admin', 'editor', 'user', 'guest'] // Everyone has access
}

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <----------------
//   }
// ];