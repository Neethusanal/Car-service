import {  setAlert } from '../Redux/AlertSlice';

export function showAlertSuccess(dispatch,msg) {
  dispatch( setAlert({
      type: 'alert-success',
      message: msg,
      show:true
    })
  );
}

export function showAlertError(dispatch,msg) {
  dispatch(setAlert({
      type: 'alert-error',
      message: msg,
      show:true
  }));
}
export function showAlertWarning(dispatch,msg) {
  dispatch(setAlert({
      type: 'alert-warning',
      message: msg,
      show:true
  }));
}