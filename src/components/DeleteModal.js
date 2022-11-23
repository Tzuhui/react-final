import React from 'react';

function DeleteModal({
  check, close, text,
}) {
  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h1 className="modal-title text-white fs-5" id="exampleModalLabel">刪除確認</h1>
            <button type="button" className="btn-close" onClick={close} aria-label="Close" />
          </div>
          <div className="modal-body">
            {text}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={close}>取消</button>
            <button type="button" className="btn btn-danger" onClick={check}>確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
