import React from 'react'
import { ListGroup, Row, Col, Collapse } from 'react-bootstrap'
import BookForm from 'App/components/BookForm'

class BookList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      collapsedIDs: []
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({collapsedIDs: []})
  }

  onItemClick(id) {
    return () => {
      let collapsed = this.state.collapsedIDs
      if(collapsed.find(col => id === col)){
        collapsed = collapsed.filter(col => col !== id)
      }
      else {
        collapsed.push(id)
      }
      this.setState({collapsedIDs: collapsed})
    }
  }

  render() {
    const Books = this.props.books.length > 0 ? this.props.books.map((book) => {
      return (
        <React.Fragment key={`book-${book.id}`}>
          <ListGroup.Item
            action
            onClick={this.onItemClick(book.id).bind(this)}>
            <Row>
              <Col xs={1}>
                {book.id}
              </Col>
              <Col xs={5}>
                {book.title}
              </Col>
              <Col xs={3}>
                {book.authors.map(auth=>auth.name).join('; ')}
              </Col>
              <Col xs={2}>
                {book.subjects.join(', ')}
              </Col>
            </Row>
          </ListGroup.Item>
          <Collapse in={!!this.state.collapsedIDs.find(cid=> cid === book.id)}>
            <ListGroup.Item className='book-list-collapse'>
              <BookForm book={book} updateBook={this.props.updateBook} deleteBook={this.props.deleteBook} subjects={this.props.subjects} mode='edit'/>
            </ListGroup.Item>
          </Collapse>
        </React.Fragment>
      )
    }) :
      <ListGroup.Item className='text-center'>
        No books to show.
      </ListGroup.Item>
    return (
      <div style={{margin: '10px'}}>
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col xs={1}>
                <b>ID</b>
              </Col>
              <Col xs={5}>
                <b>Title</b>
              </Col>
              <Col xs={3}>
                <b>Authors</b>
              </Col>
              <Col xs={3}>
                <b>Subjects</b>
              </Col>
            </Row>
          </ListGroup.Item>
          {Books}
        </ListGroup>
      </div>
    )
  }
}

export default BookList
