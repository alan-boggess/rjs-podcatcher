import React, { useState, useEffect } from "react";
import "./FeedPage.css";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Card, { CardText } from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getFeedListing } from "./requests";
const querystring = require("querystring");

function FeedPage({ feedsStore, location }) {
  const [initialized, setInitialized] = useState(false);
  const [url, setUrl] = useState("");
  const [listings, setListings] = useState([]);
  const [data, setData] = useState({});
  const getListings = async url => {
    try {
      const response = await getFeedListing(url);
      debugger;
      setListings(response.data.items);
      setData(response.data.feed);
    } catch (ex) {
      console.log(ex);
    }
  };
  const openLink = url => {
    window.location.href = url;
  };
  useEffect(() => {
    if (!initialized) {
      const url = querystring.decode(location.search)["?url"];
      setUrl(url);
      getListings(url);
      setInitialized(true);
    }
  });
  return (
    <div className="feed-page">
      <h1 className="center title">
        <img src={data.image} /> {data.title}
      </h1>
      {listings.map((l, i) => {
        return (
          <Card key={i}>
            <Card.Title className="card-title">
              {l.title}
              <p/>
              <Button variant="primary" onClick={openLink.bind(this, l.link)}>
                Open
              </Button>
            </Card.Title>
            <Card.Body className="card-body">
              {l.description !== l.content ? <p>{l.description}</p> : "" }
              <Button variant="secondary" onClick={openLink.bind(this, l.enclosure.link)}>
                Download
              </Button>
              {
                /<\/?[a-z][\s\S]*>/i.test(l.content)
                ? <div dangerouslySetInnerHTML={{ __html: l.content }}/> 
                : l.content
              }
            </Card.Body>
            <Card.Text>
            </Card.Text>
          </Card>
        );
      })}
    </div>
  );
}
export default withRouter(observer(FeedPage));