import React, { useContext } from 'react';
import { MessageContext } from '../store';

function Message() {
  const [state] = useContext(MessageContext);
  return (
    <div className="toast-container position-fixed" style={{ bottom: '10px', right: '10px' }}>
      {
        state?.messages?.title && (
        <div className={`toast ${state?.messages?.title && 'show'}`} role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
          <div className={`toast-header text-white ${state.messages.type === 'success' ? 'bg-success' : 'bg-danger'}`}>
            <strong className="me-auto">{state.messages.title}</strong>
            {/* <small className="text-muted">{state.messages.type}</small> */}
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
          </div>
          <div className="toast-body">
            {state.messages.text}
          </div>
        </div>
        )
      }
    </div>

  );
}
export default Message;
