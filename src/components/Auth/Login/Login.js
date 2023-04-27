import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Card, Row, Col, Select, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { ProjectContext } from "../../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

const Login = () => {
  const [state, dispatch] = useContext(ProjectContext);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { Option } = Select;

  useEffect(() => {
    if (state.login.is_authenticated) {
      navigate("/");
    }
  }, []);
  const onFinish = (values) => {
    setLoading(true);
    let apiEndpoint = "";
    let companyFormattedName = "";
    if (values.company === "sephora") {
      apiEndpoint = process.env.REACT_APP_SEPHORA_API_ENDPOINT;
      companyFormattedName = "Sephora";
    } else if (values.company === "yesstyle") {
      apiEndpoint = process.env.REACT_APP_YESSTYLE_API_ENDPOINT;
      companyFormattedName = "Yes Style";
    } else if (values.company === "eskincare") {
      apiEndpoint = process.env.REACT_APP_ESKINCARE_API_ENDPOINT;
      companyFormattedName = "e Skin Care";
    }
    axios
      .post(`${apiEndpoint}/login`, values)
      .then((res) => {
        let loginValues = {
          companyUrl: apiEndpoint,
          companyFormattedName: companyFormattedName,
          isAdmin: res.data.role === "admin",
          ...res.data,
        };
        messageApi.open({
          type: "success",
          content: "Successfully logged in",
        });
        dispatch({
          type: "updateLogin",
          payload: loginValues,
        });
        navigate("/");
      })
      .catch((err) => {
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content: "Authentication error.Username or password is incorrect. ",
        });
        console.log(err);
      })
      .finally((_) => setLoading(false));
  };

  return (
    <div className="login">
      {contextHolder}
      <Row justify="center">
        <Card className="loginCard">
          <Row>
            <Col span={12} className="left"></Col>
            <Col span={12} className="right" align="center">
              <Row>
                <img
                  className="top-img"
                  src={`${process.env.PUBLIC_URL}/assets/imgs/beyou.png`}
                  alt="logo"
                />
                {/* <span className="heading" style={{ width: "100%" }}>
                  Skincare Management App
                </span> */}
                <span className="content">
                  Welcome to the World of Skincare. Login using your credentials
                </span>
              </Row>
              <Form onFinish={onFinish} className="login-form">
                <Form.Item
                  name="company"
                  rules={[
                    { required: true, message: "Please select your company!" },
                  ]}
                >
                  <Select placeholder="Select a company" allowClear>
                    <Option value="sephora">Sephora</Option>
                    <Option value="yesstyle">YesStyle</Option>
                    <Option value="eskincare">eSkinCare</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="login-btn"
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </Row>
      <div className="footer">
        <span>
          Developed by deva&nbsp;&nbsp;
          {/* <img
            className="footer-img"
            src={`${process.env.PUBLIC_URL}/asstes/imgs/d-cube.png`}
            alt="logo"
          /> */}
        </span>
      </div>
    </div>
  );
};

export default Login;
