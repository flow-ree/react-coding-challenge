import {fetchSubjectsPending, fetchSubjectsSuccess, fetchSubjectsError} from 'App/redux/actionCreators'

const subjectAPIurl = 'http://localhost:3010/subjects'
export const fetchSubjects= () => {
  return dispatch => {
    dispatch(fetchSubjectsPending())
    fetch(subjectAPIurl)
      .then(res => res.json())
      .then(res => {
        if(res.error) {
          throw(res.error)
        }
        dispatch(fetchSubjectsSuccess(res))
        return res
      })
      .catch(error => {
        dispatch(fetchSubjectsError(error))
      })
  }
}
