import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Modal from "react-bootstrap/Modal";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import PaymentForm from "../PaymentGateway/PaymentForm";

const GiftPayment = () => {
  const stripePromise = loadStripe("pk_test_kEgv3z7UGnLOVlM505HPStbW");
  const { CallApi } = AuthUser();
  const { giftId ,gift_name,profileId} = useParams();
  const [show, setShow] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [messageCredit, setMessageCredit] = useState();

  useEffect(() => {
    FetchCreditDetails();
  }, []);

  const FetchCreditDetails = async () => {
    try {
      const response = await CallApi({
        api: `/send_gift_payment`,
        method: "UPLOAD",
        data: {
          profile_id: profileId,
          gift_id:giftId
        }
      });
      if (response && response.status === 1) {
        setMessageCredit(response.plans);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.error("Data not found");
    }
  };

  const handleProceedToPayment = () => {
    if (selectedPaymentMethod === "stripe") {
      setShow(true);
    } else {
      alert("Currently only Stripe is integrated");
    }
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="dashboard-content-inner">
      <div className="d-flex align-items-center mb-3">
        <h4>
          <b>Gifts</b>
        </h4>
      </div>

      <div className="row justify-content-center">
        <article className="col-xl-6 col-lg-8 col-12">
          <div className="card card-plan">
            <div className="card-body">
              <hr />
              <h4 className="d-flex justify-content-between mb-4">
                <span>Gift name</span>
                <span>{gift_name}</span>
              </h4>
              <h4 className="d-flex justify-content-between mb-4">
                <span>Price</span>
                <span className="price_container">${giftId}</span>
              </h4>

              <input type="hidden" id="price" value="1.00" />
              <input type="hidden" id="total_price" value="1.00" />

              <h4>Payment Method</h4>
              <div
                className="btn-group btn-group-custom mb-4"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="payment_method"
                  id="btnradio1"
                  autoComplete="off"
                  checked={selectedPaymentMethod === "paypal"}
                  value="paypal"
                  onChange={handlePaymentMethodChange}
                />
                <label className="btn btn-outline-light" htmlFor="btnradio1">
                  <img
                    src="http://localhost/eroflirts-credit/assets/images/196566.png"
                    alt="PayPal"
                  />
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="payment_method"
                  id="btnradio2"
                  autoComplete="off"
                  checked={selectedPaymentMethod === "stripe"}
                  value="stripe"
                  onChange={handlePaymentMethodChange}
                />
                <label className="btn btn-outline-light" htmlFor="btnradio2">
                  <img
                    src="http://localhost/eroflirts-credit/assets/images/5968382.png"
                    alt="Stripe"
                  />
                </label>
              </div>

              <div className="d-grid text-center mb-4">
                <button
                  type="button"
                  id="subscribe_plan"
                  className="btn btn-primary"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </button>
              </div>

              <div className="text-center">
                <img
                  src="http://localhost/eroflirts-credit/assets/images/735721.png"
                  alt="Payment Option 1"
                  height="48"
                  width="48"
                />
                <img
                  src="http://localhost/eroflirts-credit/assets/images/7761035.png"
                  alt="Payment Option 2"
                  height="48"
                  width="48"
                />
                <img
                  src="http://localhost/eroflirts-credit/assets/images/1310441.png"
                  alt="Payment Option 3"
                  height="48"
                  width="48"
                />
                <br />
                <br />
                <img
                  src="http://localhost/eroflirts-credit/assets/images/payment-credit-card.png"
                  alt="Credit Card Payment"
                />
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Modal for Stripe Payment */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stripe Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
          <PaymentForm handleClose={handleClose} planId={messageCredit?.gift_id} amount={messageCredit?.price} gift={true} profileId={profileId}/>
          </Elements>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GiftPayment;
