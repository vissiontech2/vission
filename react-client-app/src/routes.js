/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import DashboardLayout from './layouts/Dashboard';
import DashboardAnalyticsView from './views/DashboardAnalytics';


// const userValidator = (viewToImpor) => {
//   const userInfo = sessionStorage.getItem('userInfo');
//   if (userInfo) {
//     import(viewToImpor)
//   } else {
//     if (false) {
//       history.push('/auth/login')
//       // eslint-disable-next-line no-restricted-globals
//       location.reload()
//     }
//   }
// }


// const dashboardValidator = (dashboard) => {
//   const userInfo = sessionStorage.getItem('userInfo');
//   if (!!userInfo) {
//     return dashboard
//   } else {
//     if (false) {
//       history.push('/auth/login')
//       // eslint-disable-next-line no-restricted-globals
//       location.reload()
//     }
//   }
// }

export default [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/presentation" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('src/views/Login'))
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('src/views/Register'))
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/sales/transactions',
        exact: true,
        component: lazy(() => import('src/views/sales/transactions'))
      },
      {
        path: '/sales/transactionDetails',
        exact: true,
        component: lazy(() => import('src/views/sales/transactionDetail'))
      },
      {
        path: '/sales/customers',
        exact: true,
        component: lazy(() => import('src/views/sales/customers'))
      },
      {
        path: '/sales/customerDetails',
        exact: true,
        component: lazy(() => import('src/views/sales/customerDetails'))
      },
      {
        path: '/inventoryManagement/inventory',
        exact: true,
        component: lazy(() => import('src/views/inventoryManagement/inventory'))
      },
      {
        path: '/inventoryManagement/orders',
        exact: true,
        component: lazy(() => import('src/views/inventoryManagement/orders'))
      },
      {
        path: '/inventoryManagement/orderDetails',
        exact: true,
        component: lazy(() => import('src/views/inventoryManagement/orderDtails'))
      },
      {
        path: '/inventoryManagement/suppliers',
        exact: true,
        component: lazy(() => import('src/views/inventoryManagement/suppliers'))
      },
      {
        path: '/inventoryManagement/supplierDetails',
        exact: true,
        component: lazy(() => import('src/views/inventoryManagement/supplierDetails'))
      },
      {
        path: '/invoices/1',
        exact: true,
        component: lazy(() => import('src/views/InvoiceDetails'))
      },
      {
        path: '/dashboards/analytics',
        exact: true,
        component: DashboardAnalyticsView
      },
    ]
  }
];
