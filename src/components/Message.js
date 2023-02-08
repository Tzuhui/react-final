import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage } from '../slice/messageSlice';

function Message() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message);
  useEffect(() => {
    if (messages?.title) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [messages]);
  return (
    <div className="toast-container position-fixed" style={{ bottom: '15px', right: '15px' }}>
      <div className={`toast ${messages?.title && 'show'}`} role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay={3000}>
        <div className={`toast-header text-white ${messages.type === 'success' ? 'bg-success' : 'bg-danger'}`}>
          <strong className="me-auto">{messages.title}</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
        </div>
        <div className="toast-body">
          {messages.text}
        </div>
      </div>
    </div>

  );
}
export default Message;
