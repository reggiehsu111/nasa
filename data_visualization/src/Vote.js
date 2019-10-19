import React from "react";
import Sidebar from 'react-sidebar';
import VoteContent from "./vote_content";
import MaterialTitlePanel from "./material_title_panel";
import Coco from "./Coco.jpg";
import Eric from "./Eric.jpg";
import HH from "./HH.jpg";
import Juan from "./Juan.jpg";
import wang from "./wang.jpg";
import Mao from "./Mao.jpg";
import Crayon from "./crayon.jpeg";
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
  

class Vote extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: true,
      touchHandleWidth: 20,
      dragToggleDistance: 90
    };

    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    }
  componentDidMount() {
    this.setState({open: true});
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }


  render() {
    const sidebar = <VoteContent handleVote={this.props.handleVote}/>;
    const contentHeader = (
      <span>
        {!this.state.docked && (
          <a
            onClick={this.menuButtonClick}
            href="#"
            style={styles.contentHeaderMenuLink}
          >
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
          <div style={styles.content}>
          </div>
      </Sidebar>
    );
  }

  }
 
export default Vote;