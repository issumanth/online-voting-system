const defaultState = {
  status: "not_started"
};

export const getElection = () => {
  return JSON.parse(localStorage.getItem("election")) || defaultState;
};

export const setElection = (state) => {
  localStorage.setItem("election", JSON.stringify(state));
};