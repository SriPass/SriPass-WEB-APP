import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


// render
//const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const PassengerPage = Loadable(lazy(() => import('pages/extra-pages/PassengerPage')));
const DriverPage = Loadable(lazy(() => import('pages/extra-pages/DriverPage')));
const BusPage = Loadable(lazy(() => import('pages/extra-pages/BusPage')));
const InspectorPage = Loadable(lazy(() => import('pages/extra-pages/InspectorPage')));
const FareRevenuePage = Loadable(lazy(() => import('pages/extra-pages/FareRevenuePage')));
const RoutePage = Loadable(lazy(() => import('pages/extra-pages/RoutePage')));
const BusSchedulePage = Loadable(lazy(() => import('pages/extra-pages/BusSchedulePage')));

// render - utilities
const AddPassenger = Loadable(lazy(() => import('pages/components-overview/AddPassenger')));
const AddDriver = Loadable(lazy(() => import('pages/components-overview/AddDriver')));
const AddBus = Loadable(lazy(() => import('pages/components-overview/AddBus')));
const AddRoute = Loadable(lazy(() => import('pages/components-overview/AddRoute')));
const AddBusSchedule = Loadable(lazy(() => import('pages/components-overview/AddBusSchedule')));
const AddInspector = Loadable(lazy(() => import('pages/components-overview/AddInspector')));






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
      element: <BusSchedulePage/>
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
    {
      path: 'addroute',
      element: <AddRoute />
    },
    {
      path: 'addbusschedule',
      element: <AddBusSchedule />
    },
    
    
    
  ]
};

export default MainRoutes;
