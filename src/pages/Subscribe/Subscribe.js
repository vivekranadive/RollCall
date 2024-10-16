import React, { useState } from "react";
import AuthLogo from "../../images/auth-screen-logo.png";
import GifLogo from "../../images/main-logo.gif";
import GoogleIcon from "../../images/google-icon.png";
import Pencil from "../../images/pencil.png";
import { Link } from "react-router-dom";
import PhoneNumberInput from "../../components/PhoneNumberInput";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Modal from "../../components/ModalComponents/Modal";
import { subscribe } from "../../api/auth";

const Subscribe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  console.log(phoneNumber);
  const initialSubscribeData = {
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
  };

  const [subscribeData, setSubscribeData] = useState(initialSubscribeData);

  const isValidEmail = /\S+@\S+\.\S+/.test(subscribeData.email);

  const isData =
    (subscribeData.businessName?.length >= 3) &
    (subscribeData.firstName?.length >= 3) &
    (subscribeData.lastName?.length >= 3) &
    (subscribeData.middleName?.length >= 3) &
    (subscribeData.city?.length >= 3) &
    (subscribeData.state?.length >= 3) &
    (subscribeData.zipCode?.length >= 3) &
    (subscribeData.address1?.length >= 10) &
    (subscribeData.address2?.length >= 10) &
    (phoneNumber?.length >= 7) &
    (subscribeData.password?.length >= 8) &
    (subscribeData.confirmPassword?.length >= 8) &
    isValidEmail;

  console.log(isData);

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setSubscribeData((pervData) => ({
      ...pervData,
      phoneNumber: phoneNumber,
      [name]: value,
    }));
  };

  const handleSubscribe = async () => {
    const response = await subscribe(subscribeData);
    console.log(response);
    setIsModalOpen(true);
    setPhoneNumber("");
    setSubscribeData(initialSubscribeData);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isModalOpen) {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  }

  console.log(subscribeData);

  return (
    <div className="flex justify-between  w-full h-auto min-h-screen bg-gradient-to-b from-primary-500 to-secondary-500 p-16">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="text-base font-bold  p-6 ">
          Your Account will be activated after verification.
        </h1>
      </Modal>

      <div className="flex flex-col gap-5 h-full">
        <div className="flex items-center gap-3">
          <img src={AuthLogo} alt="logo" className="w-[60px]" />
          <h3 className="text-2xl text-white">Name.com</h3>
        </div>
        {/* <div className="flex flex-col justify-between "> */}
        <div className="flex justify-center w-[485px]">
          <img src={GifLogo} alt="main-logo" className="w-[350px]" />
        </div>
        <div className="w-[485px]">
          <h1 className="text-center text-6xl text-text-light">
            Candidate <br></br>
            Onboarding and <br></br>
            Training
          </h1>
        </div>
        {/* </div> */}
      </div>
      <div className="flex flex-col justify-between items-center py-6 px-10 bg-white rounded-lg">
        <h1 className="text-4xl my-5">Subscribe</h1>
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div className="">
              <label htmlFor="email-id" className="text-text-hint">
                Email ID<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.email}
                  name="email"
                  type="email"
                  required
                  placeholder="email"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>

            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Phone Number<span className="text-red-500">*</span>
              </label>

              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg ">
                <PhoneInput
                  international
                  country="US"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="Enter phone number"
                  name="phoneNumber"
                  numberInputProps={{
                    className:
                      "rounded-md px-4 focus:ring-0 outline-none border-none ",
                    // value:{subscribeData.phoneNumber},
                  }}
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Create Password<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.password}
                  name="password"
                  type="password"
                  required
                  placeholder="******"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Retype Password<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.confirmPassword}
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="******"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Business Name<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.businessName}
                  name="businessName"
                  type="text"
                  required
                  placeholder="Business"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                First Name<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.firstName}
                  name="firstName"
                  type="text"
                  required
                  placeholder="First Name"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>

            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Middle Name<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.middleName}
                  name="middleName"
                  required
                  type="text"
                  placeholder="Middle Name"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Last Name<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.lastName}
                  name="lastName"
                  type="text"
                  required
                  placeholder="Last Name"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Address Line 1<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.address1}
                  name="address1"
                  type="text"
                  required
                  placeholder="Address Line 1"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Address Line 2<span className="text-red-500"></span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.address2}
                  name="address2"
                  type="text"
                  required
                  placeholder="Address Line 2"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                City<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.city}
                  name="city"
                  type="text"
                  required
                  placeholder="City"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                State <span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.state}
                  name="state"
                  type="text"
                  required
                  placeholder="State"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Zip Code<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={subscribeData.zipCode}
                  name="zipCode"
                  type="text"
                  required
                  placeholder="Code"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
          </div>
          {/* <div className="flex justify-between text-xs mt-4">
            <div className="flex gap-2">
              <input type="checkbox" className="rounded-md" />
              <p>Remember me</p>
            </div>
            <p className="text-info-500">Forget Password?</p>
          </div> */}
        </div>

        <div className=" ">
          {isData ? (
            <button
              onClick={handleSubscribe}
              className="w-full my-8 py-3 px-16 text-base rounded-full text-white bg-secondary-600"
            >
              Subscribe
            </button>
          ) : (
            <button
              disabled={true}
              className="w-full my-8 py-3 px-16 text-base rounded-full text-text-muted bg-neutral-50"
            >
              Subscribe
            </button>
          )}

          {/* <p className="text-sm text-center ">
            Don't you have an account?{" "}
            <Link to="/signup" className="text-info-500">
              SignUp
            </Link>
          </p>
          <p className="text-text-hint">or</p>
          <p>
            <Link to="/subscribe" className="text-info-500 font-bold">
              Subscribe
            </Link>{" "}
            for your Business
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
