import React, { useState } from "react";
import AuthLogo from "../../images/auth-screen-logo.png";
import GifLogo from "../../images/main-logo.gif";
import GoogleIcon from "../../images/google-icon.png";
import Pencil from "../../images/pencil.png";
import { Link } from "react-router-dom";
import Modal from "../../components/ModalComponents/Modal";
import { signup } from "../../api/auth";

const SignUp = () => {
  const initialSignupData = {
    businessName: "",
    email: "",
    phoneNum: "",
    password: "",
    confirmPassword: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [signUpData, setSignUpData] = useState(initialSignupData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSignUpData((pervData) => ({
      ...pervData,
      [name]: value,
    }));
    console.log(signUpData);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState("password");

  const isValidEmail = /\S+@\S+\.\S+/.test(signUpData.email);

  const isData =
    (signUpData.businessName?.length >= 3) &
    (signUpData.phoneNum?.length >= 7) &
    (signUpData.password?.length >= 8) &
    (signUpData.confirmPassword?.length >= 8) &
    isValidEmail;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSignUp = async () => {
    const response = await signup(signUpData);
    console.log(response);
    console.log("data :", signUpData);
    openModal();
    setSignUpData(initialSignupData);
  };

  if (isModalOpen) {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  }

  console.log(isData);
  return (
    <div className="flex justify-between  w-full h-auto min-h-screen bg-gradient-to-b from-primary-500 to-secondary-500 py-10 px-16">
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
        <h1 className="text-4xl">SignUp</h1>
        <div>
          <div className="flex flex-col gap-8">
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Business Name<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={signUpData.businessName}
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
              <label htmlFor="email-id" className="text-text-hint">
                Email ID<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={signUpData.email}
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
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={signUpData.phoneNum}
                  name="phoneNum"
                  type="number"
                  required
                  placeholder="Phone Number"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                <img src={Pencil} alt="pencil" className="w-6 h-6" />
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Password<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={signUpData.password}
                  name="password"
                  type={showPassword}
                  required
                  placeholder="password"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                {showPassword === "password" ? (
                  <svg
                    onClick={() => setShowPassword("text")}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="icon">
                      <path
                        id="Ellipse 65_light"
                        d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"
                        stroke="#2F2F2F"
                      />
                      <path
                        id="Ellipse 66_light"
                        d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"
                        stroke="#2F2F2F"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg
                    onClick={() => setShowPassword("password")}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="icon">
                      <path
                        id="Subtract_light"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L12.1239 9.00251C13.6822 9.06583 14.9342 10.3178 14.9975 11.8761L15.9202 12.7988ZM9.39311 10.5143C9.14295 10.9523 9 11.4595 9 12C9 13.6569 10.3431 15 12 15C12.5405 15 13.0477 14.857 13.4857 14.6069L14.212 15.3332C13.5784 15.7545 12.8179 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24547 10.4216 8.66676 9.78799L9.39311 10.5143Z"
                        fill="#2F2F2F"
                      />
                      <path
                        id="Subtract_light_2"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.1537 17.2751L15.4193 16.5406C14.3553 17.1196 13.1987 17.5 12 17.5C10.3282 17.5 8.73816 16.7599 7.36714 15.7735C6.00006 14.79 4.89306 13.5918 4.19792 12.7478C3.77356 12.2326 3.72974 12.1435 3.72974 12C3.72974 11.8565 3.77356 11.7674 4.19792 11.2522C4.86721 10.4396 5.9183 9.29863 7.21572 8.33704L6.50139 7.62271C5.16991 8.63072 4.10383 9.79349 3.42604 10.6164L3.36723 10.6876C3.03671 11.087 2.72974 11.4579 2.72974 12C2.72974 12.5421 3.0367 12.913 3.36723 13.3124L3.42604 13.3836C4.15099 14.2638 5.32014 15.5327 6.78312 16.5853C8.24216 17.635 10.0361 18.5 12 18.5C13.5101 18.5 14.9196 17.9886 16.1537 17.2751ZM9.18993 6.06861C10.0698 5.71828 11.0135 5.5 12 5.5C13.9639 5.5 15.7579 6.365 17.2169 7.41472C18.6799 8.46727 19.849 9.73623 20.574 10.6164L20.6328 10.6876C20.9633 11.087 21.2703 11.4579 21.2703 12C21.2703 12.5421 20.9633 12.913 20.6328 13.3124L20.574 13.3836C20.0935 13.9669 19.418 14.721 18.5911 15.4697L17.883 14.7617C18.6787 14.0456 19.3338 13.3164 19.8021 12.7478C20.2265 12.2326 20.2703 12.1435 20.2703 12C20.2703 11.8565 20.2265 11.7674 19.8021 11.2522C19.107 10.4082 18 9.21001 16.6329 8.22646C15.2619 7.24007 13.6718 6.5 12 6.5C11.3056 6.5 10.6253 6.62768 9.96897 6.84765L9.18993 6.06861Z"
                        fill="#2F2F2F"
                      />
                      <path
                        id="Vector 116_light"
                        d="M5 2L21 18"
                        stroke="#2F2F2F"
                      />
                    </g>
                  </svg>
                )}
              </div>
            </div>
            <div className="">
              <label htmlFor="password" className="text-text-hint">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <div className="flex  items-center  px-2 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange}
                  value={signUpData.confirmPassword}
                  name="confirmPassword"
                  type={showConfirmPassword}
                  required
                  placeholder="confirm password"
                  className="outline-none border-none focus:ring-0 flex-grow"
                />
                {showConfirmPassword === "password" ? (
                  <svg
                    onClick={() => setShowConfirmPassword("text")}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <g id="icon">
                      <path
                        id="Ellipse 65_light"
                        d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"
                        stroke="#2F2F2F"
                      />
                      <path
                        id="Ellipse 66_light"
                        d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"
                        stroke="#2F2F2F"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg
                    onClick={() => setShowConfirmPassword("password")}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <g id="icon">
                      <path
                        id="Subtract_light"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.9202 12.7988C15.9725 12.5407 16 12.2736 16 12C16 9.79086 14.2091 8 12 8C11.7264 8 11.4593 8.02746 11.2012 8.07977L12.1239 9.00251C13.6822 9.06583 14.9342 10.3178 14.9975 11.8761L15.9202 12.7988ZM9.39311 10.5143C9.14295 10.9523 9 11.4595 9 12C9 13.6569 10.3431 15 12 15C12.5405 15 13.0477 14.857 13.4857 14.6069L14.212 15.3332C13.5784 15.7545 12.8179 16 12 16C9.79086 16 8 14.2091 8 12C8 11.1821 8.24547 10.4216 8.66676 9.78799L9.39311 10.5143Z"
                        fill="#2F2F2F"
                      />
                      <path
                        id="Subtract_light_2"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.1537 17.2751L15.4193 16.5406C14.3553 17.1196 13.1987 17.5 12 17.5C10.3282 17.5 8.73816 16.7599 7.36714 15.7735C6.00006 14.79 4.89306 13.5918 4.19792 12.7478C3.77356 12.2326 3.72974 12.1435 3.72974 12C3.72974 11.8565 3.77356 11.7674 4.19792 11.2522C4.86721 10.4396 5.9183 9.29863 7.21572 8.33704L6.50139 7.62271C5.16991 8.63072 4.10383 9.79349 3.42604 10.6164L3.36723 10.6876C3.03671 11.087 2.72974 11.4579 2.72974 12C2.72974 12.5421 3.0367 12.913 3.36723 13.3124L3.42604 13.3836C4.15099 14.2638 5.32014 15.5327 6.78312 16.5853C8.24216 17.635 10.0361 18.5 12 18.5C13.5101 18.5 14.9196 17.9886 16.1537 17.2751ZM9.18993 6.06861C10.0698 5.71828 11.0135 5.5 12 5.5C13.9639 5.5 15.7579 6.365 17.2169 7.41472C18.6799 8.46727 19.849 9.73623 20.574 10.6164L20.6328 10.6876C20.9633 11.087 21.2703 11.4579 21.2703 12C21.2703 12.5421 20.9633 12.913 20.6328 13.3124L20.574 13.3836C20.0935 13.9669 19.418 14.721 18.5911 15.4697L17.883 14.7617C18.6787 14.0456 19.3338 13.3164 19.8021 12.7478C20.2265 12.2326 20.2703 12.1435 20.2703 12C20.2703 11.8565 20.2265 11.7674 19.8021 11.2522C19.107 10.4082 18 9.21001 16.6329 8.22646C15.2619 7.24007 13.6718 6.5 12 6.5C11.3056 6.5 10.6253 6.62768 9.96897 6.84765L9.18993 6.06861Z"
                        fill="#2F2F2F"
                      />
                      <path
                        id="Vector 116_light"
                        d="M5 2L21 18"
                        stroke="#2F2F2F"
                      />
                    </g>
                  </svg>
                )}
                {/* <img src={Pencil} alt="pencil" className="w-6 h-6" /> */}
              </div>
            </div>
            <div className="flex gap-3 py-2 px-3 mb-3 shadow-lg rounded-full">
              <img src={GoogleIcon} alt="google icon" className="w-6" />
              <p>Continue with your Account</p>
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
        <p>or</p>
        <div className="flex flex-col justify-between mt-3 items-center w-full">
          {isData ? (
            <button
              onClick={handleSignUp}
              className="w-full py-2 px-4 text-base rounded-full text-white bg-secondary-600"
            >
              SignUp
            </button>
          ) : (
            <button
              disabled={true}
              className="w-full py-2 px-4 text-base rounded-full text-text-muted bg-neutral-50"
            >
              SignUp
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

export default SignUp;
