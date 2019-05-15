import { Component } from 'react';
import { withRouter } from 'react-router-dom'; 

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
  	const noScroll = this.props.location.state ? this.props.location.state.noScroll : false;
    if (this.props.location !== prevProps.location && !noScroll) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop);