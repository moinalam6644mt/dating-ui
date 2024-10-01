import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthUser from '../AuthUser/AuthUser';
// import lightBanner from '../../../assets/ba'


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const { CallApi, SaveToken } = AuthUser();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const SubmitData = async (values) => {
    try {
      const response = await CallApi({
        api: '/check_login',
        method: 'UPLOAD',
        data: values,
      });

      if (response && response.status === 1) {
        navigate('/dashboard')
        SaveToken(response.member_token)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error('Login Failed');
      console.error('Error submitting data:', error);
    }
  };

  const handleSubmit = (values) => {
    SubmitData(values);
  };

  return (
    <section className="banner  login intro-banner">
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
                <h3 className="mb-4">Members Login</h3>
                <Formik
                  initialValues={initialValues}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {() => (
                    <Form>
                      <div className="form-floating mb-4">
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        <label htmlFor="email">Email</label>
                        <ErrorMessage name="email" component="div" className="error" />
                      </div>

                      <div className="form-floating mb-4">
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Password"
                        />
                        <label htmlFor="password">Password</label>
                        <ErrorMessage name="password" component="div" className="error" />
                      </div>

                      <div className="error" id="loginError"></div>
                      <p>
                        <Link to="/forget-password">Forgot Password</Link>
                      </p>

                      <button type="submit" className="btn btn-primary btn-block mb-3">
                        Login
                      </button>

                      <p>
                        Not a member? <Link to="/register">Join Free Now!</Link>
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

export default Login;
