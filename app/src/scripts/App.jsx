import React, {Component} from 'react';
import {connect} from 'react-redux';
import Tabs from './components/Tabs';
import LikedList from './components/LikedList';
import instagramApi from '../../../lib/instagramApi';
import {
  IG_USER_BODY_CLASS_NAME,
  PROFILE_PAGE_CONTENT_ID,
  PROFILE_PAGE_LIKED_CLASS_NAME,
  IG_USER_EDIT_BUTTON_CLASS_NAME
} from '../../../lib/constants';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTabs: false,
      showLikedList: false
    };
  }

  isInMyPersonalPage = () => (document.getElementsByClassName(IG_USER_EDIT_BUTTON_CLASS_NAME).length > 0)

  getInstagramProfilePageBody = () => (document.getElementsByClassName(IG_USER_BODY_CLASS_NAME)[0].parentNode)

  disableInstagramProfileMainContent = () => {
    let instagramProfileBody = this.getInstagramProfilePageBody();

    instagramProfileBody.id = PROFILE_PAGE_CONTENT_ID;
  }

  enableInstagramProfileMainContent = () => {
    let instagramProfileBody = this.getInstagramProfilePageBody();

    instagramProfileBody.id = '';
  }

  likedHandler = () => {
    instagramApi.getLiked()
      .then(this.loadLiked)
      .then(this.disableInstagramProfileMainContent)
      .catch(console.error);
  };

  loadMoreHandler = (id) => {
    instagramApi.getLiked(id)
      .then(this.updateLiked)
      .catch(console.error);
  }

  myClickedHandler = () => {
    this.setState({ showLikedList: false })

    this.enableInstagramProfileMainContent();
  }

  loadLiked = (response) => {
    this.props.dispatch({
      type: 'SET_LIKED',
      data: response.data
    });

    this.setState({ showLikedList: true })
  }

  updateLiked = (response) => {
    this.props.dispatch({
      type: 'UPDATE_LIKED',
      data: response.data
    });
  }

  resetLiked = () => {
    this.props.dispatch({
      type: 'RESET_LIKED'
    });
  }

  componentDidMount() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.resetLiked();

      if (this.isInMyPersonalPage()) {
        this.setState({ showTabs: true });

        this.props.update();
      }
    });
  }

  renderList() {
    if (!this.state.showLikedList) {
      return;
    }

    return (
      <LikedList liked={this.props.liked} onLoadMoreClicked={this.loadMoreHandler} reset={this.resetLiked} />
    );
  }

  renderTabs() {
    if (!this.state.showTabs) {
      return;
    }

    return (
      <Tabs
        onLikedClicked={this.likedHandler}
        onMyClicked={this.myClickedHandler} />
    );
  }

  render() {
    return (
      <div className={PROFILE_PAGE_LIKED_CLASS_NAME}>
        {this.renderTabs()}
        {this.renderList()}
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    liked: state.liked
  };
};

export default connect(mapStateToProps)(App);