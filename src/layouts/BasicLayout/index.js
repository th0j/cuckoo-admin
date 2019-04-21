import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { SiderMenu } from '../../components';

// import { Header } from './Header';
// import { Footer } from './Footer';

const { Header, Footer, Content } = Layout;

class BasicLayout extends Component {
  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <SiderMenu />

          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Manager</Breadcrumb.Item>
                <Breadcrumb.Item>Product</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Cuckoo ©2019</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default BasicLayout;
