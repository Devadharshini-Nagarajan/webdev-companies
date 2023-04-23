import React, { useEffect, useState } from "react";
import { Button, Form, Input, Checkbox, Upload, Rate, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";

function ProductForm(props) {
  const [newFile, setNewFile] = useState(null);
  const { Option } = Select;

  useEffect(() => {
    console.log(props.details)
  }, [props]);

  const sendValuesToParent = (values) => {
    if (newFile?.length) {
      values.newFile = newFile[0];
    }
    props.onFinish(values);
  };

  const handleChange = ({ fileList: newFileList }) => {
    newFileList = newFileList.map((el) => {
      return { ...el, status: "done" };
    });
    setNewFile(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Form
        onFinish={sendValuesToParent}
        className="edit-form"
        initialValues={props.details}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%" }}
        validateTrigger={["onBlur", "onChange"]}
      >
        <div className="productform-layout">
          <div>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input name!",
                },
              ]}
            >
              <Input type="text" placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input description!",
                },
              ]}
            >
              <TextArea type="text" placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please input category!",
                },
              ]}
            >
              <Select
                placeholder="Select a option"
                options={[
                  {
                    label: "Moisturizers",
                    options: [
                      {
                        label: "Night Creams",
                        value: "Night Creams",
                      },
                      {
                        label: "Face Oils",
                        value: "Face Oils",
                      },
                    ],
                  },
                  {
                    label: "Cleansers",
                    options: [
                      {
                        label: "Exfoliators",
                        value: "Exfoliators",
                      },
                      {
                        label: "Toners",
                        value: "Toners",
                      },
                    ],
                  },
                  {
                    label: "Others",
                    options: [
                      {
                        label: "Eye Creams",
                        value: "Eye Creams",
                      },
                      {
                        label: "Sunscreen",
                        value: "Sunscreen",
                      },
                    ],
                  },
                ]}
                allowClear
              ></Select>
            </Form.Item>
            <Form.Item
              name="rating"
              label="Rating"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[
                {
                  required: true,
                  message: "Please input brand!",
                },
              ]}
            >
              <Input type="text" placeholder="Brand" />
            </Form.Item>

            <Form.Item
              name="quantityml"
              label="Quantity"
              rules={[
                {
                  pattern: new RegExp(/^[0-9]*$/),
                  message: "Must be only numbers",
                },
                {
                  required: true,
                  message: "Please input quantity!",
                },
              ]}
            >
              <Input type="text" placeholder="Quantity" suffix="ml" />
            </Form.Item>

            <Form.Item
              name="sold"
              label="Items sold"
              rules={[
                {
                  pattern: new RegExp(/^[0-9]*$/),
                  message: "Must be only numbers",
                },
                {
                  required: true,
                  message: "Please enter no of items sold!",
                },
              ]}
            >
              <Input type="text" placeholder="Sold" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  pattern: new RegExp(/^[0-9]*$/),
                  message: "Must be only numbers",
                },
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <Input type="text" placeholder="Price" prefix="$" />
            </Form.Item>
            <div style={{ display: "flex" }}>
              <Form.Item
                name="isfav"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
                style={{ width: "100%", marginLeft: "7rem" }}
              >
                <Checkbox>Is Favourite</Checkbox>
              </Form.Item>
              <Form.Item
                name="instock"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
                style={{ width: "100%" }}
              >
                <Checkbox>In Stock</Checkbox>
              </Form.Item>
            </div>
            <Form.Item
              name="discount"
              label="Discount"
              rules={[
                {
                  pattern: new RegExp(
                    /^(?<whole>100|\d{1,2})(?<fract>\.\d{1,8})?$/
                  ),
                  message: "Must be only numbers and less than 100",
                },
                {
                  required: true,
                  message: "Please input your discount!",
                },
              ]}
            >
              <Input type="text" placeholder="Discount" suffix="%" />
            </Form.Item>
          </div>
          <div>
            <Form.Item valuePropName="imagefile" className="upload-div">
              <Upload
                action={null}
                listType="picture-circle"
                accept="image/*"
                fileList={newFile}
                showUploadList={{ showPreviewIcon: false }}
                onChange={handleChange}
              >
                {newFile?.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </div>
        </div>
        <div className="productform-btn">
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={props.loading}
              className="login-btn"
            >
              Update
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default ProductForm;
