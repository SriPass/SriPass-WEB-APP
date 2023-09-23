import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import RoutePage from 'pages/extra-pages/RoutePage';
import BusScheduleTable from 'pages/dashboard/BusScheduleTable'


// render
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const CustomerPage = Loadable(lazy(() => import('pages/extra-pages/CustomerPage')));
const DriverPage = Loadable(lazy(() => import('pages/extra-pages/DriverPage')));
import InspectorPage from 'pages/extra-pages/InspectorPage';


// render - utilities
const AddCustomer = Loadable(lazy(() => import('pages/components-overview/AddCustomer')));
const AddDriver = Loadable(lazy(() => import('pages/components-overview/AddDriver')));
import AddInspector from './../pages/components-overview/AddInspector';




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
      path: 'inspector',
      element: <InspectorPage />
    },
    {
      path: 'route',
      element: <RoutePage />
    },
    {
      path: 'bus',
      element: <BusScheduleTable/>
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
      path: 'addinspector',
      element: <AddInspector />
    },
    
    
    
  ]
};

export default MainRoutes;
