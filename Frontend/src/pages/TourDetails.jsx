import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, ListGroup, Form } from "reactstrap";
import { useParams } from "react-router";
import tourData from "../assets/data/tours";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "./../hooks/useFetch";
import { BASE_URL } from "./../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const reviewsMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    address,
    price,
    reviews,
    city,
    distance,
    maxGroubSize,
  } = tour;

  const options = { day: "numeric", month: "long", year: "numeric" };
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewsMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("You must be logged in to submit a review");
      }

      const reviewObj={
        username:user?.data.username,
        reviewText,
        rating:tourRating, 
      }

      const res = await fetch(`${BASE_URL}/review/${id}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(reviewObj),
        }
      );
      const result = await res.json();
      
      if(!res.ok){
        return alert(result.massage);
      } 

      alert(result.massage);

    } catch (e) {
      console.log(e.massage);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);
  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={`/imagess/${photo}`} alt="" />

                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          class="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>{reviews?.length}</span>
                        )}
                      </span>

                      <span>
                        <i class="ri-map-pin-fill"></i>
                        {address},<i class="ri-map-pin-2-line"></i> {distance}{" "}
                        km
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i class="ri-price-tag-3-fill"></i>$ {price} /per person
                      </span>

                      <span>
                        <i class="ri-group-fill"></i>
                        {maxGroubSize} People
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* {tours reviews start} */}

                  <div className="tour__reviews mt-4">
                    <h5>Reviews ({reviews?.length}reviews)</h5>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i class="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewsMsgRef}
                          placeholder="share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item " key={review}>
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between ">
                              <div className="">
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>

                              <span className="d-flex align-items-center">
                               {review.rating}<i class="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* {tours reviews end} */}
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
