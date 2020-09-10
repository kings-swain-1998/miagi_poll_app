import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { acLoginRq } from "../../redux/action";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Home.propTypes = {};

function Home(props) {
  const [valueForm, setValueForm] = useState({
    email: "",
    password: "",
  });
  const [loginSucess, setLoginSucces] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValueForm({
      ...valueForm,
      [name]: value,
    });
  };
  const notify = (title) => toast(title);
  const onSubmit = (e) => {
    e.preventDefault();
    props.loginRq(valueForm);
    if (!valueForm.email) {
      return notify("Email not emty");
    }
    if (!valueForm.password) {
      return notify("Password not emty");
    }
    if (props.islogin.isLogout === true) {
      return notify("Wrong account or password");
    }
    if (props.islogin.isLogin === true) {
      return <Redirect to="/poll"></Redirect>;
    }
  };

  return (
    <>
      {props.islogin.isLogin === true ? (
        <Redirect to="/poll"></Redirect>
      ) : (
        <div className="home">
          <div className="home__logo">
            <div className="home__img"></div>
          </div>
          <form onSubmit={onSubmit} className="home__form">
            <input
              placeholder="Email"
              className="home__input"
              name="email"
              value={valueForm.email}
              onChange={handleChange}
            ></input>
            <input
              placeholder="Password"
              className="home__input"
              name="password"
              type="password"
              value={valueForm.password}
              onChange={handleChange}
            ></input>
            <button type="submit" className="home__btn">
              Login
            </button>
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    islogin: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRq: (data) => {
      dispatch(acLoginRq(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
