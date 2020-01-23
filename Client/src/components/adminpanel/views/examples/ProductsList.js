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
              <Card className="bg-default shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Products List</h3>
                </CardHeader>
                <Table className="align-items-center table-dark table-flush" bordered hover responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Date</th>
                      <th scope="col">Category</th>
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
                                Laptop
                              </span>
                      </td>
                      <td>
                      <span className="mb-0 text-sm">
                                666$
                              </span>
                      </td>
                      <td>
                      <span className="mb-0 text-sm">
                                22-01-2020
                              </span>
                      </td>
                      <td>
                      <span className="mb-0 text-sm">
                                Electronics
                              </span>
                      </td>
                      <td>
                      <span className="mb-0 text-sm">
                                approved
                              </span>
                      </td>
                      <td>
                      <Button color="success"><i class="fa fa-plus-circle"/></Button>
                      <Button color="danger"><i class="fa fa-times-circle"/></Button>
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
