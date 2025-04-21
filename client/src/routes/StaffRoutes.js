import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import StaffLayout from "../components/StaffLayout";
import StaffDashboard from "../pages/staff/Dashboard";
import { useSelector } from "react-redux";
import CategoryManager from "../pages/staff/ecm/CategoryManager";
import ProductManager from "../pages/staff/ecm/ProductManager";
import OrderManager from "../pages/staff/ecm/OrderManager";
import ProductLabelManager from "../pages/staff/ecm/ProductLabelManager";
import ServiceManager from "../pages/staff/service/ServiceManager";
import ServiceUserManager from "../pages/staff/service/ServiceUserManager";
import VoteManager from "../pages/staff/ecm/VoteManager";
import BrandManager from "../pages/staff/ecm/BrandManager";
import InformationManage from "../pages/staff/setting/InformationManage";
import AttributeManager from "../pages/staff/ecm/AttributeManager";
import ProfileManager from "../pages/staff/account/ProfileManager";
import SampleImageManager from "../pages/staff/SampleImageManager";
import RegisterSchedule from '../components/staff/calendar/RegisterSchedule';
import ViewSchedule from '../components/staff/calendar/ViewSchedule';

const StaffRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Đang tải trang...</div>; // Show a loading indicator while waiting for auth state
  }

  if (!user) {  
    return null; // Trả về null nếu không phải là customer
    // return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  console.info("===========[StaffLayout] ===========[user] : ", user);
  if (user && user.user_type !== "STAFF") {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <Routes>
      <Route
        element={<StaffLayout isAuthenticated={isAuthenticated} user={user} />}
      >
        {user && (
          // {user.role === 'Staff' && (
          <>
            <Route index element={<StaffDashboard />} />
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="ecommerce/categories" element={<CategoryManager />} />
            <Route path="ecommerce/attributes" element={<AttributeManager />} />
            <Route
              path="ecommerce/product-labels"
              element={<ProductLabelManager />}
            />
            <Route path="ecommerce/product" element={<ProductManager />} />
            <Route path="ecommerce/order" element={<OrderManager />} />
            <Route path="ecommerce/brands" element={<BrandManager />} />
            <Route path="ecommerce/vote" element={<VoteManager />} />
            <Route path="services/manage" element={<ServiceManager />} />
            <Route path="profile" element={<ProfileManager />} />

            <Route path="services/order" element={<ServiceUserManager />} />
            <Route path="setting/information" element={<InformationManage />} />
            <Route path="hairswap/manage" element={<SampleImageManager />} />
            <Route path="/services/order" element={<ServiceUserManager />} />
            <Route path="/calendar/register" element={<RegisterSchedule />} />
            <Route path="/calendar/view" element={<ViewSchedule />} />
            {/* Add other Staff-only routes here */}
          </>
        )}
        <Route index element={<StaffDashboard />} />
        {/* Staff trying to access Staff-only routes should be redirected */}
        {/*{user.role === 'staff' && (*/}
        {/*    <Route path="*" element={<Navigate to="/unauthorized" />} />*/}
        {/*)}*/}
      </Route>
    </Routes>
  );
};

export default StaffRoutes;
