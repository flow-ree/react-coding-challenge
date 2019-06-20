export const FETCH_BOOKS_PENDING = 'FETCH_BOOKS_PENDING'
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS'
export const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR'
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS'
export const FETCH_SUBJECTS_PENDING = 'FETCH_SUBJECTS_PENDING'
export const FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS'
export const FETCH_SUBJECTS_ERROR = 'FETCH_SUBJECTS_ERROR'
export const CREATE_BOOK_SUCCESS= 'CREATE_BOOK_SUCCESS'
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS'

export const fetchBooksPending = () => {
  return {
    type: FETCH_BOOKS_PENDING
  }
}

export const fetchBooksSuccess = books => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    books: books
  }
}

export const fetchBooksError = error => {
  return {
    type: FETCH_BOOKS_ERROR,
    error: error
  }
}

export const updateBookSuccess = book => {
  return {
    type: UPDATE_BOOK_SUCCESS,
    book: book
  }
}
export const createBookSuccess = book => {
  return {
    type: CREATE_BOOK_SUCCESS,
    book: book
  }
}

export const deleteBookSuccess = id => {
  return {
    type: DELETE_BOOK_SUCCESS,
    id: id
  }
}
export const fetchSubjectsPending = () => {
  return {
    type: FETCH_SUBJECTS_PENDING
  }
}

export const fetchSubjectsSuccess = subjects => {
  return {
    type: FETCH_SUBJECTS_SUCCESS,
    subjects: subjects
  }
}

export const fetchSubjectsError = error => {
  return {
    type: FETCH_SUBJECTS_ERROR,
    error: error
  }
}
