import { FaCartPlus, FaEnvelopeOpenText } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { IoIosPaper, IoMdPeople, IoMdHelpCircle } from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
    cName: 'nav-text'
  },
  localStorage.getItem('userRole') == 2 ? {
    title: 'Upload Photo',
    path: '/uploadphoto',
    icon: <AiFillHome />,
    cName: 'nav-text'
  } : null, 
  localStorage.getItem('userRole') ==0 ? {
    title: 'Photographer proposal',
    path: '/photographer_proposal',
    icon: <AiFillHome />,
    cName: 'nav-text'
  } : null, 

  {
    title: 'Search photographers',
    path: '/photographerslist',
    icon: <IoIosPaper />,
    cName: 'nav-text'
  },

  {
    title: 'AllCollection',
    path: '/allcollection',
    icon: <IoIosPaper />,
    cName: 'nav-text'
  },

  {
    title: 'Outdoor',
    path: '/outdoor',
    cName: 'nav-text'
  },

  {
    title: 'Sports',
    path: '/sport',
    cName: 'nav-text'
  },

  {
    title: 'Farmer',
    path: '/farmer',
    cName: 'nav-text'
  },

  
  {
    title: 'Ideology',
    path: '/ideology',
    cName: 'nav-text'
  },

  


  {
    title: 'Family',
    path: '/family',
    icon: <IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Food',
    path: '/food',
    icon: <FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Doctor',
    path: '/doctor',
    icon: <IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Couple',
    path: '/couple',
    icon: <FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Jewelry',
    path: '/jewelry',
    icon: <IoMdHelpCircle />,
    cName: 'nav-text'
  },

  {
    title: 'Wedding',
    path: '/wedding',
    cName: 'nav-text'
  },
  
  {
    title: 'Festivals',
    path: '/festivals',
    cName: 'nav-text'
  },
  
  {
    title: 'Culture',
    path: '/culture',
    cName: 'nav-text'
  },
  
  {
    title: 'Kitchen',
    path: '/kitchen',
    cName: 'nav-text'
  },
  
  {
    title: 'Students',
    path: '/students',
    cName: 'nav-text'
  },
  
  {
    title: 'Computer',
    path: '/computer',
    cName: 'nav-text'
  },
  
 
  {
    title: 'Travel',
    path: '/travel',
    cName: 'nav-text'
  },

  
  {
    title: 'Shopping',
    path: '/shopping',
    cName: 'nav-text'
  },


  {
    title: 'Religion',
    path: '/religion',
    cName: 'nav-text'
  },


  {
    title: 'Traditions',
    path: '/traditions',
    cName: 'nav-text'
  },

 {
    title: 'Wedding',
    path: '/wedding',
    cName: 'nav-text'
  },


  {
    title: 'People',
    path: '/people',
    cName: 'nav-text'
  },

  {
    title: 'Agriculture',
    path: '/agriculture',
    cName: 'nav-text'
  },
  {
    title: 'Photography',
    path: '/photography',
    cName: 'nav-text'
  },







  {
    title: 'photographer',
    path: '/photographer',
    cName: 'nav-text'
  },

  {
    title: 'Boyes Images',
    path: '/boys',
    cName: 'nav-text'
  },
  
  
  




].filter(item => item !== null);

