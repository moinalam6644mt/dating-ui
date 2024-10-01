import React from "react";
//import "../Loading/loading.css";

const Loading = () => {
  return (
    <div className="loader" style={{ height: '100px' }}>
      <svg
        width="50px"
        height="50px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="lds-double-ring"
        style={{ background: 'none' }}
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="4"
          stroke="#ec407a"
          strokeDasharray="62.83185307179586 62.83185307179586"
          fill="none"
          strokeLinecap="round"
          transform="rotate(238.536 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.5s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="50"
          cy="50"
          r="35"
          strokeWidth="4"
          stroke="#000"
          strokeDasharray="54.97787143782138 54.97787143782138"
          strokeDashoffset="54.97787143782138"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-238.536 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;-360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
