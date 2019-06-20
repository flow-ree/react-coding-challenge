import { combineReducers } from 'redux'

const initialSubjectState = {
  pending: false,
  subjects: [],
  error: null
}
const subjectReducer = (state = initialSubjectState, action) => {
  switch (action.type) {
    case 'FETCH_SUBJECTS_PENDING':
      return {
        ...state,
        pending: true
      }
    case 'FETCH_SUBJECTS_SUCCESS':
      return {
        ...state,
        pending: false,
        subjects: action.subjects
      }
    case 'FETCH_SUBJECTS_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state
  }
}

const initialBookState = {
  pending: false,
  books: [],
  error: null,
  createPending: false,
  createError: false
}
const bookReducer = (state = initialBookState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_PENDING':
      return {
        ...state,
        pending: true,
        error: null,
      }
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        pending: false,
        books: action.books
      }
    case 'FETCH_BOOKS_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case 'UPDATE_BOOK_SUCCESS':
      let idx = state.books.findIndex(book=>book.id===action.book.id)
      return {
        ...state,
        books: state.books.map(
          (book, i) => i === idx ? action.book
            : book
        )
      }
    case 'DELETE_BOOK_SUCCESS':
      let bookIdx = state.books.findIndex(book=>book.id===action.id)
      return {
        ...state,
        books: state.books.filter((book, i) => i !== bookIdx)
      }
    case 'CREATE_BOOK_PENDING':
      return {
        ...state,
        createPending: true
      }
    case 'CREATE_BOOK_SUCCESS':
      let books = [...state.books]
      books.push(action.book)
      return {
        ...state,
        books: books
      }
      default:
      return state
  }
}

export default combineReducers({
  books: bookReducer,
  subjects: subjectReducer
})
