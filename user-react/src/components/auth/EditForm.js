import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./authForm.css";
import { userDetail } from "../../service/UserService";

const EditForm = () => {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const [registerStatus, setRegisterStatus] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [UserDta, setUserDta] = useState({
    id: 0,
    name: "",
    email: "",
  });
  useEffect(() => {
    // Get User Detail
    userDetail(
      params.uid,
      (dta) => {
        setUserDta({
          userid: dta.id,
          name: dta.name,
          email: dta.email
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return () => { };
  }, [params.uid]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const inputName = inputNameRef.current.value;
    const inputEmail = inputEmailRef.current.value;
    axios
      .post("http://localhost:8082/api/users/edit-user", {
        id:params.uid,
        name: inputName,
        email: inputEmail,
      })
      .then((res) => {
        setRegisterStatus("SUCCESS");
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        setRegisterStatus("FAILED");
        console.log(err.message);
      });

    inputNameRef.current.value = "";
    inputEmailRef.current.value = "";
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update Data
          </h2>
        </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form onSubmit={onSubmitHandler}>
          {registerStatus === "FAILED" && (
            <div className="form-error text-center">Update Failed</div>
          )}
          {registerStatus === "SUCCESS" && (
            <div className="form-success text-center">
              Update successfully!!
            </div>
          )}
          <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
        <div className="mt-2">
          <input
            ref={inputNameRef}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            name="Name"
            placeholder={UserDta.name}
            required
          />
        </div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
        <div className="mt-2">
          <input
            ref={inputEmailRef}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="email"
            name="email"
            placeholder={UserDta.email}
            required
          />
          </div>
          <button type="submit" className="mt-2 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;