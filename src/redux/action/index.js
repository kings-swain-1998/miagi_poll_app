import Axios from "axios";
import * as Types from "../constant/index";

// login

export const acLoginRq = (data) => {
  return (dispatch) => {
    Axios.post("https://dev.miagi-so.net/api/v1/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userId", res.data.data.user.id);
        localStorage.setItem("userName", res.data.data.user.display_name);
        window.location.reload();
        return dispatch(acLogin(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const acLogin = (data) => {
  return {
    type: Types.LOGIN_SUCCES,
    payload: data.data,
  };
};

export const acLogoutRq = () => {
  localStorage.clear();
  return {
    type: Types.LOGIN_FAIL,
  };
};
// get poll

export const getPollRq = () => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    Axios.get("https://dev.miagi-so.net/api/v1/poll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(acLogged());
        dispatch(getPoll(res.data));
        return dispatch(loadingSucces());
      })
      .catch((err) => {
        console.log(err);
        dispatch(acLogoutRq());
      });
  };
};

export const getPoll = (data) => {
  return {
    type: Types.GET_DATA_SUCCES,
    payload: data,
  };
};

export const acLogged = () => {
  return {
    type: Types.LOGGED_IN,
  };
};

// add poll

export const acAddPollRq = (data, dataLocal) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    Axios.post("https://dev.miagi-so.net/api/v1/poll/store", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return dispatch(loadingSucces());
      })
      .catch((err) => {
        return dispatch(loadingSucces());
      });
  };
};

export const acAddPoll = (data) => {
  return {
    type: Types.ADD_POLL_SUCCES,
    payload: data,
  };
};

// get item show poll

export const acGetItemPoll = (id) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    Axios.get(`https://dev.miagi-so.net/api/v1/poll/${id}/show`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getItemPoll(res.data));
        return dispatch(loadingSucces());
      })
      .catch((err) => console.log(err));
  };
};

export const getItemPoll = (data) => {
  return {
    type: Types.GET_POLL_ITEM_SUCCES,
    payload: data,
  };
};

// add item question poll

export const addItemQuestionLocal = (data) => {
  return {
    type: Types.ADD_POLL_ITEM_SUCCES,
    payload: data,
  };
};

export const editContentLocal = (id, data) => {
  return {
    type: Types.EDIT_POLL_CONTENT_SUCCES,
    payload: data,
    id: id,
  };
};

export const addItemQuestionServer = (id, data) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    Axios.patch(`https://dev.miagi-so.net/api/v1/poll/${id}/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(loadingSucces());
        dispatch(editContentLocal(id, data));
        return dispatch(addItemQuestionLocal(data));
      })
      .catch((err) => console.log(err));
  };
};

//  remove question item

export const removeItemQuestionLocal = (data) => {
  return {
    type: Types.REMOVE_POLL_ITEM_SUCCES,
    payload: data,
  };
};

// edit question

export const editQuestionRq = (data, id) => {
  return {
    type: Types.EDIT_QUESTION,
    payload: {
      data: data,
      id: id,
    },
  };
};

// loading
export const loadingSucces = () => {
  return {
    type: Types.LOADING_SUCCES,
    payload: true,
  };
};

export const loadingFail = () => {
  return {
    type: Types.LOADING_FAIL,
    payload: false,
  };
};

// delete

export const deleteQuestion = (id) => {
  return {
    type: Types.DELETE_SUCCES,
    payload: id,
  };
};
