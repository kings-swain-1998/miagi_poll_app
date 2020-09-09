import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { getPollRq, loadingFail } from "../../redux/action";
import { connect } from "react-redux";
import "./style.scss";
import { Link, Redirect } from "react-router-dom";
import Addpoll from "../add";
import moment from "moment";
import ReactLoading from "react-loading";

Poll.propTypes = {};

function Poll(props) {
  useEffect(() => {
    props.getPoll();
  }, []);

  const showListPoll = () => {
    if (props.poll.length > 0) {
      return props.poll[0].map((item, i) => {
        return (
          <Link className="poll__item" to={`/polldetail/${item.id}`} key={i}>
            <p className="poll__item-name">{item.content}</p>
            <div>
              <Link to={`/vote/${item.id}`} className="poll__item-icon">
                <i class="fa fa-check" aria-hidden="true"></i>
              </Link>
              <Link
                to={`/poll-edit/${item.id}/${item.content}`}
                className="poll__item-icon"
              >
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </Link>
              <Link className="poll__item-icon">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </Link>
            </div>
            <p className="poll__item-date">
              {moment(item.created_at).format("YYYY/MM/DD  h:mm")}
            </p>
          </Link>
        );
      });
    }
  };

  return (
    <div className="poll">
      <div className="poll__form">
        <Addpoll match={props.match}></Addpoll>
      </div>
      {showListPoll()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    poll: state.poll,
    islogin: state.user,
    loading: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPoll: () => {
      dispatch(getPollRq());
    },
    acLoadingFail: () => {
      dispatch(loadingFail());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
