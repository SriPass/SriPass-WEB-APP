import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


// render
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const CustomerPage = Loadable(lazy(() => import('pages/extra-pages/CustomerPage')));
const DriverPage = Loadable(lazy(() => import('pages/extra-pages/DriverPage')));
const PayPage = Loadable(lazy(() => import('pages/extra-pages/PayPage')));


// render - utilities
const AddCustomer = Loadable(lazy(() => import('pages/components-overview/AddCustomer')));
const AddDriver = Loadable(lazy(() => import('pages/components-overview/AddDriver')));
const AddPay = Loadable(lazy(() => import('pages/components-overview/AddPay')));



const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    //tables
    {
      path: 'customer',
      element: <CustomerPage />
    },
    {
      path: 'driver',
      element: <DriverPage />
    },
    {
      path: 'pay',
      element: <PayPage />
    },
   
    //forms
    {
      path: 'addcustomer',
      element: <AddCustomer />
    },
    {
      path: 'adddriver',
      element: <AddDriver />
    },
    {
      path: 'addpay',
      element: <AddPay />
    }
    
    
    
  ]
};

export default MainRoutes;
