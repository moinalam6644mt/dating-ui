import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthUser from '../AuthUser/AuthUser';
import banner from '../../../assets/images/banner.jpg';

const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgetPassword = () => {
  const { CallApi } = AuthUser();

  const initialValues = {
    email: '',
  };

  const SubmitData = async (values) => {
    try {
      const response = await CallApi({
        api: '/forget_password',
        method: 'POST',
        data: values,
      });
      if (response) {
        toast.success("Verification link sent to your email");
      }
    } catch (error) {
      toast.error("Failed to send verification link");
      console.error('Error submitting data:', error);
    }
  };

  const handleSubmit = (values) => {
    SubmitData(values);
  };

  return (
    <section className="banner home login intro-banner">
      <div className="container">
        <div className="row justify-content-end align-items-center">
          <aside className="col-lg-6 col-md-8 col-12">
            <h1 className="banner_caption white-text">
              Choose Your Soul Mate
              <br />
              From 100,000+ Lonely Hearts
            </h1>
          </aside>
          <aside className="col-lg-6 col-md-8 col-12">
            <div className="registration">
              <div>
                <h3 className="mb-4">Forgot Password</h3>
                <Formik
                  initialValues={initialValues}
                  validationSchema={ForgetPasswordSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form>
                      <div className="form-floating mb-4">
                        <Field
                          id="email"
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        <label htmlFor="email">Email</label>
                        <ErrorMessage name="email" component="div" className="error" />
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary mb-3">
                          Send Verification Link
                        </button>
                      </div>
                      <p>
                        Not a member? <Link to='/register'>Join Free Now!</Link>
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div
        className="background-image-container dark"
        style={{ 
            backgroundImage: "url(https://truetiesdating.com/assets/banners/banner.jpg)"
         }}
      ></div>
      <div
        className="background-image-container light"
        style={{ backgroundImage: 'url(https://truetiesdating.com/assets/banners/light-banner.jpg)' }}
      ></div>
    </section>
  );
};

export default ForgetPassword;
