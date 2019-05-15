import React, { Component } from 'react';
import { FacebookProvider, Page } from 'react-facebook';


class FacebookPlugin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true
		}
	}

  render() {
    const { className } = this.props;

    return (
      <div className={`sb-facebook sb-it ${className ? className : ''}`}>
        <h4 className="sb-title sb-title--sidebar">Find us on Facebook</h4>
        {/* App ID should be valid one. This one is sample */}
        <FacebookProvider appId="1088597931155576">
          <Page 
            href="https://www.facebook.com/haintheme/" 
            tabs="timeline"
            adaptContainerWidth={true} />
        </FacebookProvider>    
      </div>
    )
  }
}

export default FacebookPlugin;