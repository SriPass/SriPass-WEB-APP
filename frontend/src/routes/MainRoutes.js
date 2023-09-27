import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import RoutePage from 'pages/extra-pages/RoutePage';
import BusScheduleTable from 'pages/dashboard/BusScheduleTable'


// render
//const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const PassengerPage = Loadable(lazy(() => import('pages/extra-pages/PassengerPage')));
const DriverPage = Loadable(lazy(() => import('pages/extra-pages/DriverPage')));
const BusPage = Loadable(lazy(() => import('pages/extra-pages/BusPage')));
import InspectorPage from 'pages/extra-pages/InspectorPage';
import FareRevenuePage from 'pages/extra-pages/FareRevenuePage';

// render - utilities
const AddPassenger = Loadable(lazy(() => import('pages/components-overview/AddPassenger')));
const AddDriver = Loadable(lazy(() => import('pages/components-overview/AddDriver')));
const AddBus = Loadable(lazy(() => import('pages/components-overview/AddBus')));
import AddInspector from './../pages/components-overview/AddInspector';




const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <FareRevenuePage />
    },
    {
      path: '',
      children: [
        {
          path: '',
          element: <FareRevenuePage />
        }
      ]
    },

    //tables
    {
      path: 'passenger',
      element: <PassengerPage />
    },
    {
      path: 'driver',
      element: <DriverPage />
    },
    {
      path: 'busDetails',
      element: <BusPage/>
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
      path: 'fareRevenue',
      element: <FareRevenuePage />
    },
    {
      path: 'bus',
      element: <BusScheduleTable/>
    },
    

    //forms
    {
      path: 'addpassenger',
      element: <AddPassenger />
    },
    {
      path: 'adddriver',
      element: <AddDriver />
    },
    {
      path: 'addinspector',
      element: <AddInspector />
    },
    {
      path: 'addbus',
      element: <AddBus />
    },
    
    
    
  ]
};

export default MainRoutes;
