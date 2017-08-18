import React, { Component } from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import { Link } from 'react-router-dom';
import Post from './Post';

class ListPage extends Component {
  render() {
    return (
      <div className="container is-fluid">
        <nav className="navbar">
          <Link to="/create" className="navbar-item"> 
          + New Post
          </Link>
        </nav>
        <div className="columns is-centered">
          <div className="column is-one-third">
            { this.props.viewer.allPosts.edges.map( ({node}) => 
              <Post key={node.__id} post={node} viewer={this.props.viewer}/>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(ListPage, graphql`
  fragment ListPage_viewer on Viewer {
    ...Post_viewer
    allPosts(last: 100, orderBy: createdAt_DESC) @connection(key: "ListPage_allPosts", filters: []) {
      edges {
        node {
          ...Post_post
        }
      }
    }
  }
`);