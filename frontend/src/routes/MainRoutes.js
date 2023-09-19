import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


// render
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const CustomerPage = Loadable(lazy(() => import('pages/extra-pages/CustomerPage')));
const ShipperPage = Loadable(lazy(() => import('pages/extra-pages/ShipperPage')));
const LoadPage = Loadable(lazy(() => import('pages/extra-pages/LoadPage')))
const CarrierPage = Loadable(lazy(() => import('pages/extra-pages/CarrierPage')));
const CarrierRatePage = Loadable(lazy(() => import('pages/extra-pages/CarrierRatePage')));
const ConsignePage = Loadable(lazy(() => import('pages/extra-pages/ConsignePage')));
const ContactPage = Loadable(lazy(() => import('pages/extra-pages/ContactPage')));
const CustomerRatePage = Loadable(lazy(() => import('pages/extra-pages/CustomerRatePage')));
const DriverPage = Loadable(lazy(() => import('pages/extra-pages/DriverPage')));
const ExpensesPage = Loadable(lazy(() => import('pages/extra-pages/ExpensesPage')));
const PayPage = Loadable(lazy(() => import('pages/extra-pages/PayPage')));
const SupplierPage = Loadable(lazy(() => import('pages/extra-pages/SupplierPage')));
const TrailerPage = Loadable(lazy(() => import('pages/extra-pages/TrailerPage')));
const TruckPage = Loadable(lazy(() => import('pages/extra-pages/TruckPage')));

// render - utilities
const AddCustomer = Loadable(lazy(() => import('pages/components-overview/AddCustomer')));
const AddLoad = Loadable(lazy(() => import('pages/components-overview/AddLoad')));
const AddShipper = Loadable(lazy(() => import('pages/components-overview/AddShipper')));
const AddCarrier = Loadable(lazy(() => import('pages/components-overview/AddCarrier')));
const AddCarrierRate = Loadable(lazy(() => import('pages/components-overview/AddCarrierRate')));
const AddConsignee = Loadable(lazy(() => import('pages/components-overview/AddConsigne')));
const AddContact = Loadable(lazy(() => import('pages/components-overview/AddContact')));
const AddCustomerRate = Loadable(lazy(() => import('pages/components-overview/AddCustomerRate')));
const AddDriver = Loadable(lazy(() => import('pages/components-overview/AddDriver')));
const AddExpenses = Loadable(lazy(() => import('pages/components-overview/AddExpenses')));
const AddPay = Loadable(lazy(() => import('pages/components-overview/AddPay')));
const AddSupplier = Loadable(lazy(() => import('pages/components-overview/AddSupplier')));
const AddTrailer = Loadable(lazy(() => import('pages/components-overview/AddTrailer')));
const AddTruck = Loadable(lazy(() => import('pages/components-overview/AddTruck')));


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
      path: 'load',
      element: <LoadPage />
    },
    {
      path: 'shipper',
      element: <ShipperPage />
    },
    {
      path: 'carrier',
      element: <CarrierPage />
    },
    {
      path: 'carrierrate',
      element: <CarrierRatePage />
    },
    {
      path: 'consigne',
      element: <ConsignePage />
    },
    {
      path: 'contact',
      element: <ContactPage />
    },
    {
      path: 'customerrate',
      element: <CustomerRatePage />
    },
    {
      path: 'driver',
      element: <DriverPage />
    },
    {
      path: 'expenses',
      element: <ExpensesPage />
    },
    {
      path: 'pay',
      element: <PayPage />
    },
    {
      path: 'supplier',
      element: <SupplierPage />
    },
    {
      path: 'trailer',
      element: <TrailerPage />
    },
    {
      path: 'truck',
      element: <TruckPage />
    },
   
    //forms
    {
      path: 'addcustomer',
      element: <AddCustomer />
    },
    {
      path: 'addload',
      element: <AddLoad />
    },
    {
      path: 'addshipper',
      element: <AddShipper />
    },
    {
      path: 'addcarrier',
      element: <AddCarrier />
    },
    {
      path: 'addcarrierrate',
      element: <AddCarrierRate />
    },
    {
      path: 'addconsigne',
      element: <AddConsignee />
    },
    {
      path: 'addcontact',
      element: <AddContact />
    },
    {
      path: 'addcustomerrate',
      element: <AddCustomerRate />
    },
    {
      path: 'adddriver',
      element: <AddDriver />
    },
    {
      path: 'addexpenses',
      element: <AddExpenses />
    },
    {
      path: 'addpay',
      element: <AddPay />
    },
    {
      path: 'addsupplier',
      element: <AddSupplier />
    },
    {
      path: 'addtrailer',
      element: <AddTrailer />
    },
    {
      path: 'addtruck',
      element: <AddTruck />
    }
    
    
    
    
  ]
};

export default MainRoutes;
