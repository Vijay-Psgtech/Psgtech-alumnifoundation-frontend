import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ScrolltoTop from "./ScrolltoTop";

const Layout = () => (
  <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
    <ScrolltoTop/>
    <NavBar/>
    <main style={{flex:1}}>
      <Outlet/>
    </main>
    <Footer/>
  </div>
);
export default Layout;