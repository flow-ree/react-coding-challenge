import { fetchBooksPending, fetchBooksSuccess, fetchBooksError, updateBookSuccess, createBookSuccess, deleteBookSuccess } from 'App/redux/actionCreators'

const bookAPIurl = 'http://localhost:3010/books'

export const fetchBooks = (subject) => {
  return dispatch => {
    dispatch(fetchBooksPending())
    let query = subject ? `?subjects_like=${subject}` : null
    fetch(`${bookAPIurl}${query}`)
      .then(res => res.json())
      .then(res => {
        if(res.error) {
          throw(res.error)
        }
        dispatch(fetchBooksSuccess(res))
        return res
      })
      .catch(error => {
        dispatch(fetchBooksError(error))
      })
  }
}

export const updateBook = (book) => {
  return dispatch => {
    // TODO pending
    fetch(`${bookAPIurl}/${book.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(book)
    })
      .then(res => res.json())
      .then(res => {
        if(res.error) {
          throw(res.error)
        }
        dispatch(updateBookSuccess(res))
        return res
      })
      .catch(error => {
        // TODO errorhandling
      })
  }
}

export const createBook = (book) => {
  return dispatch => {
    // TODO pending
    fetch(`${bookAPIurl}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(book)
    })
      .then(res => res.json())
      .then(res => {
        if(res.error) {
          throw(res.error)
        }
        dispatch(createBookSuccess(res))
        return res
      })
      .catch(error => {
        // TODO errorhandling
      })
  }
}

export const deleteBook = (id) => {
  return dispatch => {
    // TODO pending
    fetch(`${bookAPIurl}/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => res.json())
      .then(res => {
        if(res.error) {
          throw(res.error)
        }
        dispatch(deleteBookSuccess(id))
        return res
      })
      .catch(error => {
        // TODO errorhandling
      })
  }
}
