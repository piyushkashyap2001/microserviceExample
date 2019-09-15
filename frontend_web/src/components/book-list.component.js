import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = props => (
  <tr>
    <td>{props.book.title}</td>
    <td>{props.book.author}</td>
    <td>{props.book.numberPages}</td>
    <td>{props.book.publisher}</td>
    <td>
      <Link to={"/editbook/" + props.book._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBook(props.book._id) }}>delete</a>
    </td>
  </tr>
)

export default class BookList extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this)

    this.state = { books: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:4545/books/')
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteBook(id) {
    axios.delete('http://localhost:4545/book/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      books: this.state.books.filter(el => el._id !== id)
    })
  }

  bookList() {
    return this.state.books.map(currentbook => {
      return <Book book={currentbook} deleteBook={this.deleteBook} key={currentbook._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Books</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>title</th>
              <th>author</th>
              <th>numberPages</th>
              <th>publisher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.bookList()}
          </tbody>
        </table>
      </div>
    )
  }
}