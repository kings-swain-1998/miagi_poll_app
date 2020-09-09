import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  acGetItemPoll,
  addItemQuestionLocal,
  addItemQuestionServer,
  editQuestionRq,
  deleteQuestion,
} from "../../redux/action";
import { connect } from "react-redux";
import "./style.scss";
import { Redirect } from "react-router";

Edit.propTypes = {};

function Edit(props) {
  const [valueInput, setValueInput] = useState("");
  const [activeEdit, setActiveEdit] = useState(false);
  const [idEdit, setIdEdit] = useState();
  const [valueContent, setValueContent] = useState("");
  const [activeContent, setActiveContent] = useState(false);

  useEffect(() => {
    const id = props.match.match.params.id;
    const name = props.match.match.params.name;
    props.getItemPoll(id);
    setValueContent(name);
  }, []);

  const handleEditPoll = (item, id) => {
    setActiveEdit(true);
    setValueInput(item);
    setIdEdit(id);
  };

  const showItemQuestionPoll = () => {
    if (props.poll_item) {
      if (props.poll_item.poll_question) {
        return props.poll_item.poll_question.map((item, i) => {
          return (
            <div className="edit__main-item">
              <p className="edit__main-name" key={i}>
                {item.content}
              </p>
              <i
                class="fa fa-pencil edit__main-icon"
                aria-hidden="true"
                onClick={() => handleEditPoll(item.content, item.id)}
              ></i>
              <i
                class="fa fa-times edit__main-icon"
                aria-hidden="true"
                onClick={() => deleteQuestion(item.id)}
              ></i>
            </div>
          );
        });
      }
    }
  };

  const deleteQuestion = (id) => {
    props.deleteQuestion(id);
  };

  const handleChangeInput = (e) => {
    setValueInput(e.target.value);
  };
  const addQuestionLocal = () => {
    if (activeEdit === false) {
      const data = { content: valueInput };
      props.addQuestion(data);
      setValueInput("");
    } else {
      props.editQuestion(valueInput, idEdit);
      setActiveEdit(false);
      setValueInput("");
    }
  };

  const addItemQuestion = () => {
    const arr = props.poll_item.poll_question;
    const arrMapped = arr.map((item) => {
      return item.content;
    });
    const id = props.match.match.params.id;
    const data = { content: valueContent, questions: arrMapped };
    props.addQuestionServer(id, data);
    setActiveContent(false);
    props.match.history.push("/poll");
  };
  const handleAddOrEdit = () => {
    if (activeEdit === false) {
      return "Add";
    } else {
      return "Edit";
    }
  };

  const handleChangeContent = (e) => {
    setValueContent(e.target.value);
  };

  return (
    <div className="edit">
      <div className="edit__main">
        <input
          className="edit__main-content"
          value={valueContent}
          onChange={handleChangeContent}
        ></input>
        <div className="edit__main-control">
          <input
            className="edit__main-input"
            placeholder="Add option"
            value={valueInput}
            onChange={handleChangeInput}
          ></input>
          <button className="edit__main-btn" onClick={addQuestionLocal}>
            {handleAddOrEdit()}
          </button>
        </div>
        <div>{showItemQuestionPoll()}</div>
      </div>
      <button className="edit__btn" onClick={addItemQuestion}>
        Create
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getItemPoll: (id) => {
      return dispatch(acGetItemPoll(id));
    },
    addQuestion: (data) => {
      return dispatch(addItemQuestionLocal(data));
    },
    addQuestionServer: (id, data) => {
      return dispatch(addItemQuestionServer(id, data));
    },
    editQuestion: (data, id) => {
      return dispatch(editQuestionRq(data, id));
    },
    deleteQuestion: (id) => {
      return dispatch(deleteQuestion(id));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    poll_item: state.poll_item,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
