import {
  UserOutlined,
  CarryOutOutlined,
  ScheduleOutlined,
  CarOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  ContactsOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  DollarOutlined,
  SolutionOutlined,
  ClusterOutlined,
  ShopOutlined
} from '@ant-design/icons';

const icons = {
  UserOutlined,
  CarryOutOutlined,
  ScheduleOutlined,
  CarOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  ContactsOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  MoneyCollectOutlined,
  DollarOutlined,
  SolutionOutlined,
  ClusterOutlined,
  ShopOutlined
};

const forms = {
  id: 'forms',
  title: 'Forms',
  type: 'group',
  children: [
    {
      id: 'util-addcustomer',
      title: 'Add Customer',
      type: 'item',
      url: '/addcustomer',
      icon: icons.UserOutlined
    },
    {
      id: 'util-addload',
      title: 'Add Load',
      type: 'item',
      url: '/addload',
      icon: icons.CarryOutOutlined
    },
    {
      id: 'util-addshipper',
      title: 'Add Shipper',
      type: 'item',
      url: '/addshipper',
      icon: icons.ScheduleOutlined
    },
    {
      id: 'util-addcarrier',
      title: 'Add Carrier',
      type: 'item',
      url: '/addcarrier',
      icon: icons.CarOutlined
    },
    {
      id: 'util-carrierrate',
      title: 'AddCarrier Rate',
      type: 'item',
      url: '/addcarrierrate',
      icon: icons.DollarCircleOutlined
    },
    {
      id: 'util-addconsigne',
      title: 'Add Consigne',
      type: 'item',
      url: '/addconsigne',
      icon: icons.FileTextOutlined
    },
    {
      id: 'util-addcontact',
      title: 'Add Contact',
      type: 'item',
      url: '/addcontact',
      icon: icons.ContactsOutlined
    },
    {
      id: 'util-customerrate',
      title: 'Add Customer Rate',
      type: 'item',
      url: '/addcustomerrate',
      icon: icons.TeamOutlined
    },
    {
      id: 'util-adddriver',
      title: 'Add Driver',
      type: 'item',
      url: '/adddriver',
      icon: icons.UserSwitchOutlined
    },
    {
      id: 'util-addexpenses',
      title: 'Add Expenses',
      type: 'item',
      url: '/addexpenses',
      icon: icons.MoneyCollectOutlined
    },
    {
      id: 'util-addpay',
      title: 'Add Pay',
      type: 'item',
      url: '/addpay',
      icon: icons.DollarCircleOutlined
    },
    {
      id: 'util-addsupplier',
      title: 'Add Supplier',
      type: 'item',
      url: '/addsupplier',
      icon: icons.SolutionOutlined
    },
    {
      id: 'util-addtrailer',
      title: 'Add Trailer',
      type: 'item',
      url: '/addtrailer',
      icon: icons.ClusterOutlined
    },
    {
      id: 'util-addtruck',
      title: 'Add Truck',
      type: 'item',
      url: '/addtruck',
      icon: icons.ShopOutlined
    }
  ]
};

export default forms;
