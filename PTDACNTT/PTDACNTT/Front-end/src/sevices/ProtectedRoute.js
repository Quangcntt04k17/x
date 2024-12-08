import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('access_token'); // Kiểm tra xem có token trong localStorage

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, điều hướng về trang đăng nhập
    return <Navigate to="/dangNhap" />;
  }

  // Nếu đã đăng nhập, render component
  return element;
};

export default ProtectedRoute;