import React from 'react';
import ReactLoading from 'react-loading';

function Loading() {
  return (
    <div
      className="position-fixed top-0 start-0 bottom-0 end-0 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '100' }}
    >
      <ReactLoading type="balls" color="white" height="100px" width="100px" />
    </div>
  );
}

export default Loading;
