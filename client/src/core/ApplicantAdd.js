import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

class ApplicantAdd extends Component {
  emptyApplicant = {
    FirstName: "",
    LastName: "",
    Email: "",
    DateOfBirth: "",
    PhoneNo: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyApplicant,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    await axios.post(`${process.env.REACT_APP_API}/createApplicant`, item);
    this.props.history.push("/admin");
  }

  render() {
    const { item } = this.state;

    return (
      <div>
        <Container>
          <h2>Add Applicant</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="FirstName">FirstName</Label>
              <Input
                type="text"
                name="FirstName"
                id="FirstName"
                value={item.FirstName || ""}
                onChange={this.handleChange}
                autoComplete="FirstName"
              />
            </FormGroup>
            <FormGroup>
              <Label for="LastName">LastName</Label>
              <Input
                type="text"
                name="LastName"
                id="LastName"
                value={item.LastName || ""}
                onChange={this.handleChange}
                autoComplete="LastName"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                type="text"
                name="Email"
                id="Email"
                value={item.Email || ""}
                onChange={this.handleChange}
                autoComplete="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="DateOfBirth">DateOfBirth</Label>
              <Input
                type="text"
                name="DateOfBirth"
                id="DateOfBirth"
                value={item.DateOfBirth || ""}
                onChange={this.handleChange}
                autoComplete="DateOfBirth"
              />
            </FormGroup>
            <FormGroup>
              <Label for="PhoneNo">PhoneNo</Label>
              <Input
                type="text"
                name="PhoneNo"
                id="PhoneNo"
                value={item.PhoneNo || ""}
                onChange={this.handleChange}
                autoComplete="PhoneNo"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/admin">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(ApplicantAdd);
