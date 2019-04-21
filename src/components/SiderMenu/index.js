import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

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
            <Icon type="dashboard" />
            <span>Bảng điều khiển</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="ordered-list" />
            <span>Đơn hàng</span>
          </Menu.Item>
          <SubMenu
            key="subMenuProduct"
            title={
              <span>
                <Icon type="shop" />
                Sản phẩm
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to="/products" className="nav-text">
                Danh sách sản phẩm
              </Link>
            </Menu.Item>
            <Menu.Item key="4">Danh mục</Menu.Item>
            <Menu.Item key="5">Brand</Menu.Item>
          </SubMenu>
          <Menu.Item key="6">
            <Icon type="user" />
            <span>Khách hàng</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
