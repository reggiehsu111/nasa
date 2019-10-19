import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./material_title_panel";
import profile from "./profile.jpg";
import Coco from "./Coco.jpg";
import Eric from "./Eric.jpg";
import HH from "./HH.jpg";
import Juan from "./Juan.jpg";
import wang from "./wang.jpg";
import Mao from "./Mao.jpg";
import Crayon from "./crayon.jpeg";

const styles = {
  sidebar: {
    width: 512,
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
    backgroundColor: "lavender",
    flexWrap: "wrap",
    alignItems: "center"
  }
};



const PeopleContent = props => {
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;


  return (
    <MaterialTitlePanel title="People Nearby" style={style}>
      <div style={styles.content}>
        <div className="row" style={{marginTop:"40px"}}>
          <div className="col" >
            <img src={Coco} height="150" width="auto" className="rounded-circle mx-auto d-block" />
          </div>
          <div className="col" >
            <img src={wang} height="150" width="auto" className="rounded-circle mx-auto d-block"/>
          </div>
        </div>
        <div className="row" style={{marginTop:"40px"}}>
          <div className="col" >
            <img src={HH} height="150" width="auto" className="rounded-circle mx-auto d-block"/>
          </div>
          <div className="col" >
            <img src={Juan} height="150" width="auto" className="rounded-circle mx-auto d-block"/>
          </div>
        </div>
        <div className="row" style={{marginTop:"40px"}}>
          <div className="col" >
            <img src={Mao} height="150" width="auto" className="rounded-circle mx-auto d-block"/>
          </div>
          <div className="col" >
            <img src={Crayon} height="150" width="auto" className="rounded-circle mx-auto d-block"/>
          </div>
        </div>
      </div>
    </MaterialTitlePanel>
  );
};

PeopleContent.propTypes = {
  style: PropTypes.object
};

export default PeopleContent;