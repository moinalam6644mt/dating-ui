import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './payment.css';
import toast from 'react-hot-toast';
import AuthUser from '../../Authentication/AuthUser/AuthUser';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({planId ,amount ,gift ,profileId}) => {
  const {CallApi }=AuthUser();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess,] = useState(null);
  const navigate= useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    let params = {
      amount: amount,
      token: token.id,
      plan_id: planId,
    };
  
    if (gift ===true) {
      params = {
        ...params,
        profile_id: profileId, 
        is_gift: 1,
      };
    }

    if (error) {
      setPaymentError(error.message);
    } else {
      try {
        const response = await CallApi({
          api: '/make_payment_stripe',
          method: 'UPLOAD', 
          data: params
        });
      
        if (response && response.status === "ok") {
          navigate('/payment-success');
        } else {
          toast.error('Payment not successful');
        }
      } catch (error) {
        console.error('Error during payment:', error);
        toast.error('Payment failed');
      }
   
    }
  };

  console.log(gift)

  return (
    <div className="bodyView ">
      <div className="title">
        <h3>Truetiesdating Membership</h3>
      </div>
      <div className="layoutView contentView">        
        <div className="layoutSubview mb-4">
          <div className="loggedBarView">
            <div className="inner">
              <div className="loggedBarContent">
                <span className="prefilledEmail">testboy@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className=''>
          <div className="layoutSubview mb-4">
            <div className="layoutView paymentView">
              <div className="layoutSubview">
                <div className="cardPaymentView">
                  <CardElement />
                </div>
              </div>
            </div>
          </div>
          <div className="layoutSubview">
            <div className="buttonsView">
              <div className="button submit">
                <div className="inner d-grid">
                  <button type="submit" id="submitButton" className='btn btn-primary'>
                    Pay $10.00
                    <div className="spinnerContainer" style={{ opacity: 0, display: 'none', transition: 'none' }}>
                      {/* Spinner SVG */}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </form>
        {paymentError && <div className="paymentError">{paymentError}</div>}
        {paymentSuccess && <div className="paymentSuccess">{paymentSuccess}</div>}
      </div>
    </div>
  );
};

export default PaymentForm;
