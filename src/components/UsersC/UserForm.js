import React from "react";
import { Button, Form, Input, message } from "antd";

function UserForm(props) {
  return (
    <div>
      <fieldset disabled={props.readOnly}>
        <Form
          onFinish={props.onFinish}
          layout="vertical"
          initialValues={props.formValue}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: "100%" }}
          disabled={props.loading}
          validateTrigger={["onBlur", "onChange"]}
          // readOnly={props.readOnly}
        >
          <div className="userform-layout">
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please input username!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Username"
                disabled={props.disabledUser}
              />
            </Form.Item>

            <Form.Item
              name="firstname"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input firstname!",
                },
              ]}
            >
              <Input type="text" placeholder="Firstname" />
            </Form.Item>

            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input lastname!",
                },
              ]}
            >
              <Input type="text" placeholder="Lastname" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  pattern: new RegExp(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                  ),
                  message: "Enter valid email address",
                },
                {
                  required: true,
                  message: "Please input email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="phonenumber"
              label="Phone Number"
              rules={[
                {
                  pattern: new RegExp(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
                  ),
                  message: "Must be ###-###-####",
                },
                {
                  required: true,
                  message: "Please input phonenumber!",
                },
                {
                  max: 12,
                  message: "Value should be 10 character",
                },
              ]}
            >
              <Input type="text" maxLength={12} placeholder="Phone number" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  pattern: new RegExp(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                  ),
                  message:
                    "Minimum 8 characters, at least 1 letter, 1 number and 1 special character",
                },
                {
                  required: true,
                  message: "Please input password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="address1"
              label="Address Line 1"
              rules={[
                {
                  required: true,
                  message: "Please input address1!",
                },
              ]}
            >
              <Input type="text" placeholder="Address1" />
            </Form.Item>

            <Form.Item
              name="address2"
              label="Address Line 2"
              rules={[
                {
                  required: false,
                  message: "Please input address2!",
                },
              ]}
            >
              <Input type="text" placeholder="Address2" />
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input city!",
                },
              ]}
            >
              <Input type="text" placeholder="City" />
            </Form.Item>

            <Form.Item
              name="province"
              label="Province"
              rules={[
                {
                  required: true,
                  message: "Please input province!",
                },
              ]}
            >
              <Input type="text" placeholder="Province" />
            </Form.Item>

            <Form.Item
              name="zipcode"
              label="Zipcode"
              rules={[
                {
                  pattern: new RegExp(
                    /[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1} [0-9]{1}[a-zA-Z]{1}[0-9]{1}/
                  ),
                  message: "Must be ANA NAN (M1L 2E9)",
                },
                {
                  required: true,
                  message: "Please input zipcode!",
                },
              ]}
            >
              <Input type="text" placeholder="Zipcode" />
            </Form.Item>
          </div>
          <div className="userform-btn">
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={props.loading}>
                {props.submitText}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </fieldset>
    </div>
  );
}

export default UserForm;
