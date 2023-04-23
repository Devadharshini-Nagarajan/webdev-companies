import { React, useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProjectContext } from "../../Context";
import axios from "axios";
import "./ProductDetails.scss";
import { Rate, Button, Modal, Select, message, Result } from "antd";
import dayjs from "dayjs";

import BackButton from "../../BackButton";
import ProductForm from "../ProductForm";

function ProductDetails() {
  const [state, dispatch] = useContext(ProjectContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [details, setDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { Option } = Select;

  useEffect(() => {
    getProdctDetails();
    getImageUI();

    return () => {};
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const getProdctDetails = () => {
    setLoading(true);
    axios
      .get(`${state.login.companyUrl}/getProductByProductid/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((_) => {})
      .finally((_) => setLoading(false));
  };

  const getImageUI = () => {
    setLoading(true);
    axios
      .get(`${state.login.companyUrl}/products/${id}/image`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setImageData(
          `data:${response.headers[
            "content-type"
          ].toLowerCase()};base64,${base64Image}`
        );
      })
      .catch((_) => {})
      .finally((_) => setLoading(false));
  };

  const onFinish = (values) => {
    values.productid = details.productid;
    values.image = "";
    values.createdby = details.createdat;
    values.createdat = details.createdby;
    values.company = details.company;
    let newFile = values.newFile?.originFileObj ?? null;
    delete values["newFile"];
    delete values["imagefile"];
    setLoading(true);
    const formData = new FormData();
    formData.append("productdata", JSON.stringify(values));
    formData.append("imagefile", newFile);

    axios
      .put(`${state.login.companyUrl}/updateProduct`, formData)
      .then((res) => {
        console.log(res);
        messageApi.open({
          type: "success",
          content: "Successfully updated the details",
        });
        setDetails(res.data);
        getImageUI();
        handleCancel();
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

  const onDelete = () => {
    setLoading(true);
    axios
      .delete(`${state.login.companyUrl}/deleteProduct/${details.productid}`)
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Successfully deleted the product",
        });
        navigate("/products");
      })
      .catch((err) => {
        messageApi.destroy();
        messageApi.open({
          type: "error",
          content: "Failed to delete. Try again later. ",
        });
        console.log(err);
      })
      .finally((_) => setLoading(false));
  };

  const getDate = () => {
    return dayjs(details.createdat).format("DD MMM YYYY");
  };

  return (
    <div style={{ margin: "30px" }}>
      {contextHolder}
      <BackButton path="/products" />
      {details.productid ? (
        <div className="details-content">
          <div>
            <img
              src={
                imageData ?? `${process.env.PUBLIC_URL}/assets/imgs/noimage.png`
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `${process.env.PUBLIC_URL}/assets/imgs/noimage.png`;
              }}
              alt="Product Image"
              className="product-img"
            />
          </div>
          <div className="details">
            {(state.login.username === details.createdby ||
              state.login.isAdmin) && (
              <div className="actions">
                <Button
                  type="primary"
                  style={{ width: "100px", marginRight: "10px" }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Edit
                </Button>
                <Button
                  danger
                  style={{ width: "100px" }}
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete
                </Button>
              </div>
            )}
            <h2>{details.name}</h2>
            <h4 style={{ textAlign: "center" }}>
              <span>{details.brand}</span>
            </h4>
            <Rate disabled value={details.rating} />
            <small> 55 Reviews</small>
            <div style={{ marginTop: "15px" }}>
              <strong>$ {details.price}</strong>
              {/* add discount logic */}

              <p>{details.sold} sold out</p>
            </div>

            <span style={{ marginTop: "10px" }}>{details.description}</span>
            <div className="set2">
              <div className="column-flex">
                <strong>Category</strong>
                <span>{details.category}</span>
              </div>
              <div className="column-flex">
                <strong>Standard size</strong>
                <span>{details.quantityml} ml</span>
              </div>
            </div>
            {state.login.isAdmin && (
              <div>
                <b>Created by</b>&nbsp; {details.createdby}
              </div>
            )}
            <span style={{ fontFamily: "initial" }}>
              Created on: {getDate()}
            </span>
          </div>
        </div>
      ) : (
        <div>
          <Result
            status="warning"
            title="Product not found."
            extra={
              <Link to="/products">
                <Button type="primary" key="console">
                  Go to Products
                </Button>
              </Link>
            }
          />
        </div>
      )}

      <Modal
        title="Edit Product"
        open={isModalOpen}
        footer={null}
        closable={true}
        onCancel={handleCancel}
        width={1200}
      >
        <ProductForm onFinish={onFinish} details={details} loading={loading} />
      </Modal>

      <Modal
        title="Delete"
        open={isDeleteModalOpen}
        onOk={onDelete}
        onCancel={handleCancel}
      >
        Are you you want to delete the product?
      </Modal>
    </div>
  );
}

export default ProductDetails;
