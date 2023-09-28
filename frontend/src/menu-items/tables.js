// assets
import {
  UserOutlined,
  CarryOutOutlined,
  ScheduleOutlined,
  CarOutlined,
  DollarCircleOutlined,
  ProfileOutlined,
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
  ProfileOutlined,
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
  title: 'Transport Management',
  type: 'group',
  children: [
    {
      id: 'passenger-page',
      title: 'Local Passengers',
      type: 'item',
      url: '/passenger',
      icon: icons.UserOutlined,
    },
    {
      id: 'bsu-scheduling-page',
      title: 'Bus Scheduling',
      type: 'item',
      url: '/bus',
      icon: icons.CarryOutOutlined,
    },
    {
      id: 'route-page',
      title: 'Route Management',
      type: 'item',
      url: '/route',
      icon: icons.ScheduleOutlined,
    },
    
   
    {
      id: 'inspector-page',
      title: 'Inspector Details',
      type: 'item',
      url: '/inspector',
      icon: icons.CarOutlined,
    },
    {
      id: 'bus-details-page',
      title: 'Bus Details',
      type: 'item',
      url: '/busdetails',
      icon: icons.ProfileOutlined,
    },
    
  
    {
      id: 'driver-page',
      title: 'Driver Details',
      type: 'item',
      url: '/driver',
      icon: icons.UserSwitchOutlined, 
    },
    {
      id: 'expenses-page',
      title: 'Fare Revenue Analysis',
      type: 'item',
      url: '/fareRevenue',
      icon: icons.MoneyCollectOutlined,
    },
   
    
  ],
};


export default tabales;
