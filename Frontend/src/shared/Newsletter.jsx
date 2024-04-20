import React from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg={6}>
            <div className="newsletter__content">
              <h2>Subscribe to our Newsletter</h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Your Email Address" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
                molestias nihil nemo est molestiae laborum facere porro dolore
                pariatur maiores quisquam, fugiat quod veniam aspernatur commodi
                perferendis! Eos, corporis at!
              </p>
              
            </div>
          </Col>
          <Col lg={6}>
           <div className="newsletter__img">
                <img src={maleTourist} alt="maleTourist" />

           </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
