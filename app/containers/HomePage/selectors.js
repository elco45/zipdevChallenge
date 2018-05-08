import { createSelector } from 'reselect';

const selectHomeDomain = (state) => state.get('home');

const makeSelectHome = () => createSelector(
  selectHomeDomain,
  (substate) => substate.toJS()
);

export default makeSelectHome;
export {
  selectHomeDomain,
};
