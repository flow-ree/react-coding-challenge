import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import BookForm from 'App/components/BookForm'

class BookCreateModal extends React.Component {
  constructor(props) {
    super(props)
    this.childBook = React.createRef()
    this.state = {
      collapsedIDs: []
    }
  }

  onSave() {
    let book = this.childBook.current.state
    delete book.id
    this.props.createBook(book)
    this.props.hide()
  }
  render() {

    return (
      <Modal
        show={this.props.show}
        size='xl'
        onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm
            subjects={this.props.subjects}
            mode='new'
            ref={this.childBook} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={this.props.hide}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={this.onSave.bind(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default BookCreateModal
