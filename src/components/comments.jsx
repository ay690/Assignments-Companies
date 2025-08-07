import { useState } from "react";

const Comments = ({
  comment = {},
  onSubmitComment = () => {},
  onEditComment = () => {},
  onDeleteComment = () => {},
}) => {
  const[expand, setExpand] = useState(false);
  const[replyComment, setReplyComment] = useState("");
  const[editMode, setEditMode] = useState(false);
  const[editComment, setEditComment] = useState(comment.content);
  
  const toggleExpand = () => {
    setExpand(!expand);
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditComment(comment.content);
  }

  const hanldeReplySubmit = () => {
    if(replyComment) {
      onSubmitComment(comment.id, replyComment);
      setReplyComment("")
    }
  }

  const handleChange = (e) => {
    if(editMode) {
      setEditComment(e.target.value);
    } else {
      setReplyComment(e.target.value);
    }
  }


  const handleEditSubmit = () => {
    onEditComment(comment.id, editComment);
  }

  return (
  <div className="comment">
    {!expand ? (
      <>
      <p>{comment.content}</p>
      <p>{comment.votes}</p>
      <p>{new Date(comment.timestamp).toISOString()}</p>
      </>
    ) : (
       <div className="add-comment">
       <textarea value={comment} onChange={editComment} rows={3} cols={50} className="comment-textarea" placeholder="Add a new comment...." />
       <button className="comment-button" onSubmit={handleEditSubmit}>Save Edit</button>
       <button className="comment-button" onSubmit={toggleEditMode}>Cancel Edit</button>
     </div> 
    )
  }

  <div className="comment-actions">
   <button className="comment-button" onClick={toggleExpand}>{expand ? "Hide Replies" : "Reply"}</button>
   <button className="comment-button" onClick={toggleEditMode}>Edit</button>
   <button className="comment-button" onClick={() => onDeleteComment(comment.id)}>Delete</button>
  </div>

     {expand && (
        <div className="comment-replies">
          <div className="add-comment">
            <textarea
              value={replyComment}
              onChange={handleChange}
              placeholder="Add a reply..."
              rows={3}
              cols={50}
              className="comment-textarea"
            />
            <button onClick={hanldeReplySubmit} className="comment-button">
              Submit Reply
            </button>
          </div>
          {comment?.replies?.map((reply) => (
            <Comments
              key={reply.id}
              comment={reply}
              onSubmitComment={onSubmitComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}

  </div>
  );
};

export default Comments;
