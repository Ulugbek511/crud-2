// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
// import Admin from './pages/Admin';
// import Categories from './pages/Categories';
import Products from './pages/Products';
import 'antd/dist/antd.less';
import './App.css';
import 'antd/dist/antd.less';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Switch>
              {/* <Route path="/admin" component={Admin} />
              <Route path="/categories" component={Categories} /> */}
              <Route path="/products" component={Products} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>E-commerce Admin Panel ©2024 Created by You</Footer>
      </Layout>
    </Router>
  );
}

export default App;
