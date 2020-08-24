import axios from 'axios';
import moment from 'moment';
import { endpoint } from '../../config';

export const FETCH_EXERCISES_BEGIN = "FETCH_EXERCISES_BEGIN";
export const FETCH_EXERCISES_SUCCESS = "FETCH_EXERCISES_SUCCESS";
export const FETCH_EXERCISES_FAILURE = "FETCH_EXERCISES_FAILURE";

export const EXPAND_EXERCISE_SUCCESS = "EXPAND_EXERCISE_SUCCESS";
export const EXPAND_EXERCISE_FAILURE = "EXPAND_EXERCISE_FAILURE";

export const CLOSE_EXPANDEXERCISE_BEGIN = "CLOSE_EXPANDEXERCISE_BEGIN";
export const CLOSE_EXPANDEXERCISE_SUCCESS = "CLOSE_EXPANDEXERCISE_SUCCESS";
export const CLOSE_EXPANDEXERCISE_FAILURE = "CLOSE_EXPANDEXERCISE_FAILURE";

export const ADD_EXERCISELOG_BEGIN = "ADD_EXERCISELOG_BEGIN";
export const ADD_EXERCISELOG_SUCCESS = "ADD_EXERCISELOG_SUCCESS";
export const ADD_EXERCISELOG_FAILURE = "ADD_EXERCISELOG_FAILURE";

export const FETCH_WORKOUTHISTORY = "FETCH_WORKOUTHISTORY";
export const FETCH_WORKOUTSUMMARY = "FETCH_WORKOUTSUMMARY";
export const FETCH_ACTIVITY = "FETCH_ACTIVITY";
export const FETCH_BESTSETS = "FETCH_BESTSETS";
export const FETCH_MAXREPS = "FETCH_MAXREPS";
export const FETCH_MAXTIME = "FETCH_MAXTIME";
export const FETCH_AWARDSWEEK = "FETCH_AWARDSWEEK";
export const FETCH_AWARDSHISTORY = "FETCH_AWARDSHISTORY";
export const FETCH_LOGSWEEK = "FETCH_LOGSWEEK";
export const FETCH_HOMEWORKOUTLOG_SUCCESS = "FETCH_HOMEWORKOUTLOG_SUCCESS";
export const SET_THEME = "SET_THEME";

export const fetchExercises = (workout) => {
    return dispatch => {
        dispatch(fetchExercisesBegin());
        axios.get(`${endpoint}/api/exercises/${workout}`)
            .then(res => {
                var exercises = res.data;
                exercises.map(e => {
                    e.open = false;
                    e.log = null;
                });
                dispatch(fetchExercisesSuccess(exercises));
                return exercises;
            })
            .catch(error => dispatch(fetchExercisesFailure(error)));
    };
};

export const expandExercise = (workouts, category, name, userId) => {
    return (dispatch, getState) => {
        // console.log('Get state ', getState());
        workouts.map(e => {
            if (e.name !== name && e.open === true) {
                e.open = false;
                e.log = null;
            }
        });
        let exercise = {
            userId: userId,
            category: category,
            name: name
        };
        dispatch(bestSets(userId, category, name));
        axios.post(endpoint + '/api/workoutlog/log', exercise)
            .then(res => {
                var logs = res.data;
                logs.map(log => {
                    log.date = moment(log.date).utc().local().format('MM/DD/YY HH:mm')
                });
                dispatch(expandExerciseSuccess(logs));
                return logs;
            })
            .catch(error => dispatch(expandExerciseFailure(error)));
    };
};

export const fetchHomeWorkoutLog = (category, name, userId) => {
    return dispatch => {
        let exercise = {
            userId: userId,
            category: category,
            name: name
        };
        dispatch(maxReps(userId, name));
        dispatch(maxTime(userId, name));
        axios.post(endpoint + '/api/homeworkoutlog/log', exercise)
            .then(res => {
                var logs = res.data;
                console.log('Home workoutlog ', logs);
                logs.map(log => {
                    log.date = moment(log.date).utc().local().format('MM/DD/YY HH:mm')
                });
                dispatch(fetchHomeworkoutLogSuccess(logs));
                return logs;
            })
            .catch(error => console.log(error));
    };
};

