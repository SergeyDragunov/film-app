import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HeroScreen } from '../HeroScreens/HeroScreens';

import './style.css';

class PageSingle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			needsUpdate: true,
			isMobile: window.innerWidth < 991
		};

		this.setHeroOnResize = this.setHeroOnResize.bind(this);
	}

	componentDidMount() {
		const { heroType } = this.props;

		this.setHero()

		if (heroType === 'single') {
			window.addEventListener('resize', this.setHeroOnResize);
		}
	}

	componentDidUpdate() {
		this.setHero()
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.setHeroOnResize);
	}

	setHeroOnResize() {
		if (window.innerWidth > 991 && this.state.isMobile) {
			this.setState({isMobile: false});
		} else if (window.innerWidth < 991 && !this.state.isMobile) {
			this.setState({isMobile: true});
		}
	}

	setHero() {
		const tabLinks = document.getElementsByClassName('tab-links')[0];
		if (tabLinks) {
			const pageContent = document.getElementsByClassName('movie-single-ct')[0];
			const marginTop = Math.round(tabLinks.getBoundingClientRect().bottom - pageContent.getBoundingClientRect().top);
			const fixedSpaceFromTop = 250;
			if (this.state.marginTop !== marginTop) {
				this.setState({marginTop, heroHeight: fixedSpaceFromTop + marginTop});
			}
		}
	}

	render() {
		const { children, className, isSticky, heroType, Hero } = this.props;
		const { isMobile } = this.state;
		let heroStyle, contentStyle, detailClass;

		const { heroHeight, marginTop } = this.state;

		if (heroType === 'single') {
			heroStyle = () => ({
				height: isMobile ? 300 : (heroHeight || 0),
		    backgroundImage: 'url(http://haintheme.com/demo/html/bustter/images/uploads/hero-bg.jpg)',
			});
			contentStyle = () => ({marginTop: isMobile ? -150 : -(marginTop || 0)});
			detailClass = 'detail-page';
		}

		return (
			<div>
				{heroType === 'single' ? <HeroScreen style={heroStyle()} /> : <Hero />}
				<div 
					style={heroType === 'single' ? contentStyle() : {}} 
					className={`page-single ${detailClass || ''} ${className ? className : ''}`} >
					<div className="container">
						<div className="row page-single__content" style={isSticky ? {display: 'flex'} : {}}>
							{children}						
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PageSingle.Side = ({ children, cols, order }) => (
	<div className={`col-md-${cols ? cols : '4'} col-sm-12 col-xs-12 ${order ? order : ''}`}>
		{ children }
	</div>
);

PageSingle.Content = ({ children, cols, order }) => (
	<div className={`col-md-${cols ? cols : '8'} col-sm-12 col-xs-12 ${order ? order : ''}`}>
		<div className="movie-single-ct main-content">
			{ children }
		</div>
	</div>
);

const mapStateToProps = ({ details }) => ({
	isFetching: details.settings.isFetching
});

export default connect(mapStateToProps, null)(PageSingle);