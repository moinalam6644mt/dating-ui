import React from 'react'

const PaymentSuccess = () => {
  return (
    <div class="dashboard-content-inner">
    <div class="card text-center">
        <div class="card-body">
            <img src="http://localhost/woomatch-new/assets/images/6785304.png" alt="Logo" height="64" width="64" class="mb-2"/>
            <h1 class="h2">Payment Successful!</h1>
            <h3>Congratulations!</h3>
            <h4 class="mb-3">Your purchase of credit points was successful.</h4>
            <p><span>You now have </span> <span class="text-bg-warning h4 ps-2 pe-2 rounded-2" style={{lineHeight:1}}>807</span> <span> credit points available in your account.</span></p>
            <p class="mx-auto" style={{maxWidth: '800px'}}>Thank you for your purchase! You can use these points to enhance your experience and unlock exciting features on our platform. Start exploring and connect with amazing people today!</p>
        </div>
    </div>
</div>
  )
}

export default PaymentSuccess
