import React from 'react';
import {Outlet, Route, Routes, NavLink,Link} from "react-router-dom";
import HomePage from "./pages/home_page.jsx";
import AuthPage from "./pages/Auth_page.jsx";
import Profile from "./pages/profile_page.jsx";

const categories = ['Reading', 'Writing', 'Listening', 'Speaking']

const Layout = () => {
    return (
        <div>
            <header>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/auth"> Log in </NavLink>
            </header>
            <Outlet/>
            <footer> f</footer>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/auth" element={<AuthPage/>}/>
                    <Route path="/profile" element={<Profile/>} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;