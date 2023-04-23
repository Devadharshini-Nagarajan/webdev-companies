import { React, useState, useContext, useEffect } from "react";
import {
  Card,
  notification,
  Rate,
  Button,
  Input,
  Switch,
  Tooltip,
  Result,
} from "antd";
import "./Products.scss";
import axios from "axios";
import { ProjectContext } from "../../Context";
import { Link } from "react-router-dom";
import BackButton from "../../BackButton";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const Products = () => {
  const [state, dispatch] = useContext(ProjectContext);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [search, setSearch] = useState("");
  const { Search } = Input;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${state.login.companyUrl}/getProducts/`)
      .then((res) => {
        let filteredData = res.data;
        dispatch({
          type: "updateAllProducts",
          payload: filteredData,
        });
        filterTable(showAll, search, filteredData);
      })
      .catch((_) => {
        notification.error({
          key: "api_error",
          message: "Failed to fetch products list",
          description: "Try again later.",
        });
      })
      .finally((_) => setLoading(false));
  }, []);

  const onSearch = (e) => {
    setSearch(e.target.value);
    filterTable(showAll, e.target.value, state.allProducts);
  };

  const onSwitch = () => {
    setShowAll(!showAll);
    filterTable(!showAll, search, state.allProducts);
  };

  const filterTable = (show, searchtext, allProducts) => {
    let mainData = show
      ? allProducts
      : allProducts.filter((el) => el.createdby === state.login.username);
    let value = searchtext.toLowerCase();
    if (value) {
      let newData = mainData.filter(
        (el) =>
          el.name.toLowerCase().includes(value) ||
          el.description.toLowerCase().includes(value) ||
          el.brand.toLowerCase().includes(value)
      );
      setTableData(newData);
    } else {
      setTableData(mainData);
    }
  };

  return (
    <div className="list-content">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 25px 30px 0",
        }}
      >
        <BackButton path="/" />
        <div>
          <Tooltip title="Toggle to show my / all products">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={showAll}
              onChange={onSwitch}
            />
          </Tooltip>
          <Search
            placeholder="Search"
            onChange={onSearch}
            value={search}
            style={{
              width: 200,
              marginLeft: "20px",
              marginRight: "20px",
            }}
          />
          <Link to="/addProduct">
            <Button type="primary" className="cursor-pointer">
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      {tableData.length ? (
        <div className="cardlist-row">
          {tableData?.map((product) => {
            return (
              <div span={6} key={product.productid}>
                <Card className="card" loading={loading}>
                  <div className="card-row">
                    <img
                      src={`data:image/jpeg;base64,${product.imagefile}`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `${process.env.PUBLIC_URL}/assets/imgs/noimage.png`;
                      }}
                      alt={product.name}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Link to={`/product/${product.productid}`}>
                        <span>{product.name}</span>
                      </Link>
                      <Rate disabled value={product.rating} />
                      <span>{product.brand}</span>
                      <span>{product.price}</span>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <Result
          className="result-products"
          status="warning"
          title="No data found"
        />
      )}
    </div>
  );
};

export default Products;
