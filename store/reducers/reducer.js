import {
    FETCH_EXERCISES_BEGIN,
    FETCH_EXERCISES_SUCCESS,
    FETCH_EXERCISES_FAILURE,
    EXPAND_EXERCISE_SUCCESS,
    EXPAND_EXERCISE_FAILURE,
    CLOSE_EXPANDEXERCISE_SUCCESS,
    ADD_EXERCISELOG_BEGIN,
    ADD_EXERCISELOG_SUCCESS,
    ADD_EXERCISELOG_FAILURE,
    LOGIN_BEGIN,
    FETCH_WORKOUTHISTORY,
    FETCH_ACTIVITY,
    FETCH_BESTSETS,
    FETCH_MAXREPS,
    FETCH_MAXTIME,
    FETCH_WORKOUTSUMMARY,
    FETCH_AWARDSWEEK,
    FETCH_AWARDSHISTORY,
    FETCH_LOGSWEEK,
    FETCH_HOMEWORKOUTLOG_SUCCESS
} from "../actions/actions";

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_RESET,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT_SUCCESS,
    CLEAR_REGISTERERROR,
    CLEAR_LOGINERROR,
} from '../actions/auth';

const initialState = {
    user: {},
    workouts: [],
    logs: [],
    workoutHistory: [],
    workoutSummary: [],
    activity: [],
    loading: false,
    error: null,
    loginError: null,
    registerError: null,
    isAuthenticated: false,
    register: false,
    maxWeight: null,
    maxReps: null,
    maxTime: null,
    bestSet: null,
    awardsWeek: [],
    awards: [],
    logsWeek: [],
    homeworkoutlogs: []
};

export default function fitlogReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case FETCH_EXERCISES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_EXERCISES_SUCCESS:
            return {
                ...state,
                loading: false,
                workouts: action.payload.exercises
            };

        case FETCH_EXERCISES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                workouts: []
            };

        case EXPAND_EXERCISE_SUCCESS:
            return {
                ...state,
                loading: false,
                expandExercise: true,
                logs: action.payload.logs
            };

        case EXPAND_EXERCISE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                logs: []
            };

        case CLOSE_EXPANDEXERCISE_SUCCESS:
            return {
                ...state,
                loading: false,
                expandExercise: false,
                workouts: action.payload.exercises
            };

        case ADD_EXERCISELOG_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ADD_EXERCISELOG_SUCCESS:
            return {
                ...state,
                loading: false,
                logs: action.payload.logs
            };

        case ADD_EXERCISELOG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                logs: []
            };

        case FETCH_WORKOUTHISTORY:
            return {
                ...state,
                loading: false,
                workoutHistory: action.payload.workoutHist
            };

        case FETCH_WORKOUTSUMMARY:
            return {
                ...state,
                loading: false,
                workoutSummary: action.payload.workoutSummary
            };

        case FETCH_ACTIVITY:
            return {
                ...state,
                loading: false,
                activity: action.payload.activity
            };

        case FETCH_BESTSETS:
            return {
                ...state,
                loading: false,
                maxWeight: action.payload.maxWeight,
                maxReps: action.payload.maxReps,
                bestSet: action.payload.bestSet
            };

        case FETCH_MAXREPS:
            return {
                ...state,
                loading: false,
                maxReps: action.payload.maxReps,
            };

        case FETCH_MAXTIME:
            return {
                ...state,
                loading: false,
                maxTime: action.payload.maxTime,
            };

        case FETCH_AWARDSWEEK:
            return {
                ...state,
                loading: false,
                awardsWeek: action.payload.awards
            };

        case FETCH_AWARDSHISTORY:
            return {
                ...state,
                loading: false,
                awards: action.payload.awards
            };

        case FETCH_LOGSWEEK:
            return {
                ...state,
                loading: false,
                logsWeek: action.payload.logsWeek
            };

        case FETCH_HOMEWORKOUTLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                homeworkoutlogs: action.payload.homeworkoutlogs
            };

        case LOGIN_BEGIN:
            return {
                ...state,
                loading: true,
                registerError: null
            };

        case LOGIN_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isAuthenticated: true
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                loginError: action.payload.error.response.data
            };

        case REGISTER_RESET:
            return {
                ...state,
                register: false
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                register: true,
                registerError: null
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                register: false,
                registerError: action.payload.error.response.data
            };

        case CLEAR_REGISTERERROR:
            return {
                ...state,
                registerError: null
            };

        case CLEAR_LOGINERROR:
            return {
                ...state,
                loginError: null
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: {},
                isAuthenticated: false
            };

        default:
            return state;
    }
}