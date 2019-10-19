import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./material_title_panel";
import voteImage from "./vote.png";



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
    backgroundColor: "white",
    flexWrap: "wrap",
    alignItems: "center"
  }
};


class VoteContent extends React.Component {

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
    <MaterialTitlePanel title="Vote" style={style}>
      <div style={styles.content}>
        <div className="col" >
          <img src={voteImage} height="650" alt="img" className="mx-auto d-block" onClick={this.props.handleVote}/>
        </div>
      </div>
    </MaterialTitlePanel>
  );
    }
  
};



export default VoteContent;