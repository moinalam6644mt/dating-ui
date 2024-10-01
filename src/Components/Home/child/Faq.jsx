import React, { useCallback, useContext, useEffect, useState } from 'react';
import AuthUser from '../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';
import AuthContext from '../../ContextApi/AuthProvider';

const Faq = () => {
  const { CallApi } = AuthUser();
  const {language}=useContext(AuthContext)
  const [FaqData, setFaqData] = useState([]);

  useEffect(() => {
    FetchFaqData();
  }, []);

  const FetchFaqData = async () => {
    try {
      const response = await CallApi({
        api: `/footer_faq?lang=${language}`,
        method: 'GET',
      });
      if (response && response.status === 1) {
        setFaqData(response.questions);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error fetching FAQ data');
      toast.error('Data not found');
    }
  };

  return (
    <section className="sec sub-banner">
      <div className="dark-wrapper" style={{ minHeight: '600px' }}>
        <div className="container inner">
          <h2 className="center">FAQ's</h2>
          <div className="row">
            <aside className="col-md-12">
              <h4 className="title-21">&nbsp;</h4>
              <div className="accordion" id="accordionExample">
                {FaqData && FaqData.length > 0 ? (
                  FaqData.map((faq, index) => (
                    <div className="card" key={index}>
                      <div className="card-header" id={`heading${index}`}>
                        <h2 className="mb-0">
                          <button
                            className="btn btn-link"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                            aria-controls={`collapse${index}`}
                          >
                            {faq.question}
                          </button>
                        </h2>
                      </div>

                      <div
                        id={`collapse${index}`}
                        className={`collapse ${index === 0 ? "show" : ""}`}
                        aria-labelledby={`heading${index}`}
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <span>{faq.answer}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No FAQs available</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
