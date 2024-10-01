import "./App.css";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LayoutProvider } from "./Components/Layout/LayoutContext/LayoutContext";
import MainLayout from "./Components/Layout/LayoutContext/MainLayout";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute/ProtectedRoute";
import Loading from "./Components/Loading/Loading";
import DashboardLayout from "./Components/Layout/DashboardLayout/DashboardLayout";
import AdditionalLayout from "./Components/Layout/AdditionalLayout/AdditionalLayout";
import MessageModal from "./Components/Dashboard/Message/MessageModal";
import LanguageSwitch from "./Components/Language/langSwitch";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";

// Lazy-loaded components
const Home = lazy(() => import("./Components/Home/Home"));
const Register = lazy(() =>
  import("./Components/Authentication/Register/Register")
);
const Login = lazy(() => import("./Components/Authentication/Login/Login"));
const ForgetPassword = lazy(() =>
  import("./Components/Authentication/ForgetPassword/ForgetPassword")
);
const DashBoard = lazy(() => import("./Components/Dashboard/Dashboard"));
const MyGift = lazy(() => import("./Components/Dashboard/MyGiftData/MyGift"));
const MyStory = lazy(() =>
  import("./Components/Dashboard/MySuccessStory/MyStory")
);
const MyInterest = lazy(() =>
  import("./Components/Dashboard/MyInterest/MyInterest")
);
const Message = lazy(() => import("./Components/Dashboard/Message/Message"));
const MyFavorites = lazy(() =>
  import("./Components/Dashboard/MyFavorites/MyFavorites")
);
const MyMatch = lazy(() => import("./Components/Dashboard/MyMatches/MyMatch"));
const SearchData = lazy(() =>
  import("./Components/Dashboard/SearchData/Search")
);
const Interested = lazy(() =>
  import("./Components/Dashboard/RecentActivity/InterestedInMe")
);
const Viewed = lazy(() =>
  import("./Components/Dashboard/RecentActivity/ViewedMyProfile")
);
const TheirFavourite = lazy(() =>
  import("./Components/Dashboard/RecentActivity/TheirFavourate")
);
const ProfileViewed = lazy(() =>
  import("./Components/Dashboard/MyProfile/MyProfileView")
);
const BlockList = lazy(() =>
  import("./Components/Dashboard/ActiveFromMe/BlockList")
);
const AddTrip = lazy(() => import("./Components/Dashboard/TripPages/AddTrip"));
const MyTrip = lazy(() => import("./Components/Dashboard/TripPages/MyTrip"));
const SearchTrip = lazy(() =>
  import("./Components/Dashboard/TripPages/SearchTrip")
);
const Credit = lazy(() => import("./Components/Dashboard/Credit/Credit"));
const ProfileDetails = lazy(() =>
  import("./Components/Dashboard/MyProfile/ProfileDetails")
);
const MyProfile = lazy(() =>
  import("./Components/Dashboard/MyProfile/MyProfile")
);
const EditProfileData = lazy(() =>
  import("./Components/Dashboard/MyProfile/EditProfileData")
);
const StripePayment = lazy(() =>
  import("./Components/Dashboard/PaymentGateway/StripePayment")
);
const FooterDetails = lazy(() =>
  import("./Components/Layout/Footer/FooterDetails")
);
const Feedback = lazy(() => import("./Components/Home/child/Feedback"));
const FAQ = lazy(() => import("./Components/Home/child/Faq"));
const Contact = lazy(() => import("./Components/Home/child/Contact"));
const UserProfile = lazy(() =>
  import("./Components/Dashboard/UserProfileView/UserProfile")
);
const TripDetails = lazy(() =>
  import("./Components/Dashboard/TripPages/TripDetails")
);
const EditTrip = lazy(() =>
  import("./Components/Dashboard/TripPages/EditTrip")
);
const NotificationList = lazy(() =>
  import("./Components/Notification/NotificationList")
);
const BillingList = lazy(() =>
  import("./Components/Dashboard/PaymentGateway/BillingList")
);
const GiftPayment = lazy(() =>
  import("./Components/Dashboard/UserProfileView/GiftPayment")
);
const PaymentSuccess = lazy(() =>
  import("./Components/Dashboard/PaymentGateway/PaymentSuccess")
);

