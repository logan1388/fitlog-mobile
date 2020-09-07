// Copyright FitBook

import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import produce from 'immer';
import { ProfileModel, CreateProfileModel } from '../commonlib/models/ProfileModel';
import { Action, ActionsUnion } from './actionHelpers';
import ProfilesController, { profileController } from '../domainlogic/controllers/profiles';
import { AppState } from '.';
import { isServiceResponse } from '../commonlib/models/ServiceResponse';
import { statusActions } from './status';

interface ProfileState {
  myProfile?: ProfileModel;
}

export const getInitialProfileState = (): ProfileState => {
  return {
    myProfile: undefined,
  };
};

export enum ProfileActionNames {
  FETCH_MYPROFILE = 'FETCH_MYPROFILE',
  RECEIVE_MYPROFILE = 'RECEIVE_MYPROFILE',
  UPDATE_MYPROFILE = 'UPDATE_MYPROFILE',
}

export const profileActions = {
  editMyProfile: (profile: ProfileModel): Action => ({
    type: ProfileActionNames.UPDATE_MYPROFILE,
    payload: profile,
  }),
  receiveMyProfile: (profile: ProfileModel): Action => ({
    type: ProfileActionNames.RECEIVE_MYPROFILE,
    payload: { profile },
  }),
};

export type Actions = ActionsUnion<typeof profileActions>;

export type ThunkActionCreator = ActionCreator<ThunkAction<void, AppState, ProfilesController, Actions>>;

export const fetchMyProfile: ThunkActionCreator = () => async (dispatch: Dispatch) => {
  dispatch(statusActions.setPending(ProfileActionNames.FETCH_MYPROFILE));
  const r = await profileController.getMyProfile();
  dispatch(statusActions.resetPending(ProfileActionNames.FETCH_MYPROFILE));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(ProfileActionNames.FETCH_MYPROFILE, r));
  } else {
    dispatch(profileActions.receiveMyProfile(r));
    dispatch(statusActions.resetError(ProfileActionNames.FETCH_MYPROFILE));
  }
};

export const updateMyProfile: ThunkActionCreator = (data: CreateProfileModel, onSuccessCallback: () => void) => async (
  dispatch: Dispatch
) => {
  dispatch(statusActions.setPending(ProfileActionNames.UPDATE_MYPROFILE));
  const r = await profileController.saveProfileInfo(data);
  dispatch(statusActions.resetPending(ProfileActionNames.UPDATE_MYPROFILE));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(ProfileActionNames.UPDATE_MYPROFILE, r));
  } else {
    dispatch(profileActions.receiveMyProfile(r));
    dispatch(statusActions.resetError(ProfileActionNames.UPDATE_MYPROFILE));
    onSuccessCallback();
  }
};

export const profileReducer = (state: ProfileState = getInitialProfileState(), action: Actions): ProfileState => {
  switch (action.type) {
    case ProfileActionNames.RECEIVE_MYPROFILE: {
      const { profile } = action.payload;
      return produce(state, draft => {
        draft.myProfile = profile;
      });
    }
    default:
      return state;
  }
};
