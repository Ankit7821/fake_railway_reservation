import React, { useState } from "react";
import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";
import api from "../../api/users";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailerror] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmpasswordError, setConfirmPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [error, setError] = useState(false);
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexp = /^[0-9\b]+$/;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const OnRegisterClick = async () => {
    if (
      email == "" &&
      password == "" &&
      confirmPassword == "" &&
      phoneNumber == ""
    ) {
      setError(true);
    } else {
      if (
        emailError == false &&
        passwordError == false &&
        confirmpasswordError == false &&
        phoneError == false
      ) {
        const payload = {
          id: uuidv4(),
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        };
        const request = await api.post("/users", payload);
        if (request.status == 201) {
          toast("Registered Successfully");
        }
      }
    }
  };
  const onEmailEtered = (value) => {
    const enteredEmail = value.match(re);
    if (enteredEmail == null) {
      setEmailerror(true);
    } else {
      setEmailerror(false);
      setEmail(value);
      if (
        emailError == false &&
        passwordError == false &&
        confirmpasswordError == false &&
        phoneError == false
      ) {
        setError(false);
      }
    }
  };
  const onPasswordEntered = (value) => {
    if (value.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPassword(value);
      if (
        emailError == false &&
        passwordError == false &&
        confirmpasswordError == false &&
        phoneError == false
      ) {
        setError(false);
      }
    }
  };
  const onConfirmPasswordEntered = (value) => {
    if (value == password) {
      setConfirmPasswordError(false);
      setConfirmPassword(value);
      if (
        emailError == false &&
        passwordError == false &&
        confirmpasswordError == false &&
        phoneError == false
      ) {
        setError(false);
      }
    } else {
      setConfirmPasswordError(true);
    }
  };
  const onPhonenumberEntered = (value) => {
    const enteredPhone = regexp.test(value);
    if (enteredPhone == false || value.length < 10) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
      setPhoneNumber(value);
      if (
        emailError == false &&
        passwordError == false &&
        confirmpasswordError == false &&
        phoneError == false
      ) {
        setError(false);
      }
    }
  };
  return (
    <div>
      <RagiWapper>
        <span>Registration</span>
        <InputWapper>
          <UserIcon>
            <div>
              <FaRegUser />
            </div>
            <TextInput
              placeholder="Email"
              type="email"
              onChange={(e) => onEmailEtered(e.target.value)}
            ></TextInput>
          </UserIcon>
          <ErrorTag>{emailError == true ? "Enter Valid Email" : null}</ErrorTag>
          <UserIcon>
            <div>
              <FaLock />
            </div>
            <TextInput
              placeholder="Password"
              type="password"
              maxLength={12}
              onChange={(e) => onPasswordEntered(e.target.value)}
            ></TextInput>
          </UserIcon>
          <ErrorTag>
            {passwordError == true ? "Enter atleast 8 length password" : null}
          </ErrorTag>
          <UserIcon>
            <div>
              <FaLock />
            </div>
            <TextInput
              placeholder="Confirm Password"
              type="password"
              maxLength={12}
              onChange={(e) => onConfirmPasswordEntered(e.target.value)}
            ></TextInput>
          </UserIcon>
          <ErrorTag>
            {confirmpasswordError == true
              ? "Confirm password should be same as password"
              : null}
          </ErrorTag>
          <UserIcon>
            <div>
              <FaPhoneVolume />
            </div>
            <TextInput
              maxLength={10}
              placeholder="Phone Number"
              onChange={(e) => onPhonenumberEntered(e.target.value)}
            ></TextInput>
          </UserIcon>
          <ErrorTag>
            {phoneError == true ? "Enter 10 digit number" : null}
          </ErrorTag>

          <LoginButton onClick={() => OnRegisterClick()}>
            {" "}
            Registration{" "}
          </LoginButton>
          <ErrorTag>{error == true ? "Enter Valid Fields" : null}</ErrorTag>
        </InputWapper>
      </RagiWapper>
      <ToastContainer />
    </div>
  );
};

const RagiWapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background: rgba(40, 75, 99, 0.8); */
  background-size: cover;
  border: 8px solid #e9e9e9;
  border-radius: 15px 0 15px 0;
  text-align: center;
  padding: 20px;
  -webkit-transition: color 0.25s;
  transition: color 0.25s;
  &::before,
  &::after {
    box-sizing: inherit;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &::before,
  &::after {
    border: 8px solid transparent;
    width: 0;
    height: 0;
  }
  &::before {
    top: 0;
    left: 0;
  }
  &::after {
    bottom: 0;
    right: 0;
  }
  &:hover {
    color: #267fff;
  }
  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
  }
  &:hover::before {
    border-top-color: #267fff;
    border-right-color: #267fff;
    -webkit-transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }
  &:hover::after {
    border-bottom-color: #267fff;
    border-left-color: #267fff;
    -webkit-transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
    transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
  }

  span {
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    color: #267fff;
  }
`;

const UserIcon = styled.div`
  position: relative;
  div {
    position: absolute;
    top: 8px;
    left: 18px;
    svg {
      color: #c7c7c7;
    }
  }
`;

const ErrorTag = styled.div`
  text-align: left;
  padding-left: 20px;
  font-size: 12px;
  color: red;
`;
const ImageTag = styled.img`
  display: inline-block;
  height: 100px;
  width: 100px;
`;
const InputWapper = styled.div`
  z-index: 9999999;
  position: relative;
`;
const TextInput = styled.input`
  margin: 20px 20px 5px 20px;
  border-bottom: 1px solid #267fff;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
  padding: 10px 73px 10px 20px;
  display: block;
  outline: unset;
`;
const LoginButton = styled.button`
  background: transparent;
  border-radius: 15px;
  border: 1px solid #267fff;
  color: #267fff;
  margin: 2em 1em 1em 1em;
  padding: 8px 35px;
  cursor: pointer;
`;

export default Registration;