const routes = [
  { path: "/", element: <Home />, layout: MainLayout },
  { path: "/register", element: <Register />, layout: MainLayout },
  { path: "/login", element: <Login />, layout: MainLayout },
  { path: "/forget-password", element: <ForgetPassword />, layout: MainLayout },
  {
    path: "/dashboard",
    element: <DashBoard />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/my-gift",
    element: <MyGift />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/my-story",
    element: <MyStory />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/my-interest",
    element: <MyInterest />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/message",
    element: <Message />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/message/chat/:chat_token/:userId",
    element: <Message />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/my-favourite",
    element: <MyFavorites />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/my-matches",
    element: <MyMatch />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/search",
    element: <SearchData />,
    layout: AdditionalLayout,
    protected: true,
  },
  {
    path: "/search-trip",
    element: <SearchTrip />,
    layout: AdditionalLayout,
    protected: true,
  },
  {
    path: "/interested-in-me",
    element: <Interested />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/viewed-my-profile",
    element: <Viewed />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/their-favourite",
    element: <TheirFavourite />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/my-profile-view",
    element: <ProfileViewed />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/block-list",
    element: <BlockList />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/add-trip",
    element: <AddTrip />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/my-trip",
    element: <MyTrip />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/trip-details/:trip_id",
    element: <TripDetails />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/edit-trip/:trip_id",
    element: <EditTrip />,
    layout: DashboardLayout,
    protected: false,
  },
  {
    path: "/details",
    element: <ProfileDetails />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/message_plan",
    element: <Credit />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/my-profile/edit/:name",
    element: <EditProfileData />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/checkout/:plan_id",
    element: <StripePayment />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/cms",
    element: <FooterDetails />,
    layout: MainLayout,
    protected: false,
  },
  {
    path: "/feedback",
    element: <Feedback />,
    layout: MainLayout,
    protected: false,
  },
  { path: "/faq", element: <FAQ />, layout: MainLayout, protected: false },
  {
    path: "/contact",
    element: <Contact />,
    layout: MainLayout,
    protected: false,
  },
  {
    path: "/public-profile/:profile_user_id",
    element: <UserProfile />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/notification",
    element: <NotificationList />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/billing",
    element: <BillingList />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/send-gift/:giftId/:profileId/:gift_name",
    element: <GiftPayment />,
    layout: DashboardLayout,
    protected: true,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
    layout: DashboardLayout,
    protected: true,
  },
];

const App = () => {
  const [show, setShow] = useState(false);
  
  const [showMessageBox, setShowMessageBox] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setShowMessageBox(true);
    }
    
  }, [show]);

  const ShowMessageField = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

 

  return (
    <Router>
      <LayoutProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="*" element={<LanguageSwitch />} />
              {routes.map(
                ({
                  path,
                  element,
                  layout: LayoutComponent,
                  protected: isProtected,
                }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <LayoutComponent>
                        {isProtected ? (
                          <ProtectedRoute>{element}</ProtectedRoute>
                        ) : (
                          element
                        )}
                      </LayoutComponent>
                    }
                  />
                )
              )}
            </Routes>
          </Suspense>
        </ErrorBoundary>

        <div id="backtotop" className="visible">
          <a href="#"></a>
        </div>
        {showMessageBox && (
          <a
            onClick={ShowMessageField}
            title="Chat"
            className="chat-open chat-open-click d-none d-lg-block"
          >
            <i className="bi bi-chat-quote-fill"></i>
          </a>
        )}
        {show && <MessageModal onClose={handleClose} setShow={setShow} />}
      </LayoutProvider>
    </Router>
  );
};

export default App;
