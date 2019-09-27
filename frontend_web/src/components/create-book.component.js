import React, { Component } from 'react';
import axios from 'axios';


export default class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeNumberPages = this.onChangeNumberPages.bind(this);
    this.onChangePublisher = this.onChangePublisher.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      author: '',
      numberPages: 0,
      publisher: ''
    }
  }

  /*componentDidMount() {
    axios.get('http://localhost:4545/book/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }*/

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    })
  }

  onChangeNumberPages(e) {
    this.setState({
      numberPages: e.target.value
    })
  }

  onChangePublisher(e) {
    this.setState({
      publisher: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const book = {
      title: this.state.title,
      author: this.state.author,
      numberPages: this.state.numberPages,
      publisher: this.state.publisher
    }

    console.log(book);

    axios.post(process.env.BOOKSERVICE + '/book', book)
      .then(res => console.log('THis is book created ==>' + res.data));

    window.location = '/book';
  }

  render() {
    return (
      <div>
        <h3>Add New Book</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Author: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
            />
          </div>
          <div className="form-group">
            <label>NumberOfPages: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.numberPages}
              onChange={this.onChangeNumberPages}
            />
          </div>
          <div className="form-group">
            <label>Publisher: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.publisher}
              onChange={this.onChangePublisher}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Add Book" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}