export const closeExpandExercise = (workouts, exercise) => {
    return dispatch => {
        workouts.map(e => {
            if (e.name !== exercise) {
                e.open = false;
                e.log = null;
            }
        });
        dispatch(closeExpandExerciseSuccess(workouts));
    }
};

export const addExerciseLog = (exerciseLog, logToBeUpdated, workouts) => {
    return dispatch => {
        logToBeUpdated.push(exerciseLog);
        axios.post(endpoint + '/api/workoutlog/', exerciseLog)
            .then(res => {
                dispatch(addBestSets(exerciseLog, workouts));
                dispatch(addTodayWorkout(exerciseLog.userId, exerciseLog.category, exerciseLog.date));
                dispatch(workoutSummary(exerciseLog.userId))
                return logToBeUpdated;
            })
            .catch(error => dispatch(addExerciseLogFailure(error)));
    }
};

export const addTodayWorkout = (userId, category, date) => {
    return dispatch => {
        let workout = {
            userId: userId,
            category: category,
            date: date
        }
        axios.post(endpoint + '/api/workout/', workout)
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    }
};

export const addBestSets = (exerciseLog, workouts) => {
    return dispatch => {
        axios.post(endpoint + '/api/bestset/', exerciseLog)
            .then(res => {
                dispatch(expandExercise(workouts, exerciseLog.category, exerciseLog.name, exerciseLog.userId));
            })
            .catch(error => console.log(error));
    }
};

export const bestSets = (userId, category, name) => {
    return dispatch => {
        let bestSetsRequest = {
            "userId": userId,
            "category": category,
            "name": name
        };
        axios.post(endpoint + '/api/bestset/set', bestSetsRequest)
            .then(res => {
                dispatch(fetchBestSetsSuccess(res.data.maxWeight, res.data.maxReps, res.data.bestSet));
            })
            .catch(error => console.log(error));
    }
};

export const maxReps = (userId, name) => {
    return dispatch => {
        let maxRepsRequest = {
            "userId": userId,
            "name": name
        };
        axios.post(endpoint + '/api/maxreps/reps', maxRepsRequest)
            .then(res => {
                dispatch(fetchMaxRepsSuccess(res.data));
            })
            .catch(error => console.log(error));
    }
};

export const maxTime = (userId, name) => {
    return dispatch => {
        let maxTimeRequest = {
            "userId": userId,
            "name": name
        };
        axios.post(endpoint + '/api/maxtime/time', maxTimeRequest)
            .then(res => {
                dispatch(fetchMaxTimeSuccess(res.data));
            })
            .catch(error => console.log(error));
    }
};

export const workoutHistory = userId => {
    return dispatch => {
        let param = { userId: userId };
        axios.post(endpoint + '/api/workout/workoutHistory', param)
            .then(res => {
                let workoutHist = res.data;
                dispatch(workoutHistorySuccess(workoutHist));
            })
            .catch(error => console.log(error));
    }
};

export const workoutSummary = userId => {
    return dispatch => {
        let param = { userId: userId };
        axios.post(endpoint + '/api/workout/workoutSummary', param)
            .then(res => {
                let workoutSummary = res.data;
                dispatch(workoutSummarySuccess(workoutSummary));
            })
            .catch(error => console.log(error));
    }
};

export const activities = userId => {
    return dispatch => {
        let param = {
            userId: userId
        }
        axios.post(endpoint + '/api/workoutlog/logs', param)
            .then(res => {
                console.log(res);
                let activity = res.data;
                dispatch(activitySuccess(activity));
            })
            .catch(error => console.log(error));
    }
};

export const saveNote = (id, category, note) => {
    return dispatch => {
        let param = {
            id: id,
            category: category,
            note: note
        }
        axios.put(endpoint + '/api/workoutlog/note', param)
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    }
};

export const awardsHistory = userId => {
    return dispatch => {
        let param = {
            userId: userId
        }
        axios.post(endpoint + '/api/awards/', param)
            .then(res => {
                dispatch(fetchAwardsHistorySuccess(res.data));
            })
            .catch(error => console.log(error));
    }
};

