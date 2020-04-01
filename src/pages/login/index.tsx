import React from 'react';
import { Form, Input, Button, Checkbox, Layout, Typography, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import './styles.scss';

const FormItem = Form.Item;
const Login = () => {
  return (
    <Layout>
      <Layout className="login-form">
        <Typography.Title className="text-center">Sign In</Typography.Title>
        <Form>
          <FormItem name="userName">
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </FormItem>
          <FormItem name="password">
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </FormItem>
          <FormItem>
            <Row>
              <Col flex="auto">
                <Checkbox name="remember">Remember me</Checkbox>
              </Col>
              <Col>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" className="w-100 mt-3">
              Log in
            </Button>
            <div className="text-center">
              Or <a href="">register now!</a>
            </div>
          </FormItem>
        </Form>
      </Layout>
    </Layout>
  );
};

export default Login;
