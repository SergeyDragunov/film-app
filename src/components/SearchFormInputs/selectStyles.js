export default {
	control: (base) => ({
		...base,
		minHeight: '40px',
	  backgroundColor: "#233a50",
	  borderRadius: '3px',
	  border: 'none',
	  lineHeight: 1
	}),

	valueContainer: (base) => {
		return {
			...base,
			fontFamily: "'Nunito', sans-serif",
		  color: "#abb7c4",
		  fontWeight: '300',
		  textTransform: 'none',
		  backgroundColor: '#233a50',
		  border: 'none',
		  fontSize: '12px',
		  borderRadius: '3px',
	    paddingLeft: '12px',
	    lineHeight: 1,
	    outline: 0
		}
	},

	placeholder: (base) => ({
		...base,
		color: "#abb7c4",
		fontSize: '12px',
	}),

	singleValue: (base) => ({
		...base,
		color: "white",
		fontSize: '12px',
		lineHeight: 1
	}),

	multiValueLabel: (base) => ({
		...base,
    color: '#ffffff',
    fontSize: '12px',
    lineHeight: 1
	}),

	multiValue: (base) => ({
		...base,
    height: '23px',
    display: 'inline-flex',
    alignItems: 'center',
    color: '#ffffff',
    fontWeight: '300',
    textTransform: 'none',
    backgroundColor: '#fe5b60',
    lineHeight: 1
	}),

	input: (base) => ({
		...base,
		color: "#abb7c4",
		height: "auto"
	}),

	indicatorSeparator: (base) => ({
		...base,
		display: 'none',
	}),

	menu: (base, state) => {
		return {
			...base,
			opacity: state.isDisabled ? 0.5 : 1,
			transition: 'opacity 300ms',
			borderRadius: '3px',
			backgroundColor: 'transparent'
		}
	},

	menuList: base => ({
		...base,
		color: "#abb7c4",
		borderRadius: '3px',
		fontSize: '12px',
		backgroundColor: '#233a50',
	}),


	option: (base, state) => {
		const { isDisabled, isFocused, isSelected } = state;
		return {
			...base,
			":active": {
				backgroundColor: isSelected ? '#d1e3ff' : isFocused ? '#142230' : isDisabled ? 'grey' : ''
			}, 
			backgroundColor: isSelected ? '#DEEBFF' : isFocused ? '#1b2d3f' : isDisabled ? 'grey' : '',
			color: isSelected ? '#1b2d3f' : isFocused ? '#DEEBFF' :  isDisabled ? 'black' : ''
		}	
	}
}