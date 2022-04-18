import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
} from "./types";
import jsonServer from "../apis/jsonServer";
import history from "../history";
import _ from "lodash";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formData) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await jsonServer.post("/streams", { ...formData, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });

  history.push("/");
};

export const editStream = (id, formData) => async (dispatch) => {
  const editData = _.pick(formData, "title", "description");
  const response = await jsonServer.patch(`/streams/${id}`, editData);

  dispatch({ type: EDIT_STREAM, payload: response.data });

  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await jsonServer.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await jsonServer.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const fetchStreams = () => async (dispatch) => {
  const response = await jsonServer.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};
