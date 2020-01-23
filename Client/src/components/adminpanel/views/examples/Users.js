import React from "react";


// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  Button,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";


class Tables extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Customers</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" bordered hover responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Firstname</th>
                      <th scope="col">Lastname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                      <span className="mb-0 text-sm">
                                usman
                              </span>
                      </td>
                      <td>
                      <span className="mb-0 text-sm">
                                Aslam
                              </span>
                      </td>
                      <td>
                      <span className="mb-0 text-sm">
                                usman@gmail.com
                              </span>
                      </td>
                      <td>
                      <span className="mb-0 text-sm">
                                buyer
                              </span>
                      </td>
                      <td>
                      <span className="mb-0 text-sm">
                                approved
                              </span>
                      </td>
                      <td>
                      <Button color="success"><i class="fa fa-user-plus"/></Button>
                      <Button color="danger"><i class="fa fa-user-times"/></Button>
                      </td>
                      </tr>
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
