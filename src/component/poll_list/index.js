import React, { useEffect } from "react";
import { getPollRq, loadingFail } from "../../redux/action";
import { connect } from "react-redux";
import "./style.scss";
import { Link, Redirect } from "react-router-dom";
import Addpoll from "../add";
import moment from "moment";

Poll.propTypes = {};

function Poll(props) {
  useEffect(() => {
    props.getPoll();
  }, []);

  const showListPoll = () => {
    if (props.poll.length > 0) {
      return props.poll[0].map((item, i) => {
        return (
          <div className="poll__item" key={i}>
            <Link className="poll__item-content" to={`/polldetail/${item.id}`}>
              <p className="poll__item-name">{item.content}</p>
            </Link>
            <div>
              <Link to={`/vote/${item.id}`} className="poll__item-icon">
                <i className="fa fa-check" aria-hidden="true"></i>
              </Link>
              <Link
                to={`/poll-edit/${item.id}/${item.content}`}
                className="poll__item-icon"
              >
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </Link>
              <Link className="poll__item-icon" to="/poll">
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </Link>
            </div>
            <p className="poll__item-date">
              {moment(item.created_at).format("YYYY/MM/DD  h:mm")}
            </p>
          </div>
        );
      });
    }
  };

  return props.isLogin.isLogin === false ? (
    <Redirect to="/"></Redirect>
  ) : (
    <div className="poll">
      <div className="poll__form">
        <Addpoll listPoll={props.poll[0]} match={props.match}></Addpoll>
      </div>
      {showListPoll()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    poll: state.poll,
    isLogin: state.user,
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
