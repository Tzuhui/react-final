import React from 'react';

function DeleteModal({
  check, close, text,
}) {
  return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">刪除確認</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            {text}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={close} data-bs-dismiss="modal">取消</button>
            <button type="button" className="btn btn-danger" onClick={check}>確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
