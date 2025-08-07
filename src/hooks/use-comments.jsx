import { useState } from "react";

const useCommentTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  //1st -> insertComment
  //2-> editComment
  //3-> deleteComment

  const insertNode = (tree, commentId, content) => {
    return tree.map((comment) => {
        if(comment.id === commentId) {
            return {
                ...comment,
                replies: [...comment.replies, content]
            }
        } else if (comment.replies && comment.replies.length > 0) {
           return {
            ...comment,
            replies: insertNode(comment.replies, commentId, content),
           }
        }
        return comment;
    })
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: new Date(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if(commentId) {
        setComments((prevComment) => insertNode(prevComment, commentId, newComment))
    } else {
        setComments((prevComment) => [newComment, ...prevComment]);
    }
  };

  const editNode = (tree, commentId, content) => {
    return tree.map((comment) => {
       if(comment.id === commentId) {
         return {
            ...comment,
            content,
            timestamp: new Date().toISOString(),
         };

       } else if(comment.replies && comment.replies.length > 0) {
        return {
            ...comment,
            replies: editNode(comment.replies, commentId, content)
        }
       }
       return comment
    })
  }

  const editComment = (commentId, content) => {
    setComments((prevComment) => editNode(prevComment, commentId, content))
  }

    const deleteNode = (tree, commentId) => {
      return tree.reduce((acc, comment) => {
        if (comment.id === commentId) {
          return acc; // Skip this comment (don't include it in the result)
        }
        
        // Create a new comment object with filtered replies
        const newComment = { ...comment };
        
        if (newComment.replies && newComment.replies.length > 0) {
          newComment.replies = deleteNode(newComment.replies, commentId);
        }
        
        return [...acc, newComment];
      }, []);
    };


  const deleteComment = (commentId) => {
     setComments((prevComments) => deleteNode(prevComments, commentId));
  }


  return { comments, insertComment, editComment, deleteComment };
};

export default useCommentTree;
