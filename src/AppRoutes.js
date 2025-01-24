import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/home-page/Home';
import VideoPlayer from './component/VideoPlayerBar/VideoPlayer';
import Layout from './routes/layout-page/Layout';
import Category from './routes/category-page/Category';
import Account from './routes/account-page/Account';
import CancelAccount from './routes/cancel-account-page/CancelAccount';
import CancelReason from './routes/cancel-reason-page/CancelReason';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import config from './config';
import { useLocation } from 'react-router-dom';
// import Loader from './constant/LoadingBar/Loader';
import AllFaveorites from './routes/favorite-all-page/AllFaveorites';
import CalenderView from './component/ScheduleBar/CalendarView';
import AllInstructors from './routes/instructor-page/AllInstructors';
import SingleInstructor from './routes/single-instructor-page/SingleInstructor';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Scroll to top when the pathname changes

  return null;
};

const redirectToLogin = () => {
  const currentHost = window.location.origin;
  window.location.href = `${currentHost}/login?redirect_to=${currentHost}/vod-ios2`;
};

const ProtectedRoute = ({ component: Component }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = sessionStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const initialLoadRef = useRef(true);


  // UserData Fetch
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${config.apiURL}admin-ajax.php?action=get_self`
        );

        if (response.data.success && response.data.data.active) {
          sessionStorage.setItem(
            'userData',
            JSON.stringify(response.data.data)
          );
          setUserInfo(response.data.data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo && initialLoadRef.current) {
      fetchUserData();
    } else {
      setLoading(false);
    }
    initialLoadRef.current = false;
  }, [userInfo]);

  // Show a loading state while verifying the session
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user info or user has an invalid ID or is inactive, redirect
  if (!userInfo || userInfo.ID === 0 || !userInfo.active) {
    redirectToLogin();
    return null;
  }

  // If the user is authenticated, render the protected component
  return <Component />;
};

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={Home} />
            </>
          ),
        },

        {
          path: 'allFavorites',
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={AllFaveorites} />
            </>
          ),
        },
        {
          path: 'instructors',
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={AllInstructors} />
            </>
          ),
        },
        {
          path: 'instructors/:instructorName',
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={SingleInstructor} />
            </>
          ),
        },
        {
          path: 'category/:id',
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={Category} />
            </>
          ),
        },
        {
          path: 'category/:id/instructor/:instructorId',
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={Category} />
            </>
          ),
        },
        {
          path: 'category/:id/duration/:duration',
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={Category} />
            </>
          ),
        },
        {
          path: 'schedule',
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={CalenderView} />
            </>
          ),
        },
        {
          path: 'category/:id/instructor/:instructorId/duration/:duration',
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={Category} />
            </>
          ),
        },
      ],
    },
    {
      path: 'video/:id',
      element: (
        <>
          <ScrollToTop />
          <ProtectedRoute component={VideoPlayer} />
        </>
      ),
    },
    {
      path: 'account',
      element: (
        <>
          <ScrollToTop />
          <ProtectedRoute component={Account} />
        </>
      ),
    },
    {
      path: 'account/cancel',
      element: (
        <>
          <ScrollToTop />
          <ProtectedRoute component={CancelAccount} />
        </>
      ),
    },
    {
      path: 'account/cancel/reason',
      element: (
        <>
          <ScrollToTop />
          <ProtectedRoute component={CancelReason} />
        </>
      ),
    },
  ],
  {
    basename: '/vod-ios2',
  }
);
