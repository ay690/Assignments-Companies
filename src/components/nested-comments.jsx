import { useState } from "react";
import useCommentTree from "../hooks/use-comments";
import Comments from "../components/comments";

const NestedComments = ({
  comments = [],
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {

  const [comment, setComment] = useState("");

  const { comments: commentsData, insertComment, editComment, deleteComment } = useCommentTree(comments);

  const handleEditChange = (e) => {
    setComment(e.target.value)
  }

  const handleReply = (commentid, content) => {
   insertComment(commentid, content);
   onSubmit(content);
  }

  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
    onEdit(content);
  }

  const handleDelete = (commentId) => {
    deleteComment(commentId);
    onDelete(commentId);
  }


  const handleSubmit = () => {
    if(comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  }

  return (
    <>
     <div className="add-comment">
       <textarea value={comment} onChange={handleEditChange} rows={3} cols={50} className="comment-textarea" placeholder="Add a new comment...." />
       <button className="comment-button" onSubmit={handleSubmit}>Add</button>
     </div> 
     {commentsData?.map((comment) => {
      <Comments 
       key={comment.id}
       onSubmitComment={handleSubmit}
       onEditComment={handleEdit}
       onDeleteComment={handleDelete}
       comment={comment}
      />
     })}
    </>
  )
};

export default NestedComments;
