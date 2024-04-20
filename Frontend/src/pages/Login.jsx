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

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "./../context/AuthContext.jsx";
import { BASE_URL } from "./../utils/config.js";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setcredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async(e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try{

      const res=await fetch(`${BASE_URL}/auth/login`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include', // to send cookies in the request header
        body:JSON.stringify(credentials)
      })
     const  result= await res.json()
     if(!res.ok)alert(result.message)
      dispatch({type:"LOGIN_SUCCESS",payload:result})
        navigate('/')
    }catch(err){
      dispatch({type:"LOGIN_FAILURE",payload:err.message})
    }

    
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <Input
                      type="email"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                      id="email"
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
                </Form>

                <p className="forgot__password">
                  Dont have an account ?<Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
