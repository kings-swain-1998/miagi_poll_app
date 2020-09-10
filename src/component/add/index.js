import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { acAddPollRq, getPollRq } from "../../redux/action";
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
    const date = new Date();
    const now = moment(date).format("YYYY-MM-DDThh:mm:ss.000000") + "Z";
    const pollItemId = props.listPoll.length;
    const id = props.listPoll[pollItemId - 1].id;
    if (inputValue) {
      props.addPoll({
        content: inputValue,
        created_at: now,
        id: id + 1,
      });
    }
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
    addPoll: (data) => {
      return dispatch(acAddPollRq(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Addpoll);
