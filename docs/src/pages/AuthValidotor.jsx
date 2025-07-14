// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout, setUser } from '@/redux/authSlice';
// import { ADMIN_API_END_POINT, CUSTOMER_API_END_POINT } from '@/Utils/constant';
// import axios from "../Utils/axios.js";

// const AuthValidotor = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         // Try customer first
//         const res = await axios.get(`${CUSTOMER_API_END_POINT}/me`);
//         dispatch(setUser(res.data.user));
//       } catch (customerErr) {
//         try {
//           // If not customer, try admin
//           const res = await axios.get(`${ADMIN_API_END_POINT}/me`);
//           dispatch(setUser(res.data.user));
//         } catch (adminErr) {
//           console.error("Auth failed:", adminErr);
//           console.error("Auth failed:", customerErr);
//           dispatch(logout());
//           navigate("/login");
//         }
//       }
//     };

//     validateToken();
//   }, [dispatch]);

//   return null;
// };

// export default AuthValidotor;
