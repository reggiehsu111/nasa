import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./material_title_panel";

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    padding: "16px",
    height: "100%",
    backgroundColor: "white"
  }
};

const SidebarContent = props => {
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  

  return (
    <MaterialTitlePanel title="PAir" style={style}>
      <div style={styles.content}>
        <a href="index.html" style={styles.sidebarLink}>
          Home
        </a>
        <div style={styles.divider} />
        <a  href="#" style={styles.sidebarLink}>
          Measured Air Quality
        </a>
        <a  href="#" style={styles.sidebarLink}>
          Perceived Air Quality
        </a>
        <a  href="#" style={styles.sidebarLink}>
          Profile
        </a>
        <a  href="#" style={styles.sidebarLink}>
          Vote
        </a>
        <a  href="#" style={styles.sidebarLink}>
          Find Someone around
        </a>
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;