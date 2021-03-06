import React, { Component } from 'react';
import ListPage from './ListPage';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import environment from './Environment';
import './App.css';
import 'bulma/css/bulma.css';

const AppAllPostQuery = graphql`
  query AppAllPostQuery {
    viewer {
      ...ListPage_viewer
    }
  }
`;

class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={AppAllPostQuery}
        render={ ({ error, props }) => {
          if(error) {
            return <div>{error.message}</div>;
          } else if(props) {
            return <ListPage viewer={props.viewer} />;
          }
          return <div>loading...</div>;
        } }
      />
    );
  }
}

export default App;
