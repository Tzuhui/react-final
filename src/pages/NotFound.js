import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigation = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigation('/');
    }, 1000);
  });

  return (
    <div className="py-5 text-center h1 text-gray">
      404 頁面不存在
    </div>
  );
}

export default NotFound;
