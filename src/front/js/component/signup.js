import React, { useState, useContext } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInYears } from 'date-fns';
import { Context } from "../store/appContext"; // Asegúrate de que la ruta es correcta
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { store, actions } = useContext(Context); // Obtener el contexto
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const calculatedAge = differenceInYears(new Date(), date);
      setAge(calculatedAge);
    } else {
      setAge(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Llamar a la acción signup
    const success = await actions.signup(username, email, password, firstName, lastName, age, address);

    if (success) {
      navigate("/home"); // Redirigir a la página de inicio o a otra página después del registro exitoso
    } else {
      setErrorMessage(store.errorMessage || "An error occurred during signup.");
    }
  };

  return (
    <div className="card d-flex justify-content-center my-5 p-5 mx-auto" style={{ maxWidth: '600px' }}>
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <p>Sign up with:</p>
          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>
          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>
          <button type="button" className="btn btn-secondary btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>

        <p className="text-center">or:</p>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        {/* FirstName input */}
        <div className="form-outline mb-4">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            id="registerFirstName"
            className="form-control"
            required
          />
          <label className="form-label" htmlFor="registerFirstName">First Name</label>
        </div>

        {/* lastName input */}
        <div className="form-outline mb-4">
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            id="registerLastName"
            className="form-control"
            required
          />
          <label className="form-label" htmlFor="registerLastName">Last Name</label>
        </div>

        {/* Username input */}
        <div className="form-outline mb-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="registerUsername"
            className="form-control"
            required
          />
          <label className="form-label" htmlFor="registerUsername">Username</label>
        </div>

        {/* Email input */}
        <div className="form-outline mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="registerEmail"
            className="form-control"
            required
          />
          <label className="form-label" htmlFor="registerEmail">Email</label>
        </div>

        {/* Age input */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="dob">Date of Birth</label>
          <DatePicker
            id="dob"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Select your date of birth"
            required
          />
        </div>

        {/* Address input */}
        <div className="form-outline mb-4">
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            id="registerAddress"
            className="form-control"
            required
          />
          <label className="form-label" htmlFor="registerAddress">Address</label>
        </div>

        {/* Password input */}
        <div className="form-outline mb-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="registerPassword"
            className="form-control"
            required
          />
          <label className="form-label" htmlFor="registerPassword">Password</label>
        </div>

        {/* Repeat Password input */}
        <div className="form-outline mb-4">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="registerRepeatPassword"
            className="form-control"
            required
          />
          <label className="form-label" htmlFor="registerRepeatPassword">Repeat Password</label>
        </div>

        {/* Checkbox */}
        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            id="registerCheck"
            required
          />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-3">
          {store.loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;


