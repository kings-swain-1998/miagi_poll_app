import React from "react";
import Home from "../component/home";
import Detail from "../component/poll_detail/index";
import Poll from "../component/poll_list/index";
import Edit from "../component/edit";
import Vote from "../component/vote";

const router = [
  // {
  //   path: "/",
  //   exact: true,
  //   main: (match) => <Home match={match}></Home>,
  // },
  {
    path: "/poll",
    exact: false,
    main: (match) => <Poll match={match}></Poll>,
  },
  ,
  {
    path: "/poll-edit/:id/:name",
    exact: false,
    main: (match) => <Edit match={match}></Edit>,
  },

  ,
  {
    path: "/polldetail/:id",
    exact: false,
    main: (match) => <Detail match={match}></Detail>,
  },
  {
    path: "/vote/:id",
    exact: false,
    main: (match) => <Vote match={match}></Vote>,
  },
];

export default router;
