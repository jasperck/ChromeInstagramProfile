import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import {
  List,
  ListItem
} from 'material-ui/List';


class LikedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: {
        likedContainer: {
          width: '80%',
          margin: '0 auto',
          minHeight: '300px'
        },
        listItem: {
          height: '80px'
        },
        subheader: {
          paddingLeft: '15px'
        },
        likesContainer: {
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto'
        },
        likes: {
          width: '400px',
          maxHeight: '400px',
          margin: '0 5px'
        },
        imgs: {
          width: '100%',
          height: '100%'
        }
      }
    };
  }

  loadMore = (nextMaxid) => {
    this.props.onLoadMoreClicked(nextMaxid);
  }

  sortLikesByUser = (likes) => (
    likes.reduce((attr, like) => {
      if (!attr[like.user.username]) {
        attr[like.user.username] = [];
      }

      attr[like.user.username].push(like);

      return attr;
    }, {})
  )

  generateLikesNestItems = (list) => (
    list.map((likes, key) => {
      return (
        <div
          key={key}
          className='likes'
          style={this.state.styles.likes}>
          <img src={likes['image_versions2']['candidates'].shift()['url']} style={this.state.styles.imgs} />
        </div>
      );
    })
  )
  
  generateLikedList = (list) => {
    return Object.keys(list).map((user, key) => {
      let userList = list[user];
      let userData = list[user][0]['user'];

      let LikesNestItems = this.generateLikesNestItems(userList);

      return (
        <ListItem
          key={key}
          containerElement='div'
          className={`liked liked-${key}`}
          style={this.state.styles.listItem}
          nestedListStyle={this.state.styles.likesContainer}
          nestedItems={LikesNestItems}
          leftAvatar={<Avatar src={userData.profile_pic_url} size={60} />}>
          <Subheader inset={true}>
            {userData.username}
          </Subheader>
        </ListItem>
      );
    })
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    let {
      items: likes,
      more_available: moreAvailable,
      next_max_id: nextMaxId,
      ...response
    } = this.props.liked;

    let likesSortByUser = this.sortLikesByUser(likes);

    let likedList = this.generateLikedList(likesSortByUser);

    return (
      <div className="liked-container" style={this.state.styles.likedContainer}>
        <List>
          {likedList}
        </List>
        {(moreAvailable && nextMaxId) && <FlatButton label="MORE" fullWidth={true} onTouchTap={() => this.loadMore(nextMaxId)} />}
      </div>
    );
  }
};

export default LikedList;