import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HiringForm from './customer/HiringForm';
// import UploadScreen from './customer/uploadPhoto';
import UploadScreen from './customer/uploadPhoto';
import ReadAllHiringRequests from './customer/ReadAllHiringRequests';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PopularSearches from './components/PopularSearches';
import ImageGallery from './components/ImageGallery';
//               
import Agriculture from './pages/Agriculture';
import AllCollection from './pages/AllCollection';
import Computer from './pages/Computer';
import Couple from './pages/Couple';
import Culture from './pages/Culture';
import Doctor from './pages/Doctor';
import Family from './pages/Family';
import Farmer from './pages/Farmer';
import Festivals from './pages/Festivals';
import Food from './pages/Food';
import Ideology from './pages/Ideology';
import Jewelry from './pages/Jewelry';
import Kitchen from './pages/Kitchen';
import Outdoor from './pages/Outdoor';
import People from './pages/People';
import Religion from './pages/Religion';
import Shopping from './pages/Shopping';
import Sports from './pages/Sports';
import Students from './pages/Students';
import Traditions from './pages/Traditions';
import Travel from './pages/Travel';
import Wedding from './pages/Wedding';
import Photography from './pages/Photography';
import Rates from './lists/Rates';
import Register from './pages/Register';
import Login from './Login/Login';
import LoginRegistration from './Login/LoginRegistration';
import OrderPage from './order/OrderPage';
import AboutUs from './footerinfo/AboutUs';
import WishList from './footerinfo/WishList';
import AdminReadAllRequests from './adminaction/AdminReadAllHiringRequests';
import UserListForm from './adminaction/UserListForm';
import AdminAllCollection from './adminaction/AdminAllCollection';
import AdminHome from './admin-dashboard/AdminHome';
import DownloadingInfo from './footerinfo/DownloadingInfo';
import Success from './order/Success';
import Cancel from './order/Cancel';
import Boys from './pages/Boys';
import Girls from './pages/Girls';
import PhotographerForm from './photographer/PhotographerForm';
import Photographersuccess from './photographer/Photographersuccess';
import Photographersubmittedrequest from './photographer/photographersubmittedrequest';
import Photographers from './customer/photographers'
import PhotographerAllPhotos from './customer/photographerPhotos'
import AllPhotographerRequest from './adminaction/AllPhotographerRequest';

// import Agriculture2 from './pages/Agriculture2';

function App() {

  const location = useLocation();
  const hidePopularSearchPages = ['/upload', '/rates','/login','/register','/AboutUs','/admindashboard','/adminitemaction','/adminalluser','/adminapprove','/adminphotographerrequests'];
  const isPopularSearchVisible = !hidePopularSearchPages.includes(location.pathname);
  const hideNavbarOnPages = ['/upload',  '/login', '/register','/admindashboard','/adminitemaction','/adminalluser','/adminapprove','/adminphotographerrequests'];
  const isNavbarVisible = !hideNavbarOnPages.includes(location.pathname);
  const hideFooterOnPages = ['/upload',  '/ogin', '/register','/admindashboard','/adminitemaction','/adminalluser','/adminapprove','/adminphotographerrequests'];
  const isFooterVisible = !hideFooterOnPages.includes(location.pathname);

  const isAdminAuthorized = () => {
    // Assuming you have some authentication logic here
    const userRole = localStorage.getItem('userRole');
    return userRole === '1';
  };



  return (
    

      <>
        {isNavbarVisible && <Navbar />}

        <Routes>
      
          <Route path="/" element={<ImageGallery />} />

          <Route path="/hire" element={<HiringForm />} />
          <Route path="/uploadphoto" element={<UploadScreen />} />
          <Route path="/photographerslist" element={<Photographers />} />
          <Route path="/photographerAllPhotos/:photographerId" element={<PhotographerAllPhotos />} />

          <Route path="/hiringrequests" element={<ReadAllHiringRequests />} />

          {/*catagoury routers  */}

          {/* <Route path='/ag2' element={<Agriculture2/>} /> */}
          <Route path='/agriculture' element={<Agriculture/>} />
          <Route path='/allcollection' element={<AllCollection/>}  />
          <Route path='/computer' element={<Computer/>} />
          <Route path='/couple' element={<Couple/>} />
          <Route path='/culture' element={<Culture/>}/>
          <Route path='/doctor' element={<Doctor/>} />
          <Route path='family' element={< Family/>}/>
          <Route path='farmer' element={<Farmer/>} />
          <Route path='festivals' element={<Festivals/>} />
          <Route path='food' element={<Food/>} />
          <Route path='ideology' element={<Ideology/>} />
          <Route path='jewelry' element={<Jewelry/>} />
          <Route path='kitchen' element={<Kitchen/>} />
          <Route path='outdoor' element={<Outdoor/>} />
          <Route path='people' element={<People/>} />
          <Route path='photography' element={<Photography/>} />
          <Route path='religion' element={<Religion/>} />
          <Route path='shopping' element={<Shopping/>} />
          <Route path='sport' element={<Sports/>} />
          <Route path='students' element={<Students/>} />
          <Route path='traditions' element={<Traditions/>} />
          <Route path='travel' element={<Travel/>} />
          <Route path='wedding' element={<Wedding/>} />
          <Route path='boys' element={<Boys/>} />
          <Route path='girls' element={<Girls/>} />

         


          {/* about us routers  */}

          <Route path='rates' element={<Rates/>} />
          <Route path='/AboutUs' element={<AboutUs/>} />
          <Route path ='/wishlist' element={<WishList/>} />
          <Route path ='/downloadinginfo' element={<DownloadingInfo/>} />


          
          

         {/* uploading routes  */}

         <Route path='/upload' element={<Register />} />

         {/* registration routers */}


         <Route path='/login' element={<Login />} />
         <Route path='/register' element={<LoginRegistration/>} />


         {/* show order router details  */}

         <Route path='/orders' element={<OrderPage/>} />
         <Route path='/success' element={<Success/>} />
         <Route path='/cancle' element={<Cancel/>} />




         {/* Admin Action form Routers */}

         {isAdminAuthorized() &&<Route path='/adminapprove' element={<AdminReadAllRequests/>} /> }

        {isAdminAuthorized() && <Route path='/adminalluser' element={<UserListForm/>} /> } 
         
         {isAdminAuthorized() && <Route path="/admindashboard" element={<AdminHome />} />}
         {isAdminAuthorized() && <Route path='/adminitemaction' element={<AdminAllCollection/>} />}
         {isAdminAuthorized() &&<Route path='/adminphotographerrequests' element={<AllPhotographerRequest/>} />}


      




                    {/* show photographers  router details  */}

        <Route path='/photographer_proposal' element={<PhotographerForm/>} />
        <Route path='/photographer_success' element={<Photographersuccess/>} />
        <Route path='/allreadyregister' element={<Photographersubmittedrequest/>} />
       
        



        








         
          



         
          








        </Routes>



        {isPopularSearchVisible && <PopularSearches />}
        {isFooterVisible && <Footer />}
        


        
      </>
      

  );
}

export default App;
