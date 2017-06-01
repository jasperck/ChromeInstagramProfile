import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {
  Tabs as MaterialTabs,
  Tab as MaterialTab
} from 'material-ui/Tabs';

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class: {
        Container: 'tabs',
        My: 'tab-my',
        Liked: 'tab-liked'
      },
      styles: {
        tabs: {
          marginBottom: '5px',
        },
        tabsContainer: {
          flexDirection: 'row',
          backgroundColor: 'transparent'
        },
        inkBarStyle: {
          background: 'rgba(0, 188, 212, 1)'
        },
        tab: {
          color: 'rgba(0, 0, 0, 1)',
          fontWeight: '700',
          fontSize: '18px'
        }
      }
    };
  }

  getTabs () {
    return ['My', 'Liked'];
  }

  tabClicked (tab) {
    if (tab === 'Liked') {
      this.props.onLikedClicked();
    } else if (tab === 'My') {
      this.props.onMyClicked();
    } else {
      throw new Error('Can not find the tab you clicked');
    }
  }

  generateTabs = (tabs) => (
    tabs.map((tab, key) => {
      let tabClassName = `${tab} ${this.state.class[tab]}`;

      return (
        <MaterialTab
          key={key}
          label={tab}
          onActive={() => this.tabClicked(tab)}
          style={this.state.styles.tab}
        />
      );
    })
  )

  render() {
    const tabs = this.generateTabs(this.getTabs());

    return (
      <MaterialTabs
        style={this.state.styles.tabs}
        tabItemContainerStyle={this.state.styles.tabsContainer}
        inkBarStyle={this.state.styles.inkBarStyle}>
        {tabs}
      </MaterialTabs>
    );
  }
};

export default Tabs;
