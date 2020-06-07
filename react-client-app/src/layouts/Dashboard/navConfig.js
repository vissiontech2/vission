import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import StorageIcon from '@material-ui/icons/Storage';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BugReportIcon from '@material-ui/icons/BugReport';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

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
          }
        ]
      },
      {
        title: 'Inventory Management',
        href: '/inventoryManagement',
        icon: StorageIcon,
        items: [
          {
            title: 'Orders',
            href: '/inventoryManagement/orders'
          },
          {
            title: 'Suppliers',
            href: '/inventoryManagement/suppliers'
          },
          {
            title: 'Inventory',
            href: '/inventoryManagement/inventory'
          },
        ]
      },
      {
        title: 'Balance Sheet',
        href: '/balanceSheet',
        icon: AccountBalanceIcon
      },
      {
        title: 'Issue Tracking',
        href: '/issueTracking',
        icon: BugReportIcon
      },
      {
        title: 'Access Management',
        href: '/accessManagement',
        icon: LockOpenIcon
      },
      {
        title: 'Notifications',
        href: '/notifications',
        icon: NotificationsNoneIcon
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
