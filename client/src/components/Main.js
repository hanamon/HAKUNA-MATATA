import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyPage from '../pages/Mypage';
import Board from '../pages/Board';
import Post from '../pages/Post';
import About from '../pages/About';
import AddPost from '../pages/AddPost';
import EditPost from '../pages/EditPost';
import ErrorPage from '../pages/ErrorPage';
// import Banner from './Banner';

const Main = () => {
  return (
    <main>
      {/* <Banner /> */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/" exact>
          <Board />
        </Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
        <Route path="/posts/:postId">
          <Post />
        </Route>
        <Route path="/add-post">
          <AddPost />
        </Route>
        <Route path="/edit-post">
          <EditPost />
        </Route>
        <Route path="/404">
          <ErrorPage />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
