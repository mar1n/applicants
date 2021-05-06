import React from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ApplicantsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applicants: [],
            isLoading: true
        }
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get(`${process.env.REACT_APP_API}/getAllApplicants`)
        .then(response => response.data)
        .then(data => this.setState({applicants: data, isLoading: false}))
        // fetch('api/applicant')
        // .then(response => response.json())
        // .then(data => this.setState({ applicants: data, isLoading: false }));
    }
    async remove(id) {
        await axios.delete(`${process.env.REACT_APP_API}/deleteApplicant/${id}`).then(() => {
          let updatedApplicants = [...this.state.applicants].filter(i => i.id !== id);
          this.setState({applicants: updatedApplicants});
        });
      }
      render() {
        const {applicants, isLoading} = this.state;
    
        if (isLoading) {
          return <p>Loading...</p>;
        }
    
        const customerList = applicants.map(customer => {
          let ck = customer.Ckeditor;
          return <tr key={customer.id}>
            <td style={{whiteSpace: 'nowrap'}}>{customer.FirstName}</td>
            <td>{customer.LastName}</td>
            <td>{customer.Email}</td>
            <td>{customer.DateOfBirth}</td>
            <td>{customer.PhoneNo}</td>
            <td><div dangerouslySetInnerHTML={{__html: ck }} /> </td>
            <td>
              <ButtonGroup>
                <Button size="sm" color="primary" tag={Link} to={"/applicantEdit/" + customer.id}>Edit</Button>
                <Button size="sm" color="danger" onClick={() => this.remove(customer.id)}>Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        });
    
        return (
          <div>
            <Container fluid>
              <div className="float-right">
                <Button color="success" tag={Link} to="/applicantAdd">Add Customer</Button>
              </div>
              <h3>Applicants List</h3>
              <Table className="mt-4">
                <thead>
                  <tr>
                    <th width="20%">Firstname</th>
                    <th width="20%">Lastname</th>
                    <th width="10%">Email</th>
                    <th>DateOfBirth</th>
                    <th>PhoneNo</th>
                    <th>Ckeditor</th>
                    <th width="10%">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {customerList}
                </tbody>
              </Table>
            </Container>
          </div>
        );
      }
}

export default ApplicantsList;