export const weeklyAwards = userId => {
    return dispatch => {
        let param = {
            userId: userId
        }
        axios.post(endpoint + '/api/awards/week', param)
            .then(res => {
                dispatch(fetchAwardsWeekSuccess(res.data));
            })
            .catch(error => console.log(error));
    }
};

export const weeklyLogs = userId => {
    return dispatch => {
        let param = {
            userId: userId
        }
        axios.post(endpoint + '/api/workoutlog/logsWeek', param)
            .then(res => {
                dispatch(fetchLogsWeekSuccess(res.data));
            })
            .catch(error => console.log(error));
    }
};

export const addMaxTime = exerciseLog => {
    return dispatch => {
        axios.post(endpoint + '/api/maxtime/', exerciseLog)
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    }
};

export const addMaxReps = exerciseLog => {
    return dispatch => {
        axios.post(endpoint + '/api/maxreps/', exerciseLog)
            .then(res => {
                dispatch(fetchHomeWorkoutLog(exerciseLog.category, exerciseLog.name, exerciseLog.userId))
            })
            .catch(error => console.log(error));
    }
};

export const addHomeExerciseLog = (exerciseLog, logToBeUpdated) => {
    return dispatch => {
        logToBeUpdated.push(exerciseLog);
        axios.post(endpoint + '/api/homeworkoutlog/', exerciseLog)
            .then(res => {
                dispatch(addMaxTime(exerciseLog));
                dispatch(addMaxReps(exerciseLog));
                return logToBeUpdated;
            })
            .catch(error => dispatch(addExerciseLogFailure(error)));
    }
};

export const fetchExercisesBegin = () => ({
    type: FETCH_EXERCISES_BEGIN
});

export const fetchExercisesSuccess = exercises => ({
    type: FETCH_EXERCISES_SUCCESS,
    payload: { exercises }
});

export const fetchExercisesFailure = error => ({
    type: FETCH_EXERCISES_FAILURE,
    payload: { error }
});

export const expandExerciseSuccess = logs => ({
    type: EXPAND_EXERCISE_SUCCESS,
    payload: { logs }
});

export const expandExerciseFailure = error => ({
    type: EXPAND_EXERCISE_FAILURE,
    payload: { error }
});

export const closeExpandExerciseSuccess = exercises => ({
    type: CLOSE_EXPANDEXERCISE_SUCCESS,
    payload: { exercises }
});

export const addExerciseLogBegin = () => ({
    type: ADD_EXERCISELOG_BEGIN
});

export const addExerciseLogSuccess = logs => ({
    type: ADD_EXERCISELOG_SUCCESS,
    payload: { logs }
});

export const addExerciseLogFailure = error => ({
    type: ADD_EXERCISELOG_FAILURE,
    payload: { error }
});

export const workoutHistorySuccess = workoutHist => ({
    type: FETCH_WORKOUTHISTORY,
    payload: { workoutHist }
});

export const workoutSummarySuccess = workoutSummary => ({
    type: FETCH_WORKOUTSUMMARY,
    payload: { workoutSummary }
});

export const activitySuccess = activity => ({
    type: FETCH_ACTIVITY,
    payload: { activity }
});

export const fetchBestSetsSuccess = (maxWeight, maxReps, bestSet) => ({
    type: FETCH_BESTSETS,
    payload: { maxWeight, maxReps, bestSet }
});

export const fetchMaxRepsSuccess = maxReps => ({
    type: FETCH_MAXREPS,
    payload: { maxReps }
});

export const fetchMaxTimeSuccess = maxTime => ({
    type: FETCH_MAXTIME,
    payload: { maxTime }
});

export const fetchAwardsWeekSuccess = awards => ({
    type: FETCH_AWARDSWEEK,
    payload: { awards }
});

export const fetchAwardsHistorySuccess = awards => ({
    type: FETCH_AWARDSHISTORY,
    payload: { awards }
});

export const fetchLogsWeekSuccess = logsWeek => ({
    type: FETCH_LOGSWEEK,
    payload: { logsWeek }
});

export const fetchHomeworkoutLogSuccess = homeworkoutlogs => ({
    type: FETCH_HOMEWORKOUTLOG_SUCCESS,
    payload: { homeworkoutlogs }
});

export const setTheme = theme => ({
    type: SET_THEME,
    payload: { theme }
});