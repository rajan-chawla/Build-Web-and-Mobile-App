import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
import {
  Container,
  Row,
  Col
} from "reactstrap";




class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };
  
  render() {
    return (
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              
            </Col>
              
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
