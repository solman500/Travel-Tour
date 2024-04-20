import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "./../context/AuthContext.jsx";
import {BASE_URL} from "./../utils/config.js";
// import { useHistory } from "react-router-dom";



const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  // const history = useHistory();
  const [credentials, setcredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
  });



  const handleChange = (e) => {
    setcredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (!res.ok) alert(result.message);

      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login")
      // history.push("/login");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.message });
  
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder="UserName"
                      required
                      id="username"
                      // className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      // className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      // className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                  {/* <p className="dont__have__account">Don't have an account?</p> */}
                </Form>
                <p className="forgot__password">
                  Already have an account ?<Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
