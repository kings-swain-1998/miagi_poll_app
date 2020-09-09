import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { acAddPollRq } from "../../redux/action";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router";
import moment from "moment";

Addpoll.propTypes = {};

function Addpoll(props) {
  const [inputValue, setInputValue] = useState("");
  const handleChangePoll = (e) => {
    setInputValue(e.target.value);
  };
  const addPollAc = () => {
    props.addPoll({ content: inputValue });
    // props.match.history.push("/poll");
    // console.log(props.match);
    window.location.reload();
  };
  return (
    <div className="add">
      <input
        placeholder="My Polls"
        className="add__input"
        value={inputValue}
        onChange={handleChangePoll}
      ></input>
      <button className="add__btn" onClick={addPollAc}>
        Add new
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPoll: (data, dataLocal) => {
      return dispatch(acAddPollRq(data, dataLocal));
    },
  };
};

export default connect(null, mapDispatchToProps)(Addpoll);
