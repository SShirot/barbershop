import React, {useEffect, useState} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../pages/admin/Dashboard';
import {useSelector} from 'react-redux';
import UserManager from "../pages/admin/account/UserManager";
import MenuManager from "../pages/admin/news/MenuManager";
import CategoryManager from "../pages/admin/ecm/CategoryManager";
import ProductManager from "../pages/admin/ecm/ProductManager";
import OrderManager from "../pages/admin/ecm/OrderManager";
import TagManager from "../pages/admin/news/TagManager";
import ArticleManager from "../pages/admin/news/ArticleManager";
import ProductLabelManager from "../pages/admin/ecm/ProductLabelManager";
import SlideManager from "../pages/admin/slide/SlideManager";
import ProfileManager from "../pages/admin/account/ProfileManager";
import ServiceManager from "../pages/admin/service/ServiceManager";
import ServiceUserManager from "../pages/admin/service/ServiceUserManager";
import VoteManager from "../pages/admin/ecm/VoteManager";
import BrandManager from "../pages/admin/ecm/BrandManager";
import InformationManage from "../pages/admin/setting/InformationManage";
import AttributeManager from "../pages/admin/ecm/AttributeManager";
import CalendarView from '../pages/admin/calendar/CalendarView';
import StaffRegisterView from '../pages/admin/calendar/StaffRegisterView';

const AdminRoutes = () => {
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
  
    console.info("===========[AdminLayout] ===========[user] : ", user);
    if (user && user.user_type !== "ADMIN") {
      return <Navigate to="/unauthorized" />;
    }
    return (
        <Routes>
            <Route element={<AdminLayout isAuthenticated={isAuthenticated} user={user} />}>
                {user && (
                // {user.role === 'admin' && (
                    <>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="user" element={<UserManager />} />
                        <Route path="news/menus" element={<MenuManager />} />
                        <Route path="news/tags" element={<TagManager />} />
                        <Route path="news/articles" element={<ArticleManager />} />
                        <Route path="ecommerce/categories" element={<CategoryManager />} />
                        <Route path="ecommerce/attributes" element={<AttributeManager />} />
                        <Route path="ecommerce/product-labels" element={<ProductLabelManager />} />
                        <Route path="ecommerce/product" element={<ProductManager />} />
                        <Route path="ecommerce/order" element={<OrderManager />} />
                        <Route path="ecommerce/brands" element={<BrandManager />} />
                        <Route path="ecommerce/vote" element={<VoteManager />} />
                        <Route path="services/manage" element={<ServiceManager />} />
                        <Route path="services/order" element={<ServiceUserManager />} />
                        <Route path="slides" element={<SlideManager />} />
                        <Route path="profile" element={<ProfileManager />} />
                        <Route path="setting/information" element={<InformationManage />} />
                        <Route path="calendar/manage" element={<CalendarView />} />
                        <Route path="calendar/staff-register" element={<StaffRegisterView />} />
                        {/* Add other admin-only routes here */}
                    </>
                )}
                <Route index element={<AdminDashboard />} />
                
                {/*{user.role === 'staff' && (*/}
                {/*    <Route path="*" element={<Navigate to="/unauthorized" />} />*/}
                {/*)}*/}
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
