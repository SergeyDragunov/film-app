import React from 'react';

import './style.css'

const getBase64Image = (blob, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function() {
    cb(reader.result);                
  }
}

const ContentUploadPoster = ({ poster, error, uploadHandler, errorHandler, className, headshot }) => {
	const handleFileChange = e => {
    const file = e.target.files[0];
    if(file) {
      if(file && (file.size / Math.pow(1024, 2) < 1)) {
				getBase64Image(file, res => uploadHandler(res));
				errorHandler('')
      } else if (file.size / Math.pow(1024, 2) >= 1) {
        errorHandler('Maximum size for uploaded files 1Mb')
      }
    }
  }

	return (
		<div className="content-upload-poster">
			{ 
				poster ?
				<div className='content-upload-poster__poster'>
					<img src={poster} alt="poster" />
				</div> :
				<h3 className="content-upload-poster__poster-title">No {headshot ? 'Portrait' : 'Poster'} Uploaded</h3>  
			}
      { 
        error && 
        <p className="content-upload-poster__error">
          <span className="error-msg">{ error }</span>
        </p>
      }
			<div className="content-upload-poster__upload-btn-wrapper">
        <div>
          <input 
            id="poster" 
            className='sr-only' 
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange} />
          <label htmlFor="poster" className="redbtn">Upload {headshot ? 'Portrait' : 'Poster'}</label>
        </div>
        {
          !!poster &&
          <button 
            type='button'
            className='content-upload-poster__remove-poster-btn'
            onClick={() => uploadHandler('')}
          >
            Remove Image
          </button>
        }
      </div>
		</div>
	)
}

export default ContentUploadPoster;