import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Card, { CardText } from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getFeedListing } from "./requests";
const querystring = require("querystring");

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    }
  render() {
      return (
        <Card>
        <Card.Title className="card-title">
            
        </Card.Title>
        <Card.Body>
          
        </Card.Body>
        <Card.Text>
        </Card.Text>
      </Card>
      );
  }
}

export default withRouter(observer(SearchPage));