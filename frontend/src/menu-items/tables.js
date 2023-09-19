// assets
import {
  UserOutlined,
  CarryOutOutlined,
  ScheduleOutlined,
  CarOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  ContactsOutlined,
  TeamOutlined,
  MoneyCollectOutlined,
  SolutionOutlined,
  ClusterOutlined,
  ShopOutlined,
  ControlOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';

// icons
const icons = {
  UserOutlined,
  CarryOutOutlined,
  ScheduleOutlined,
  CarOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  ContactsOutlined,
  TeamOutlined,
  MoneyCollectOutlined,
  SolutionOutlined,
  ClusterOutlined,
  ShopOutlined,
  ControlOutlined,
  UserSwitchOutlined
};



const tabales = {
  id: 'tables',
  title: 'Tables',
  type: 'group',
  children: [
    {
      id: 'customer-page',
      title: 'Customer',
      type: 'item',
      url: '/customer',
      icon: icons.UserOutlined,
    },
    {
      id: 'load-page',
      title: 'Load',
      type: 'item',
      url: '/load',
      icon: icons.CarryOutOutlined,
    },
    {
      id: 'shipper-page',
      title: 'Shipper',
      type: 'item',
      url: '/shipper',
      icon: icons.ScheduleOutlined,
    },
    // New pages
    {
      id: 'carrier-page',
      title: 'Carrier',
      type: 'item',
      url: '/carrier',
      icon: icons.CarOutlined,
    },
    {
      id: 'carrier-rate-page',
      title: 'Carrier Rate',
      type: 'item',
      url: '/carrierrate',
      icon: icons.DollarCircleOutlined,
    },
    {
      id: 'consigne-page',
      title: 'Consigne',
      type: 'item',
      url: '/consigne',
      icon: icons.FileTextOutlined,
    },
    {
      id: 'contact-page',
      title: 'Contact',
      type: 'item',
      url: '/contact',
      icon: icons.ContactsOutlined,
    },
    {
      id: 'customer-rate-page',
      title: 'Customer Rate',
      type: 'item',
      url: '/customerrate',
      icon: icons.TeamOutlined,
    },
    {
      id: 'driver-page',
      title: 'Driver',
      type: 'item',
      url: '/driver',
      icon: icons.UserSwitchOutlined, 
    },
    {
      id: 'expenses-page',
      title: 'Expenses',
      type: 'item',
      url: '/expenses',
      icon: icons.MoneyCollectOutlined,
    },
    {
      id: 'pay-page',
      title: 'Pay',
      type: 'item',
      url: '/pay',
      icon: icons.DollarCircleOutlined,
    },
    {
      id: 'supplier-page',
      title: 'Supplier',
      type: 'item',
      url: '/supplier',
      icon: icons.SolutionOutlined,
    },
    {
      id: 'trailer-page',
      title: 'Trailer',
      type: 'item',
      url: '/trailer',
      icon: icons.ClusterOutlined,
    },
    {
      id: 'truck-page',
      title: 'Truck',
      type: 'item',
      url: '/truck',
      icon: icons.ShopOutlined, 
    },
    
  ],
};


export default tabales;
