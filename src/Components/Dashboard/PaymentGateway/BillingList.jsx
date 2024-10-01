import React, { useState, useEffect,useContext } from "react";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import AuthContext from "../../ContextApi/AuthProvider";

const BillingList = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [activeUser, setActiveUser] = useState(0);
  const [page, setPage] = useState(1);
  const [billingData, setBillingData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    FetchBillingList();
  }, [page]);

  const FetchBillingList = async () => {
    try {
      const response = await CallApi({
        api: "/transaction_list",
        method: "GET",
        data: {
          per_page: page,
        },
      });
      if (response && response.status === 1) {
        setBillingData((prevBillingData) => [
          ...prevBillingData,
          ...response.transaction,
        ]);
        setActiveUser(response.transaction_count);
        setTotalPages(response.total_page);
      } else {
        toast.error(response.error || "Failed to fetch billing data");
      }
    } catch (error) {
      console.error("Error fetching billing data:", error);
      toast.error("An error occurred while fetching billing data");
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      toast.error("No more transactions to load.");
    }
  };

  const fetchTransactionData = async (transaction_id) => {
    try {
      const response = await CallApi({
        api: "/invoice",
        method: "GET",
        data: {
          txn_id: transaction_id,
        },
      });
      if (response) {
        setPdfData(response.invoice);
        generatePDF(response.invoice);
      } else {
        toast.error(response.error || "Failed to fetch Transaction data");
      }
    } catch (error) {
      console.error("Error fetching Transaction data:", error);
      toast.error("An error occurred while fetching Transaction data");
    }
  };

  const generatePDF = (invoiceData) => {
    const doc = new jsPDF();
  
    // Set the title
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);
  
    // Set regular content
    doc.setFontSize(12);
    doc.text(`Transaction id #: ${invoiceData.transaction_id}`, 20, 30);
    doc.text(`Transaction Date: ${invoiceData.payment_date}`, 20, 40);
    doc.text("Membership Type: Basic", 20, 50);
    doc.text(`Subscribe Date: ${invoiceData.subscribe_date}`, 20, 60);
  
    // Add a line break for the subscriber information
    doc.text(" ", 20, 70);
  
    // Set subscriber details in a tabular format
    doc.text("Subscriber Name         Email Address              Price", 20, 80);
    doc.text(`${invoiceData.user_name}        ${invoiceData.email}      $${invoiceData.price}`, 20, 90);
  
    // Add total price
    doc.text(`Total: $${invoiceData.price}`, 20, 110);
  
    // Convert the PDF into a Blob URL and open in a new window
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };
  
  

  return (
    <div className="dashboard-content-inner">
      <h4 className="mb-3"> {allLanguageKey?.account_billing_history}</h4>
      <div className="row billing">
        {billingData.map((item, index) => (
          <article className="col-lg-6 col-12" key={index}>
            <div className="card card-body card-item">
              <p>
                <b> {allLanguageKey?.account_subscriber_name}</b>:{" "}
                <span className="badge text-bg-warning">{item.plan_name}</span>
              </p>
              <p>
                <b> {allLanguageKey?.account_subscribe_date}</b>: {item.subscribe_date}
              </p>
              <p>
                <b>{allLanguageKey?.account_transaction_id}</b>: {item.transaction_id}
              </p>
              <p>
                <b> {allLanguageKey?.price}</b>: {item.price}
              </p>
              <p>
                <b> Download Invoice</b>:{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    fetchTransactionData(item.transaction_id); // Fetch and generate PDF
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-file-earmark-pdf-fill"></i>
                </a>
              </p>
            </div>
          </article>
        ))}
      </div>

      {page < totalPages && (
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={loadMore}>
          {allLanguageKey?.load_more}
          </button>
        </div>
      )}
    </div>
  );
};

export default BillingList;
