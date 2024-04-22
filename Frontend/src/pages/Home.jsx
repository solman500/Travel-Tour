import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import experienceImg from "../assets/images/experience.png";
import MasonryImagesGallary from "../components/image-gallery/MasonryImagesGallary";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-item-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="worldimg" />
                </div>
                <h1>
                  Traviling opens The Door to creating
                  <span className="highlight">Memories</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab
                  fugit deserunt Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Iure, doloribus.omnis voluptatem vel illo?
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box ">
                <img src={heroImg} controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4 hero__video-box">
                <video src={heroVideo} controls autoPlay muted/>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>

      {/* Hero section start  */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="service__subtitle"> What we serve</h5>
              <h2 className="service__title">We Offer Our Best Service</h2>
            </Col>

            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* Feature tour start  */}

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="feature__tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* Feature tour End  */}

      {/* Experince section start  */}

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2 className="experience__title">
                  Experience the Best Trip Ever
                  <br /> We will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  fugit deserunt Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Iure, doloribus.omnis voluptatem vel illo?
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Rugalar Clients</h6>
                </div>
                <div className="counter__box">
                  <span>14+</span>
                  <h6>Years Expereince</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="heroImg" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Experince section end  */}

      {/* gallery section start */}

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">Visit our Customer tour galler</h2>
            </Col>

            <Col lg="12">
              <MasonryImagesGallary />
            </Col>
          </Row>
        </Container>
      </section>
      {/* gallery section end */}

      {/* Testimonial section start  */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What Our Clients Say</h2>
            </Col>

            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonial section end */}
      <Newsletter/>
      
    </>
  );
};

export default Home;
