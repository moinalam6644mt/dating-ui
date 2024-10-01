import React, {useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import Modal from "react-bootstrap/Modal";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const stripePromise = loadStripe("pk_test_kEgv3z7UGnLOVlM505HPStbW");

const StripePayment = () => {
  const {CallApi}=AuthUser();
  const {plan_id}=useParams();
  const [show, setShow] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [messageCredit,setMessagecredit]=useState([])

  const handlePaymentOption = () => {
    if (selectedPaymentMethod === "stripe") {
      setShow(true);
    } else {
      alert("Currently only Stripe is integrated");
    }
  };

  useEffect(()=>{
    FetchCreditDetails();
  },[])


  const FetchCreditDetails=async()=>{
    try {
      const response = await CallApi({
        api:`/message_plan_details`,
        method:'GET',
        data:{
          membership_id:plan_id
        }
      })
      if(response && response.status===1){
        setMessagecredit(response.plans[0])
      }else{
        toast.error(response.msg)
      }
    } catch (error) {
      console.error('data not found')
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="dashboard-content-inner">
        <div className="text-center mb-3">
          <span className="total-coin lg">
            <img
              src="https://truetiesdating.com/assets/images/10693245.png"
              alt=""
              height="24"
              width="24"
            />{" "}
            199
          </span>
        </div>

        <div className="row justify-content-center">
          <article className="col-xl-6 col-lg-8 col-12">
            <div className="card card-plan">
              <div className="card-body">
                <h3 className="text-center mb-4">{messageCredit.plan_name}</h3>
                <hr />
                <h4 className="d-flex justify-content-between mb-4">
                  <span>Message Credit</span> <span>{messageCredit.message_credit}</span>
                </h4>
                <h4 className="d-flex justify-content-between mb-4">
                  <span>Price</span>
                  <span className="price_container">$ {messageCredit.price}</span>
                </h4>

                <input type="hidden" id="price" value="10.00" />
                <input type="hidden" id="total_price" value="10.00" />
                <span id="discounted_price" style={{ display: "none" }}></span>

                <div className="input-group mb-4">
                  <input
                    type="text"
                    id="coupon_code"
                    name="coupon_code"
                    className="form-control"
                    placeholder="Coupon Code"
                  />
                  <button
                    id="couponButton"
                    className="btn btn-warning"
                    onClick={() =>
                      alert("Apply coupon function not implemented")
                    }
                  >
                    Apply
                  </button>
                </div>

                <h4>Payment Method</h4>
                <div
                  className="btn-group btn-group-custom d-flex mb-4"
                  role="group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="payment_method"
                    id="btnradio1"
                    autoComplete="off"
                    value="paypal"
                    onChange={handlePaymentMethodChange}
                  />
                  <label className="btn btn-outline-light" htmlFor="btnradio1">
                    <img
                      src="https://truetiesdating.com/assets/images/196566.png"
                      alt=""
                    />
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="payment_method"
                    id="btnradio2"
                    autoComplete="off"
                    value="stripe"
                    onChange={handlePaymentMethodChange}
                  />
                  <label className="btn btn-outline-light" htmlFor="btnradio2">
                    <img
                      src="https://truetiesdating.com/assets/images/5968382.png"
                      alt=""
                    />
                  </label>
                </div>

                <div className="d-grid text-center mb-4">
                  <button
                    type="button"
                    id="subscribe_plan"
                    className="btn btn-primary"
                    onClick={handlePaymentOption}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>                             
            <div className="image">
              <img src="https://truetiesdating.com/assets/images/logo.png" alt="Logo" />
            </div>
                        
            <button onClick={handleClose} type="button" class="btn-close"></button>
          
        </Modal.Header>
        <Modal.Body>
          {show && (
            <Elements stripe={stripePromise}>
              <PaymentForm handleClose={handleClose} planId={messageCredit.plan_id} amount={messageCredit.price}/>
            </Elements>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default StripePayment;
