import { React, useContext } from "react";
import { Card } from "antd";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../Context";

function Home() {
  const [state, dispatch] = useContext(ProjectContext);
  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate("/profile");
  };

  const navigateProducts = () => {
    navigate("/products");
  };

  const navigateUsersList = () => {
    navigate("/users");
  };

  const navigateDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="home-content"
      style={{
        gridTemplateColumns: state.login.isAdmin
          ? "repeat(2,1fr)"
          : "repeat(3,1fr)",
        paddingLeft: state.login.isAdmin ? "9rem" : "3rem",
      }}
    >
      <Card className="card-items" onClick={navigateProfile}>
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/imgs/user.png`} />
          <span className="title">Profile</span>
          <span className="description">
            Welcome to your profile section! Here, you can view and manage your
            personal information, activity, and settings.
          </span>
        </div>
      </Card>
      {state.login.isAdmin && (
        <Card className="card-items" onClick={navigateUsersList}>
          <div>
            <img src={`${process.env.PUBLIC_URL}/assets/imgs/add-group.png`} />
            <span className="title">Users</span>
            <span className="description">
              With this section, you can ensure that your platform has a
              well-maintained user base, providing a smooth user experience and
              enhancing the security of your system.
            </span>
          </div>
        </Card>
      )}
      <Card className="card-items" onClick={navigateDashboard}>
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/imgs/statistical.png`} />
          <span className="title">Dashboard</span>
          <span className="description">
            Use the powerful tools and metrics provided in this section to
            optimize your product offerings, track performance, and make
            data-driven decisions to drive your business forward.
          </span>
        </div>
      </Card>
      <Card className="card-items" onClick={navigateProducts}>
        <div>
          <img src={`${process.env.PUBLIC_URL}/assets/imgs/box.png`} />
          <span className="title">Products</span>
          <span className="description">
            By utilizing this section, you can showcase your products to
            potential customers, ensure that they are up-to-date and accurate,
            and maintain an organized inventory of your offerings.
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Home;
