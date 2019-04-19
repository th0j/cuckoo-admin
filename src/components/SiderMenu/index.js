import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

import styles from './index.module.less';
import logo from '../../assets/logo.svg';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderMenu extends Component {
  render() {
    return (
      <Sider collapsible collapsed={false}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1>Cuckoo Admin</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="ordered-list" />
            <span>Orders</span>
          </Menu.Item>
          <SubMenu
            key="subMenuProduct"
            title={
              <span>
                <Icon type="shop" />
                Products
              </span>
            }
          >
            <Menu.Item key="2">Product</Menu.Item>
            <Menu.Item key="3">Category</Menu.Item>
            <Menu.Item key="4">Brand</Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <Icon type="user" />
            <span>Users</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
