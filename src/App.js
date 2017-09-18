import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button }from 'antd-mobile';
import Main from './Main/Main';
// 简介页面
import Introduction from './Introduction/Introduction';
// 专属页面
import Exclusive from './Exclusive/Exclusive';
// 电影头条
import Movie from './Movie/Movie';
// 电影详情页面
import MovieDetail from './MovieDetail/MovieDetail';
import {
  BrowserRouter as Router,
  Route,
  Link
}  from 'react-router-dom';
class App extends Component {
  render() {
const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.id}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>{match.url}</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:id`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)
    return (
      <Router>
        <div>
          <Route exact path="/" component={Exclusive}/>
          <Route  path="/Main" component={Main}/>
          <Route  path="/Introduction" component={Introduction}/>
          <Route  path="/Movie" component={Movie}/>
          <Route  path="/Movie:id" component={MovieDetail}/>
        </div>
      </Router>
    );
  }
}

export default App;
