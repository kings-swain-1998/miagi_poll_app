import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./style.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router";

Detail.propTypes = {};

function Detail(props) {
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = props.match.match.params.id;
    async function fetchDetailPoll() {
      const data = await Axios.get(
        `https://dev.miagi-so.net/api/v1/poll/${id}/show`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));
      setItem(data);
    }
    fetchDetailPoll();
  }, []);

  const showUserPollAnswer = (poll_item) => {
    if (poll_item.poll_answer.length > 0) {
      return poll_item.poll_answer.map((poll_answer_item, i) => {
        return (
          <p className="detail__question-user" key={i}>
            {poll_answer_item.user.display_name}
          </p>
        );
      });
    }
  };

  const handleClassAnswer = (i) => {
    if (i === show) {
      return `detail__question-answer--show detail__question-answer--${i}`;
    } else {
      return "detail__question-answer";
    }
  };

  const setShowAnswer = (i) => {
    setShow(i);
    if (show === i) {
      setShow(-1);
    }
  };
  const rotateIcon = (i) => {
    if (i === show) {
      return "detail__question-icon--active";
    }
  };

  const showPollQuestion = (poll_question) => {
    let index = 0;
    const total_poll_answer = poll_question.map((a) => {
      return (index += a.poll_answer.length);
    });

    return poll_question.map((poll_item, i) => {
      return (
        <div key={i} className="detail__question-item">
          <p className="detail__question-title">{poll_item.content}</p>
          <p className="detail__question-number">
            {poll_item.poll_answer.length > 0
              ? Math.round((poll_item.poll_answer.length / index) * 100 * 100) /
                100
              : 0}
            %
          </p>
          <i
            className={`fa fa-angle-right detail__question-icon ${rotateIcon(
              i
            )}`}
            aria-hidden="true"
            onClick={() => setShowAnswer(i)}
          ></i>
          <div className={`detail__question-answer ${handleClassAnswer(i)}`}>
            {showUserPollAnswer(poll_item)}
          </div>
        </div>
      );
    });
  };

  const showItem = () => {
    if (item) {
      return (
        <div className="detail__main">
          <p className="detail__main-title">{item.content}</p>
          <div className="detail__question">
            {showPollQuestion(item.poll_question)}
          </div>
        </div>
      );
    }
  };
  return props.isLogin.isLogin === false ? (
    <Redirect to="/"></Redirect>
  ) : (
    <div className="detail">{showItem()}</div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user,
  };
};

export default connect(mapStateToProps, null)(Detail);
