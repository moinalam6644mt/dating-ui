import React, { useEffect, useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../../Authentication/AuthUser/AuthUser';
import AuthContext from '../../ContextApi/AuthProvider';

const Credit = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [creditData ,setCreditData] =useState([])
  const [balance,setBalance]=useState()

  useEffect(() => {
    FetchCreditData();
  }, []);

  const FetchCreditData = async () => {
    try {
      const response = await CallApi({
        api: `/message_plan`,
        method: 'GET'
      });
      if (response ) {
        setBalance(response.balance)
        setCreditData(response.plans);
      }
    } catch (error) {
      console.error('Error fetching credit data:', error);
    }
  };


  return (
    <div className="dashboard-content-inner">
      <div className="text-center mb-3">
        <span className="total-coin lg">
          <img src="https://truetiesdating.com/assets/images/10693245.png" alt="" height="24" width="24" /> {balance}
        </span>
      </div>

      <div className="row">
        {creditData.map((plan) => (
          <article key={plan.id} className="col-xl-4 col-lg-4 col-sm-6 col-12">
            <div className="card card-plan">
              <div className="card-body">
                <h3 className="text-center mb-4">{plan?.plan_name}</h3>
                <hr />
                <h4 className="d-flex justify-content-between mb-4">
                  <span>{allLanguageKey?.message_credit}</span>
                  <span>{plan?.message_credit}</span>
                </h4>
                <h4 className="d-flex justify-content-between mb-4">
                  <span>{allLanguageKey?.price}</span>
                  <span>${plan?.price}</span>
                </h4>
                <div className="d-grid text-center">
                  <Link to={`/checkout/${plan.plan_id}`} type="button" id="subscribe_plan" className="btn btn-primary">
                  {allLanguageKey?.message_buy_coins}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Credit;
