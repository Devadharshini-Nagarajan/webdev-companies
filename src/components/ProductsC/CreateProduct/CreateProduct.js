import { React, useState, useContext, useEffect } from "react";
import "./CreateProduct.scss";
import ProductForm from "../ProductForm";
import axios from "axios";
import { ProjectContext } from "../../Context";
import BackButton from "../../BackButton";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function CreateProduct(props) {
  const [state, dispatch] = useContext(ProjectContext);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = (values) => {
    values.image = "";
    values.createdby = state.login.username;
    values.createdat = new Date().toString();
    values.company = state.login.company;
    let newFile = values.newFile?.originFileObj ?? null;
    delete values["newFile"];
    delete values["imagefile"];
    setLoading(true);
    const formData = new FormData();
    formData.append("productdata", JSON.stringify(values));
    formData.append("imagefile", newFile);

    axios
      .post(`${state.login.companyUrl}/addProduct`, formData)
      .then((res) => {
        console.log(res);
        messageApi.open({
          type: "success",
          content: "Successfully updated the details",
        });
        navigate("/products");
      })
      .catch((err) => {
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content: "Failed to update. Try again later. ",
        });
        console.log(err);
      })
      .finally((_) => setLoading(false));
  };

  return (
    <div className="addproduct-content">
      {contextHolder}
      <BackButton path="/products" />
      <div className="form">
        <ProductForm onFinish={onFinish} details={{}} loading={loading} />
      </div>
    </div>
  );
}

export default CreateProduct;
