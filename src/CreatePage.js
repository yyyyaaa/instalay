import React, { Component } from 'react';
import { 
  withRouter,
  Link, 
} from 'react-router-dom';
import { 
  QueryRenderer,
  graphql, 
} from 'react-relay';
import environment from './Environment';
import CreatePostMutation from './CreatePostMutation';

const CreatePageViewerQuery = graphql`
  query CreatePageViewerQuery {
    viewer {
      id
    }
  }
`;

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      imageUrl: ""
    };
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={CreatePageViewerQuery}
        render={ ({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if(props) {
            return (
              <div className="container is-fluid">
                <div className="columns is-centered">
                  <form className="column is-half">
                    <div className="field">
                      <label className="label">Description</label>
                      <input 
                        type="text" 
                        name="description" 
                        className="input" 
                        placeholder="Image description"
                        value={this.state.description}
                        onChange={(e) => this.setState({description: e.target.value})}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Image URL</label>
                      <input 
                        type="text" 
                        name="imageUrl" 
                        className="input" 
                        placeholder="Image URL"
                        value={this.state.imageUrl}
                        onChange={(e) => this.setState({imageUrl: e.target.value})}
                      />
                    </div>

                    { this.state.imageUrl && 
                      <div className="card">
                        <div className="card-image">
                          <figure className="image is-3by4">
                            <img 
                              src={this.state.imageUrl} 
                              alt={this.state.description} 
                            />
                          </figure>
                        </div>
                      </div>
                    }

                    <div className="field">
                      <div className="control">
                        <button className="button is-primary" onClick={() => { this._handlePost(props.viewer.id) }}>Submit</button>
                        <Link to="/" className="button is-light">Cancel</Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ); // End return
          } // End else
          return <div>Loading ...</div>;
        } }
       />
      
    );
  }

  _handlePost = (viewerId) => {
    const { description, imageUrl } = this.state;
    CreatePostMutation(description, imageUrl, viewerId, () => { console.log(this.context.history);this.props.history.push('/')});
  }
}

export default withRouter(CreatePage);