import React from "react";
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from "./material_title_panel";
import SidebarContent from "./sidebar_content";
import logo2 from "./logo2.png";

// Be sure to include styles at some point, probably during your bootstraping
// import 'react-sidenav/dist/react-sidenav.css';
 
const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
  }
};
  

class SidebarProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
    };

    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    }

  onSetOpen(open) {
    this.setState({ open });
    this.props.onClickPeople();
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }


  render() {
    const sidebar = <SidebarContent onClickPeople={this.props.onClickPeople}/>;
    const contentHeader = (
      <span>
        {!this.state.docked && (
          <a
            onClick={this.menuButtonClick}
            href="#"
            style={styles.contentHeaderMenuLink}
          >
            <img src={logo2} height="40" width="auto" alt="="/>
          </a>
        )}
      </span>
    );

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      sidebarClassName: "custom-sidebar-class",
      contentId: "custom-sidebar-content-id",
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen
    };

    return (
      <Sidebar {...sidebarProps}>
        <MaterialTitlePanel title={contentHeader}>
          <div style={styles.content}>
          </div>
        </MaterialTitlePanel>
      </Sidebar>
    );
  }

  }
 
export default SidebarProfile;