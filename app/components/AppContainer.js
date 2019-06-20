import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Jumbotron, Dropdown, Button, Row, Col, Alert } from 'react-bootstrap'
import { fetchBooks, updateBook, createBook, deleteBook } from 'App/redux/bookActions'
import { fetchSubjects } from 'App/redux/fetchSubjects'
import BookList from 'App/components/BookList'
import BookCreateModal from 'App/components/BookCreateModal'

class AppContainer extends React.Component {

  constructor(props, context) {
    super(props)
    this.state = {
      currentSubject: null,
      openCollapses: [],
      bookCreateModal: false
    }
  }

  componentWillMount() {
    this.props.fetchSubjects()
  }

  selectSubject(item) {
    this.setState({currentSubject: item})
    this.props.fetchBooks(item)
  }

  openModal() {
    this.setState({bookCreateModal: true})
  }

  closeModal() {
    this.setState({bookCreateModal: false})
  }

  render() {
    const subjectOptions = this.props.subjects.map((sub, idx) => {
      return (
        <Dropdown.Item
          key={`sub-${idx}`}
          eventKey={sub}>
          {sub}
        </Dropdown.Item>
      )
    })

    const subjectButtonText = this.state.currentSubject || 'Choose Subject...'
    const alert = this.props.subjectError ? <Alert show={true} variant='danger'>
      <Alert.Heading>Error</Alert.Heading>
      <p>
        {this.props.subjectError.toString()}
      </p>
      <hr />
      <div className='d-flex justify-content-end'>
      </div>
    </Alert> : null

    return (
      <div>
        <Jumbotron>
          <h1 className='text-center'>Reading List</h1>
        </Jumbotron>
        <Row>
          <Col xs={2} className='margin-button-left text-left'>
            <Button onClick={this.openModal.bind(this)}>
              Add Book
            </Button>
          </Col>
          <Col xs={{span: 2, offset: 8}} className='margin-button-right text-right'>
            <Dropdown
              className='margin-button text-right'
              onSelect={this.selectSubject.bind(this)}>
              <Dropdown.Toggle variant='primary'>
                {subjectButtonText}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {subjectOptions}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <BookList
          books={this.props.books}
          updateBook={this.props.updateBook}
          deleteBook={this.props.deleteBook}
          subjects={this.props.subjects}/>
        <BookCreateModal
          show={this.state.bookCreateModal}
          hide={this.closeModal.bind(this)}
          subjects={this.props.subjects}
          createBook={this.props.createBook}/>
        {alert}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.books.error,
  books: state.books.books,
  pending: state.books.pending,
  subjects: state.subjects.subjects,
  subjectError: state.subjects.error
})
const mapDispatchToProps = dispatch => bindActionCreators({
  updateBook: updateBook,
  createBook: createBook,
  deleteBook: deleteBook,
  fetchBooks: fetchBooks,
  fetchSubjects: fetchSubjects
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
