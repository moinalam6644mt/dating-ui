import React, { useState, useEffect } from 'react';
import AuthUser from '../../Authentication/AuthUser/AuthUser';
import { Link } from 'react-router-dom';

const GiftCardModal = ({userId}) => {
  const { CallApi } = AuthUser();
  const [giftData, setGiftData] = useState([]);
  const [giftId,setGiftId]=useState();

  useEffect(() => {
    FetchGiftList();
  }, [userId]);

  const FetchGiftList = async () => {
    try {
      const response = await CallApi({
        api: `/sendGiftList`,
        method: 'GET',
        data: {
           gift_id:giftId,
          profile_id: userId,
        },
      });
      if (response && response.plans) {
        setGiftData(response.plans);
      }
    } catch (error) {
      console.error('Error fetching gift details:', error);
    }
  };

  const subscribe_plan=(gift_id)=>{
  setGiftId(gift_id)
  }

  return (
    <div className="card-body table-responsive p-0" id="main_table">
      <div className="text-center p-3">
        <video
          src="https://truetiesdating.com/assets/images/valentine-gift.mp4"
          autoPlay
          muted
          loop
          playsInline
          type="video/mp4"
          style={{ height: '256px' }}
        ></video>
        <h4>
          Give a gift to chat with <span className="text-primary">Elyna</span> immediately. Catch her attention!
        </h4>
      </div>
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Gift</th>
            <th>Name</th>
            <th>Price</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {giftData.length > 0 ? (
            giftData.map((gift, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={gift.gift_image}
                    alt={gift.gift_name}
                    height="48"
                    width="48"
                  />
                </td>
                <td>{gift.gift_name}</td>
                <td>{gift.price}</td>
                <td className="text-end">
                <Link to={`/send-gift/${gift?.gift_id}/${userId}/${gift?.gift_name}`}>
                  <button
                    type="button"
                    id="subscribe_plan"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => subscribe_plan(gift.gift_id)} 
                  >
                    Buy Credit
                  </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No gifts available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GiftCardModal;
