import React, { Component } from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import DeletePostMutation from './DeletePostMutation';

class Post extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={this.props.post.imageUrl} alt="cool pic"/>
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            {this.props.post.description}&nbsp;
            <button className="button is-danger" onClick={this._handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    )
  }

  _handleDelete = () => {
    DeletePostMutation(this.props.post.id, this.props.viewer.id, null);
  }
}

export default createFragmentContainer(Post, graphql`
  fragment Post_viewer on Viewer {
    id
  }

  fragment Post_post on Post {
    id
    description
    imageUrl
  }
`);