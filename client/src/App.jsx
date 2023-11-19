import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React,{Suspense} from 'react';

const Home = React.lazy(()=> import('./pages/Home'))
const SignIn = React.lazy(()=> import('./pages/SignIn'))
const SignUp = React.lazy(()=> import('./pages/SignUp'))
const About = React.lazy(()=> import('./pages/About'))
const Profile = React.lazy(()=> import('./pages/Profile'))
const Header = React.lazy(()=> import('./components/Header'))
const PrivateRoute = React.lazy(()=> import('./components/PrivateRoute'))
const CreateListing = React.lazy(()=> import('./pages/CreateListing'))
const UpdateListing = React.lazy(()=> import('./pages/UpdateListing'))
const Listing = React.lazy(()=> import('./pages/Listing'))
const Search = React.lazy(()=> import('./pages/Search'))
const Register = React.lazy(()=> import('./pages/Register'))
const Login = React.lazy(()=> import('./pages/Login'))
import Loader from './components/Loader'

export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<Loader/>}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/agency-login' element={<Login />} />
        <Route path='/register-agency' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
