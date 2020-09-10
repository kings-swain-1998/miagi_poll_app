import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { acGetItemPoll, loadingFail } from "../../redux/action";
import "./style.scss";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router";

Vote.propTypes = {};

function Vote(props) {
  useEffect(() => {
    const id = props.match.match.params.id;
    props.showPoll(id);
  }, []);
  const [active, setActive] = useState(-1);
  const [idQuestion, setIdQuestion] = useState();
  const [send, setSend] = useState(false);
  const handleVote = (i, item) => {
    setActive(i);
    setIdQuestion(item.id);
  };
  const handleClassVote = (i) => {
    if (i === active) {
      return "vote__icon--active";
    } else {
      return "vote__icon--nonActive";
    }
  };
  const showVoted = () => {
    if (active === -1) {
      if (props.pollItem.poll_question) {
        return props.pollItem.poll_question.map((item, i) => {
          if (item.poll_answer) {
            return item.poll_answer.filter((idItem) => {
              const id = localStorage.getItem("userId");
              if (idItem.user_id === parseInt(id)) {
                return setActive(i);
              }
            });
          }
        });
      }
    }
  };
  showVoted();
  const showVote = () => {
    return (
      <div className="vote__main">
        <p className="vote__title">{props.pollItem.content}</p>
        <div>
          {props.pollItem.poll_question ? (
            props.pollItem.poll_question.map((item, i) => {
              return (
                <div
                  key={i}
                  className="vote__item"
                  onClick={() => handleVote(i, item)}
                >
                  <div className="vote__check">
                    <i
                      className={`fa fa-check vote__icon ${handleClassVote(i)}`}
                      aria-hidden="true"
                    ></i>
                  </div>
                  <p className="vote__name">{item.content}</p>
                </div>
              );
            })
          ) : (
            <p></p>
          )}
        </div>
      </div>
    );
  };

  const votePoll = () => {
    const data = {
      user_id: localStorage.getItem("userId"),
      question_id: idQuestion,
    };

    const token = localStorage.getItem("token");
    Axios.post("https://dev.miagi-so.net/api/v1/poll/answer/store", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setSend(true))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {send === false ? (
        <div className="vote">
          {showVote()}
          <button className="vote__btn" onClick={votePoll}>
            Send
          </button>
        </div>
      ) : (
        <Redirect to="/poll"></Redirect>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    pollItem: state.poll_item,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showPoll: (id) => {
      return dispatch(acGetItemPoll(id));
    },
    acLoadingFail: () => {
      dispatch(loadingFail());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
