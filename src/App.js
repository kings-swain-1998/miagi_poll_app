import React, { useState, useEffect } from "react";
import "./App.scss";
import Navbar from "./component/navbar";
import Home from "./component/home/index";
import { connect } from "react-redux";
import { getPollRq, loadingSucces, loadingFail } from "./redux/action";
import { Switch, Route } from "react-router";
import { Redirect } from "react-router-dom";
import router from "./router/index";
import ReactLoading from "react-loading";

function App(props) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.getFirstData();
    } else {
      props.acLoadingSucces();
    }
  }, []);

  function showRoute(routes) {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, i) => {
        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            component={
              props.isLogin.isLogin === false ? (
                <Redirect to="/"></Redirect>
              ) : (
                route.main
              )
            }
          />
        );
      });
    }

    return result;
  }

  return (
    <div className="app">
      {props.loading.loading === false ? (
        <ReactLoading type="spin" color="#000000" className="poll__loading" />
      ) : (
        <>
          <Navbar></Navbar>
          <Home></Home>
          <Switch>{showRoute(router)}</Switch>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFirstData: () => {
      return dispatch(getPollRq());
    },
    acLoadingSucces: () => {
      return dispatch(loadingSucces());
    },
    acloadingFail: () => {
      return dispatch(loadingFail());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
