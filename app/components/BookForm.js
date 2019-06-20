import React from 'react'
import { InputGroup, FormControl, Button, Row, Col, Form } from 'react-bootstrap'

class BookForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      title: '',
      authors: [],
      bookshelves: [],
      download_count: 0,
      formats: {},
      languages: [],
      media_type: '',
      subjects: [],
      addFormatType: ''
    }
    this.removeFormat = this.removeFormat.bind(this)
    this.toggleLanguage = this.toggleLanguage.bind(this)
    this.toggleSubject = this.toggleSubject.bind(this)
    this.onBookSave = this.onBookSave.bind(this)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.book) {
      this.setState({
        id: nextProps.book.id,
        title: nextProps.book.title,
        authors: nextProps.book.authors,
        bookshelves: nextProps.book.bookshelves,
        download_count: nextProps.book.download_count,
        formats: nextProps.book.formats,
        languages: nextProps.book.languages,
        media_type: nextProps.book.media_type,
        subjects: nextProps.book.subjects
      })
    }
  }

  onBookSave() {
    this.props.updateBook(this.state)
  }

  onAuthorChange(idx) {
    return event => {
      let authors = this.state.authors
      authors[idx].name = event.target.value
      this.setState({authors: authors})
    }
  }

  addAuthor() {
    let authors = this.state.authors
    authors.push({
      name: ''
    })
    this.setState({authors: authors})
  }

  popAuthor() {
    let authors = this.state.authors
    authors.pop()
    this.setState({authors: authors})
  }

  onBookshelveChange(idx) {
    return event => {
      let bookshelves = this.state.bookshelves
      bookshelves[idx] = event.target.value
      this.setState({bookshelves: bookshelves})
    }
  }

  addBookshelve() {
    let bookshelves = this.state.bookshelves
    bookshelves.push('')
    this.setState({bookshelves: bookshelves})
  }

  popBookshelve() {
    let bookshelves = this.state.bookshelves
    bookshelves.pop()
    this.setState({bookshelves: bookshelves})
  }

  toggleLanguage(event) {
    let languages = this.state.languages
    let value = event.target.value
    if(languages.find(l => l === value)){
      let idx = languages.findIndex(l => l === value)
      languages.splice(idx, 1)
    }
    else{
      languages.push(value)
    }
    this.setState({languages: languages})
  }

  toggleSubject(event) {
    let subjects = this.state.subjects
    let value = event.target.value
    if(subjects.find(l => l === value)){
      let idx = subjects.findIndex(l => l === value)
      subjects.splice(idx, 1)
    }
    else{
      subjects.push(value)
    }
    this.setState({subjects: subjects})
  }

  onFormatChange(key) {
    return event => {
      let formats = this.state.formats
      formats[key] = event.target.value
      this.setState({formats: formats})
    }
  }

  addFormatType() {
    if(this.state.addFormatType) {
      let formats = this.state.formats
      formats[this.state.addFormatType] = ''
      this.setState({formats: formats})
    }
  }

  removeFormat(key) {
    return () => {
      let formats = this.state.formats
      delete formats[key]
      this.setState({formats: formats})
    }
  }

  render() {
    const authors = this.state.authors.map((auth, idx) => {
      return (
        <FormControl
          key={`author-${idx}-${this.state.id}`}
          placeholder={`Author ${idx + 1}`}
          value={auth.name}
          onChange={this.onAuthorChange(idx)}
        />
      )
    })
    const bookshelves = this.state.bookshelves.map((bs, idx) => {
      return (
        <FormControl
          key={`bs-${idx}-${this.state.id}`}
          placeholder={`Bookshelve ${idx + 1}`}
          value={bs}
          onChange={this.onBookshelveChange(idx)}
        />
      )
    })
    const languages = ['en', 'de', 'fr']
    const languageOptions = languages.map(lang => {
      return (
        <Form.Check
          onChange={this.toggleLanguage}
          value={lang}
          inline
          label={lang}
          type={'checkbox'}
          key={`inline-${lang}-1`}
          checked={!!this.state.languages.find(lan => lan === lang)}/>
        )
    })
    const subjectOptions = this.props.subjects.map(subj => {
      return (
        <Form.Check
          onChange={this.toggleSubject}
          value={subj}
          inline
          label={subj}
          type={'checkbox'}
          key={`inline-${subj}-1`}
          checked={!!this.state.subjects.find(sub => sub === subj)}/>
      )
    })
    const buttons = this.props.mode === 'new' ? null :
      <Col sm={{ span: 2, offset: 2 }} className='text-right'>
        <Button
          className='delete-button'
          variant='danger'
          onClick={() => this.props.deleteBook(this.state.id)}>
          Delete
        </Button>
        <Button
          className='save-button'
          variant='success'
          onClick={this.onBookSave}>
          Save
        </Button>
      </Col>

    const idHeader = this.props.mode === 'new' ? null :
      <p>
        <b>Edit book with ID: </b>{this.state.id}
      </p>

    const formats = this.state.formats ? Object.keys(this.state.formats).map((key, idx) => {
      return (
        <InputGroup
          size='sm'
          key={`format-${idx}`}>
          <InputGroup.Prepend>
            <InputGroup.Text>{key}</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={this.state.formats[key]}
            onChange={this.onFormatChange(key).bind(this)}
            placeholder='Source'
          />
          <InputGroup.Append>
            <Button variant='danger' onClick={this.removeFormat(key)}>-</Button>
          </InputGroup.Append>
        </InputGroup>
      )
    }) : null

    return (
      <div style={{margin: '10px'}}>
        {idHeader}
        <Row>
          <Col sm={4}>
            <InputGroup className='mb-3' size='sm'>
              <InputGroup.Prepend>
                <InputGroup.Text>Title</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={this.state.title}
                onChange={event => this.setState({title: event.target.value})}
                placeholder='Title'
              />
            </InputGroup>
          </Col>
          <Col sm={8}>
            <InputGroup className='mb-3' size='sm'>
              <InputGroup.Prepend>
                <InputGroup.Text>Authors</InputGroup.Text>
              </InputGroup.Prepend>
              {authors}
              <InputGroup.Append>
                <Button variant='danger' onClick={this.popAuthor.bind(this)}>-</Button>
                <Button variant='success' onClick={this.addAuthor.bind(this)}>+</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <InputGroup className='mb-3' size='sm'>
              <InputGroup.Prepend>
                <InputGroup.Text>Downloads</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder='Downloads'
                value={this.state.download_count}
                type='Number'
                onChange={event => this.setState({download_count: event.target.value})}
              />
            </InputGroup>
          </Col>
          <Col sm={8}>
            <InputGroup className='mb-3' size='sm'>
              <InputGroup.Prepend>
                <InputGroup.Text>Bookshelves</InputGroup.Text>
              </InputGroup.Prepend>
              {bookshelves}
              <InputGroup.Append>
                <Button variant='danger' onClick={this.popBookshelve.bind(this)}>-</Button>
                <Button variant='success' onClick={this.addBookshelve.bind(this)}>+</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col sm={4}>
            <InputGroup className='mb-3' size='sm'>
              <InputGroup.Prepend>
                <InputGroup.Text>Media Type</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder='Media Type'
                value={this.state.media_type}
                onChange={event => this.setState({media_type: event.target.value})}
              />
            </InputGroup>
          </Col>
          <Col sm={3}>
            <InputGroup className='mb-3' size='sm'>
              <InputGroup.Prepend>
                <InputGroup.Text>Languages</InputGroup.Text>
              </InputGroup.Prepend>
              <Form size={'sm'} style={{margin: '0px 10px'}}>
                {languageOptions}
              </Form>
            </InputGroup>
          </Col>
          <Col sm={5}>
            <InputGroup size='sm'>
              <InputGroup.Prepend>
                <InputGroup.Text>Subjects</InputGroup.Text>
                <Form size={'sm'} style={{margin: '0px 10px'}}>
                  {subjectOptions}
                </Form>
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
        </Row>
        Formats:
        <Row>
          <Col sm={8}>
            {formats}
            <InputGroup
              size='sm'
              className='mt-3'>
              <InputGroup.Prepend>
                <InputGroup.Text>Add Format Type</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder='Type'
                value={this.state.addFormatType}
                onChange={event => this.setState({addFormatType: event.target.value})}
              />
              <InputGroup.Append>
                <Button variant={'success'} onClick={this.addFormatType.bind(this)}>
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          {buttons}
        </Row>
      </div>
    )
  }
}

export default BookForm
