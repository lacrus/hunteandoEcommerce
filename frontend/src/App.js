import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

// COMPONENTES
import AppBar from "./components/AppBar/AppBar";
import HomePage from "./components/Home/Home";

import NavigateToTop from "./hooks/NavigateToTop/NavigateToTop";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart.jsx";
// import { Products } from "./containers/Products";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Footer from "./components/Footer/Footer";
import BotonWapp from "./components/BotonWapp/BotonWapp";
import DashboardUsuario from "./components/Dashboard/DashboardUsuario/DashboardUsuario";
import DashboardAdmin from "./components/Dashboard/DashboardAdmin/DashboardAdmin";
import { logearToken, cerrarSesion } from "./redux/actions/actionsLogin";
import { obtenerCarrito } from "./redux/actions/actionsCart";
import CheckOut from "./components/CheckOut/CheckOut";
import CheckoutConfirmation from "./components/CheckOut/CheckoutConfirmation/CheckoutConfirmation";
import CheckoutCancel from "./components/CheckOut/CheckoutCancel/CheckoutCancel";
import CheckoutPending from "./components/CheckOut/CheckoutPending/CheckoutPending";
import Tienda from "./components/Tienda/Tienda";
import CambioContrasena from "./components/CambioContrasena/CambioContrasena";
import Contactame from "./components/Contactame/Contactame";

function App() {
  const usuario = useSelector((e) => e.general.usuario);
  const productosCarrito = useSelector((e) => e.carro.carro?.CartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && !usuario.username) {
          const dataUser = await dispatch(logearToken(token));
          await dispatch(obtenerCarrito(dataUser.payload.id, token));
        }
      } catch (e) {
        console.log("app.js entro en error", e);
        localStorage.removeItem("token");
        await dispatch(cerrarSesion());
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <NavigateToTop />
      <AppBar usuario={usuario} />
      <Routes>
        <Route path="/" element={<HomePage usuario={usuario} />} />
        <Route
          path="/login"
          element={usuario.username ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/login/:id"
          element={usuario.username ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/registrarse"
          element={usuario.username ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/tienda" element={<Tienda />} />
        <Route
          path="/tienda/detalles/:id"
          element={<ProductDetail usuario={usuario} />}
        />
        <Route
          path="/carrito"
          element={
            usuario.username ? (
              <Cart usuario={usuario} />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        {/* <Route path="/productos" element={<Products />} /> */}
        <Route
          path="/dashboard/admin"
          element={
            usuario.role === "admin" || usuario.role === "superAdmin" ? (
              <DashboardAdmin usuario={usuario} />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/dashboard/client"
          element={
            usuario.username ? (
              <DashboardUsuario usuario={usuario} />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/finalizarcompra"
          element={
            usuario.username && productosCarrito?.length ? (
              <CheckOut usuario={usuario} />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/checkout/confirmation"
          element={<CheckoutConfirmation usuario={usuario} />}
        />
        <Route
          path="/checkout/pending"
          element={<CheckoutPending usuario={usuario} />}
        />
        <Route
          path="/checkout/cancel"
          element={<CheckoutCancel usuario={usuario} />}
        />

        <Route
          path="/CambiarContrasena/:token"
          element={<CambioContrasena />}
        />

        <Route path="/contactame" element={<Contactame />} />

        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      <Footer />
      <BotonWapp />
    </BrowserRouter>
  );
}

export default App;
