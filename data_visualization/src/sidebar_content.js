import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./material_title_panel";
import logo2 from "./logo2.png";
import profile from "./profile.jpg";
import People from './people'; 

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

class SidebarContent extends React.Component{
  constructor(props) {
      super(props);

      this.state = {
        styles,
      };

  }



  render(){
  const style = this.state.style
    ? { ...styles.sidebar, ...this.state.style }
    : styles.sidebar;



  return (
    <MaterialTitlePanel title={<img src={logo2} height="40" width="auto" alt="="/>} style={style}>
      <div style={styles.content}>
        <a  href="#" >
          <img src={profile} height="auto" width="80" className="rounded-circle" alt="="/>
        </a>

        <div style={styles.divider} />
        <a  href="#" style={styles.sidebarLink } onClick={this.props.onClickRealMap}>
          Measured Air Quality
        </a>
        <a  href="#" style={styles.sidebarLink}>
          Perceived Air Quality
        </a>

        <a  href="#" style={styles.sidebarLink}>
          Vote
        </a>
        <a  href="#" style={styles.sidebarLink} onClick={this.props.onClickPeople}>
          Find Someone around
        </a>
      </div>
    </MaterialTitlePanel>
  );
  };
}


export default SidebarContent;