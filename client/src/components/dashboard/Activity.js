import React, { Component } from "react";
import { connect }          from 'react-redux';

import { updateBoard }      from '../../actions';
import Spinner              from '../Spinner';

class Activity extends Component {
  state = {
    hover: false,
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }

  /* Parameter `box` to know which icon is being hovered
   * Parameter `hover` to know if it's hovered or not
   */
  onBoxHover = (event, isHovering) => {
    event.stopPropagation();
    this.setState({ hover: isHovering });
  }

  onBoxClick = (event) => {
    event.stopPropagation();
    this.setState({ loading: true });
    if (this.props.activity.status === 'Opened') {
      this.props.updateBoard('completed', this.props.listId, this.props.activity._id);  
    } else {
      this.props.updateBoard('opened', this.props.listId, this.props.activity._id);  
    }
  }

  onIgnoreClick = (event) => {
    event.stopPropagation();
    this.setState({ loading: true });
    if (this.props.activity.status !== 'Ignored') {
      this.props.updateBoard('ignored', this.props.listId, this.props.activity._id);  
    }
  }

  onCheckClick = (event) => {
    event.stopPropagation();
    this.setState({ loading: true });
    if (this.props.activity.status !== 'Completed') {
      this.props.updateBoard('completed', this.props.listId, this.props.activity._id);
    }
  }

  onActivityClick = (event) => {
    event.stopPropagation();
    this.props.handleActivityClick(event, this.props.activity);
  }

  render() {
    const { activity       } = this.props;
    const { loading, hover } = this.state;
    let status = '';

    if (activity.status === 'Completed') {
      status = 'activity__completed';
    } else if (activity.status === 'Ignored') {
      status = 'activity__ignored';
    } else {
      status = '';
    }

    return (
      <div
        className="activity"
        onMouseOver={e => this.onBoxHover(e, true)}
        onMouseLeave={e => this.onBoxHover(e, false)}
        onClick={this.onActivityClick}
      >
        <div className={`${status}`}>{activity.name}</div>
        <div className="activity__icon-box">
          { (() => {
              if (loading) {
                return <Spinner />
              } else {
                if (activity.status === 'Completed') {
                  return <img className="activity__icon activity-checked" src="/icons/checkbox-checked.svg" alt="checkbox" onClick={this.onBoxClick} />;
                } else if (activity.status === 'Ignored') {
                  return <img className="activity__icon" src="/icons/checkbox.svg" alt="checkbox" onClick={this.onBoxClick} />;
                } else {
                  return <img className="activity__icon" src="/icons/checkbox.svg" alt="checkbox" onClick={this.onBoxClick} />;
                }
              }
            })()
          }
          { 
            hover ? (
              [
                <img className="activity__icon-ignore" src="/icons/delete.svg" alt="delete" onClick={this.onIgnoreClick} key={1} />,
                <img className="activity__icon-check" src="/icons/arrow.svg" alt="check" onClick={this.onCheckClick} key={2} />
              ]
            ) : (null)
          }
        </div>
      </div>
    );
  }
}

export default connect(null, { updateBoard })(Activity)