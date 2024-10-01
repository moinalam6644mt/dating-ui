import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthUser from '../AuthUser/AuthUser';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const FormComponent = () => {
  const [data, setData] = useState(null);
  const { CallApi } = AuthUser();
  const navigate = useNavigate();
  // Function to handle form submission
  const SubmitData = async (values, formikHelpers) => {
    let response;
    try {
       response = await CallApi({
        api: '/signup',
        method: 'UPLOAD',
        data: values,
      });
      console.log(response.message)
      if (response && response.status === 1) {
        setData(response.data);
        toast.success('registration Successfully');
        setTimeout(() => {
          navigate('/login')
        }, 1000);
        formikHelpers.resetForm();
      }else{
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      name: '',
      gender: '',
      dob: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      gender: Yup.string().required('Gender is required'),
      dob: Yup.date().required('Date of Birth is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values, formikHelpers) => {
      SubmitData(values, formikHelpers);
    },
  });

  return (
    <aside className="col-12 col-lg-5">
      <div className="registration">
        <div>
          <h3>Sign up for free!</h3>
          <p>Join the dating site where you could meet anyone, anywhere!</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-4">
              <input
                id="name"
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                {...formik.getFieldProps('name')}
              />
              <label htmlFor="name">Name</label>
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="form-floating mb-4">
                  <select
                    name="gender"
                    className="form-select"
                    {...formik.getFieldProps('gender')}
                  >
                    <option value="" disabled>
                      Gender
                    </option>
                    <option value="M">I am a Man</option>
                    <option value="F">I am a Woman</option>
                  </select>
                  <label htmlFor="gender">Gender</label>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="error">{formik.errors.gender}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <div className="form-floating mb-4">
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    className="form-control"
                    {...formik.getFieldProps('dob')}
                  />
                  <label htmlFor="dob">Birthday</label>
                  {formik.touched.dob && formik.errors.dob ? (
                    <div className="error">{formik.errors.dob}</div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="form-floating mb-4">
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                {...formik.getFieldProps('email')}
              />
              <label htmlFor="email">Email</label>
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="form-floating mb-4">
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                {...formik.getFieldProps('password')}
              />
              <label htmlFor="password">Password</label>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <h6 className="mb-3">
              By clicking "register" below, I agree to the{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms and conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy policy
              </a>
              .
            </h6>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default FormComponent;
