import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditOrder extends Component {
  constructor(props) {
    super(props);
    console.log('these are edit properties ==> ' + props);
    this.onChangeCustomername = this.onChangeCustomername.bind(this);
    this.onChangeBooktitle = this.onChangeBooktitle.bind(this);
    this.onChangeIssueDate = this.onChangeIssueDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      customername: '',
      booktitle: '',
      issuedate: new Date(),
      enddate: new Date(),
      customers: [],
      books: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:7777/order/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          customername: response.data.customerName,
          booktitle: response.data.bookTitle,
          issuedate: new Date(response.data.issueDate),
          enddate: new Date(response.data.endDate)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5555/customers/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            customers: response.data.map(customer => customer.name),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:4545/books/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            books: response.data.map(book => book.title),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })


  }

  onChangeCustomername(e) {
    this.setState({
      customername: e.target.value
    })
  }

  onChangeBooktitle(e) {
    this.setState({
      booktitle: e.target.value
    })
  }

  onChangeIssueDate(date) {
    this.setState({
      issuedate: date
    })
  }

  onChangeEndDate(date) {
    this.setState({
      enddate: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const order = {
      customername: this.state.customername,
      booktitle: this.state.booktitle,
      issuedate: this.state.issuedate,
      enddate: this.state.enddate
    }

    console.log('this is updated order' + order);

    axios.put('http://localhost:7777/order/' + this.props.match.params.id, order)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Order</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Customer: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.customername}
              onChange={this.onChangeCustomername}>
              {
                this.state.customers.map(function (customer) {
                  return <option
                    key={customer}
                    value={customer}>{customer}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Book: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.booktitle}
              onChange={this.onChangeBooktitle}>
              {
                this.state.books.map(function (book) {
                  return <option
                    key={book}
                    value={book}>{book}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>IssueDate: </label>
            <div>
              <DatePicker
                selected={this.state.issuedate}
                onChange={this.onChangeIssueDate}
              />
            </div>
          </div>
          <div className="form-group">
            <label>EndDate: </label>
            <div>
              <DatePicker
                selected={this.state.enddate}
                onChange={this.onChangeEndDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Order" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}