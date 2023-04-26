import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./authForm.css";

const RegistrationForm = () => {
  const inputemailRef = useRef();
  const inputPasswordRef = useRef();
  const inputNameRef = useRef();

  const [registerStatus, setRegisterStatus] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const inputemail = inputemailRef.current.value;
    const inputPassword = inputPasswordRef.current.value;
    const inputName = inputNameRef.current.value;


    axios
      .post("http://localhost:8082/api/auth/register", {
        email: inputemail,
        name: inputName,
        password: inputPassword,
      })
      .then((res) => {
        setRegisterStatus("SUCCESS");
        console.log(res);
      })
      .catch((err) => {
        setRegisterStatus("FAILED");
        console.log(err.message);
      });

    inputemailRef.current.value = "";
    inputPasswordRef.current.value = "";
    inputNameRef.current.value = "";
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up 
          </h2>
        </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form onSubmit={onSubmitHandler}>
          {registerStatus === "FAILED" && (
            <div className="form-error text-center">
              Username or password is invalid
            </div>
          )}
          {registerStatus === "SUCCESS" && (
            <div className="form-success text-center">
              Registered successfully!
            </div>
          )}
          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={inputemailRef}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  ref={inputNameRef}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
            </label>
              <div className="mt-2">
                <input
                  ref={inputPasswordRef}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          
          <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Register
          </button>
          <Link
            to="/login"
            className="d-block mt-3 text-center text-decoration-none hover:bg-blue-200"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
    
  );
};

export default RegistrationForm;