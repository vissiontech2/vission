/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
// import React from 'react';
// import { colors } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import ChatIcon from '@material-ui/icons/ChatOutlined';
// import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
// import ErrorIcon from '@material-ui/icons/ErrorOutline';
// import FolderIcon from '@material-ui/icons/FolderOutlined';
// import HomeIcon from '@material-ui/icons/HomeOutlined';
// import ListAltIcon from '@material-ui/icons/ListAlt';
// import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
// import MailIcon from '@material-ui/icons/MailOutlined';
// import PresentToAllIcon from '@material-ui/icons/PresentToAll';
// import PeopleIcon from '@material-ui/icons/PeopleOutlined';
// import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
// import SettingsIcon from '@material-ui/icons/SettingsOutlined';
// import ViewConfigIcon from '@material-ui/icons/ViewComfy';
// import ListIcon from '@material-ui/icons/List';
// import Label from 'src/components/Label';

export default [
  {
    subheader: 'Pages',
    items: [
      {
        title: 'Dashboards',
        href: '/dashboards',
        icon: DashboardIcon,
        items: [
          {
            title: 'Analytics',
            href: '/dashboards/analytics'
          }
        ]
      },
      {
        title: 'Sales',
        href: '/sales',
        icon: BarChartIcon,
        items: [
          {
            title: 'Transactions',
            href: '/sales/transactions'
          },
          {
            title: 'Customers',
            href: '/sales/customers'
          },
          {
            title: 'Inventory',
            href: '/sales/inventory'
          },
        ]
      },
      {
        title: 'Purchases',
        href: '/purchases',
        icon: BarChartIcon,
        items: [
          {
            title: 'Orders',
            href: '/purchases/orders'
          },
          {
            title: 'Suppliers',
            href: '/purchases/suppliers'
          }
        ]
      },
      {
        title: 'Invoice',
        href: '/invoices/1',
        icon: ReceiptIcon
      },
      // {
      //   title: 'Authentication',
      //   href: '/auth',
      //   icon: LockOpenIcon,
      //   items: [
      //     {
      //       title: 'Login',
      //       href: '/auth/login'
      //     },
      //     {
      //       title: 'Register',
      //       href: '/auth/register'
      //     }
      //   ]
      // }
    ]
  }
];
