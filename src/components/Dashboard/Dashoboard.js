import { React, useState, useContext, useEffect } from "react";
import "./Dashboard.scss";
import { Column, Pie } from "@ant-design/plots";
import BackButton from "../BackButton";
import { Row, Col } from "antd";
import { ProjectContext } from "../Context";
import axios from "axios";

function Dashoboard(props) {
  const [state, dispatch] = useContext(ProjectContext);
  const [productsList, setProductsList] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState([]);
  const [productsSoldCategoryPie, setProductsSoldCategoryPie] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    axios
      .get(`${state.login.companyUrl}/getProducts/`)
      .then((res) => {
        let userData = res.data.filter(
          (el) => el.createdby === state.login.username
        );
        let filteredData = state.login.isAdmin ? res.data : userData;
        let categoryData = state.login.isAdmin ? res.data : userData;
        let soldData = state.login.isAdmin ? res.data : userData;

        let categories = [
          ...new Set(
            categoryData.map((el) => {
              return el.category;
            })
          ),
        ].map((categ) => {
          return {
            type: categ,
            count: filteredData.filter((fi) => fi.category === categ).length,
          };
        });
        console.log(categories);
        setCategoriesMap(categories);

        let sold = [
          ...new Set(
            soldData.map((el) => {
              return el.category;
            })
          ),
        ].map((categ) => {
          let count = 0;
          filteredData
            .filter((fi) => fi.category === categ)
            .forEach((el) => {
              count = count + el.sold;
            });
          return {
            type: categ,
            value: count,
          };
        });
        setProductsSoldCategoryPie(sold);

        setProductsList(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const config = {
    data: categoriesMap,
    xField: "type",
    yField: "count",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  const getPieConfig = () => {
    return {
      appendPadding: 10,
      data: productsSoldCategoryPie,
      angleField: "value",
      colorField: "type",
      radius: 0.8,
      label: {
        type: "outer",
        content: "{name} {percentage}",
      },
      interactions: [
        {
          type: "pie-legend-active",
        },
        {
          type: "element-active",
        },
      ],
    };
  };

  return (
    <div className="dashbord-container">
      <BackButton path="/" />
      <Row>
        <Col span={11}>
          <h2>No of products in Categories</h2>
          <Column {...config} />
        </Col>
        <Col offset={1} span={12}>
          <h2>Products sold </h2>
          <Pie {...getPieConfig()} />
        </Col>
      </Row>
    </div>
  );
}

export default Dashoboard;
