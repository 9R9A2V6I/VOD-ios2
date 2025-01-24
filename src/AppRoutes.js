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
import { useLocation } from 'react-router-dom';
import Loader from './constant/LoadingBar/Loader';
import AllFaveorites from './routes/favorite-all-page/AllFaveorites';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Scroll to top when the pathname changes

  return null;
};

const redirectToLogin = () => {
  window.location.href =
    'https://vodv3.ipstudio.co/login?redirect_to=https://vodv3.ipstudio.co/vod-ios';
};

const ProtectedRoute = ({ component: Component }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = sessionStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'https://vodv3.ipstudio.co/wp-admin/admin-ajax.php?action=get_self'
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

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!userInfo || userInfo.ID === 0 || !userInfo.active) {
    redirectToLogin();
    return null;
  }

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
          path: 'video/:id',
          element: (
            <>
              <ScrollToTop />
              <ProtectedRoute component={VideoPlayer} />
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
    basename: '/vod-ios',
  }
);
