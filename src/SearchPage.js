import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Card, { CardText } from "react-bootstrap/Card";
import { Formik, validateYupSchema, Field, Form } from "formik";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import {searchTermTypes} from "./itunesApi"
import { getItunesSearchResults } from "./itunesApi";
import { PassThrough } from "stream";

const querystring = require("querystring");
const schema = yup.object({
  name: yup.string().required("URL is required"),
  url: yup
    .string()
    .required("URL is required")
    .matches(
      /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
      "Invalid URL"
    ),
});

const enumerateSearchTypes = [];

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: [{
        type: searchTermTypes.TITLE,
        term: ""
      }],
      searchResults: []
    }
  }

  render() {
      return (
        <div className="search-page">
          <h1 className="center">Search For Podcasts</h1>
        <Card>
          <Card.Title>
          <Formik initialValues={{ field0: "" }}
          onSubmit={async values => {
            debugger;
            console.log(values);
            var searchResults = await getItunesSearchResults(values['field0'])
            console.log(searchResults);
            searchResults.results
            ? this.setState({searchResults: searchResults.results})
            : console.log("No results found");
            console.log(this.state.searchResults);
            //localStorage.setItem("feeds", JSON.stringify(feedsStore.feeds));
          }}>
              <Form>
                {this.state.searchTerms.map( (searchTerm, index) => (
                  <div>
                    <Field
                      as="select"
                      name={"field" + index + "-type"}
                    >
                      {Object.keys(searchTermTypes).map( t => (
                        <option key={t} value={searchTermTypes[t].term}>{searchTermTypes[t].name}</option>
                      ))}
                    </Field>
                    <Field
                      type="text"
                      as="input"
                      name={"field" + index}
                      placeholder=""
                    />
                  </div>
                ))}
                <Button type="submit">Search</Button>
              </Form>
          </Formik>
        </Card.Title>
        <Card.Body>
          <div>
          {
          this.state.searchResults
          ? this.state.searchResults.map(r => {
            return (
              <p>{r.trackName}</p>
            );
          })
          : "Results Pending"
        }
        </div>
        </Card.Body>
      </Card>
      <br />
    </div>
      );
  }
}

export default withRouter(observer(SearchPage));