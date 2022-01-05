import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/users";
import { FaLock } from "react-icons/fa";
import Logo from "../../assets/userimg.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailerror] = useState(false);
  const [password, setPassword] = useState("");
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onLogin = async () => {
    if (email == "" && password == "") {
      // setError(true);
      toast("Enter valid Credentials");
    } else {
      if (emailError == false) {
        const response = await api.get("/users");
        if (response.status == 200) {
          if (response.data.length > 0) {
            if (
              response.data.find((item) => item.email == email) != undefined
            ) {
              let dataRecieved = response.data.find(
                (item) => item.email == email
              );
              if (dataRecieved.password == password) {
                localStorage.setItem("userId", dataRecieved.id);
                localStorage.setItem("userRole", dataRecieved.role);
                navigate("/home");
              } else {
                toast("Wrong Password");
              }
            } else {
              toast("Enter Valid credentials");
            }
          }
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
      if (emailError == false) {
        setError(false);
      }
    }
  };
  return (
    <>
      <div>
        <LoginWapper>
          <AppIcon>
            <ImageTag src={Logo}></ImageTag>
          </AppIcon>
          <span>Railway Reservation </span>
          <InputWapper>
            <UserIcon>
              <div>
                <FaRegUser />
              </div>
              <TextInput
                type="email"
                onChange={(e) => onEmailEtered(e.target.value)}
                placeholder="Email"
              ></TextInput>
            </UserIcon>
            <ErrorTag>
              {emailError == true ? "Enter Valid Email" : null}
            </ErrorTag>
            <UserIcon>
              <div>
                <FaLock />
              </div>
              <TextInput
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></TextInput>
            </UserIcon>

            <LoginButton onClick={() => onLogin()}> Sign In </LoginButton>
            <div>
              <Link
              className="linktonavigate"
                to="/registration"
              >
                Lost your password ?
              </Link>
              <Link
               className="linktonavigate"
                to="/registration"
              >
                SIGN UP
              </Link>
              <ErrorTag>{error == true ? "Enter Valid Fields" : null}</ErrorTag>
            </div>
          </InputWapper>
        </LoginWapper>
      </div>
      <ToastContainer />
    </>
  );
};
const LoginWapper = styled.div`
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
const AppIcon = styled.div` 
    text-align: center;
    color: white;
    padding: 20px 0 0 0;   
}
`;
const UserIcon = styled.div`
  position: relative;
  div {
    position: absolute;
    top: 8px;
    left: 18px;
    svg {
      color: #e9e9e9;
    }
  }
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
  margin: 20px 20px;
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
  margin: 1em 1em;
  padding: 8px 35px;
  cursor: pointer;
`;
const Atag = styled.a`
  color: #267fff;
`;
const ErrorTag = styled.div`
  text-align: left;
  padding-left: 20px;
  font-size: 12px;
  color: red;
`;

export default Login;
