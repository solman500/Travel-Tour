import React, { useContext, useRef } from "react";
import "./Header.css";
import { Container, Row } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthContext.jsx";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
const menuRef=useRef(null);


  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  const headerRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (headerRef.current) {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          headerRef.current.classList.add("sticky__header");
        } else {
          headerRef.current.classList.remove("sticky__header");
        }
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);


  const toggleMenu=()=> menuRef.current.classList.toggle("show__menu")
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to="/home">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="navigation" ref={menuRef} id="menuBtn" onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : "nav__link"
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right  d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4 ">
                {user ? (
                  <>
                    <h5 className="mb-0 ms-2 text-xs  ">Welcome: {user.data?.username}</h5>
                    <button className="btn btn-dark" onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </button>
                  </>
                )}
              </div>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
