//import classes from "./Sidebar.module.css";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { BsHouseDoorFill, BsTable, BsList,BsCurrencyDollar} from "react-icons/bs";
const Sidebar = () => {
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <BsHouseDoorFill />,
    },
    {
      path: "/table",
      name: "Table",
      icon: <BsTable />,
    },
    {
      path: "/sales",
      name: "Sales",
      icon: <BsCurrencyDollar />,
    },
  ];

  const GetNavLinks = () => {
    const getNavLinks = menuItem.map((obj, index) => {
      return (
        <NavLink
          to={obj.path}
          key={index}
          className="sidebarEle"
          activeclassname="active"
        >
          <div className="icon">{obj.icon}</div>
          <div>{obj.name}</div>
        </NavLink>
      );
    });
    return getNavLinks;
  };

  return (
    <div className="sidebar">
      <div className="sidebarTitle">
        <div className="sidebarTitle-icon">
          <BsList />
        </div>
        <div>Menu</div>
      </div>
      <GetNavLinks />
    </div>
  );
};

export default Sidebar;
