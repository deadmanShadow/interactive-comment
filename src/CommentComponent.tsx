import React, { useEffect, useState } from "react";
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Reply[];
}
interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo?: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}
interface CurrentUser {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}
const CommentComponent: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [replyText, setReplyText] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const currentUser: CurrentUser = {
    image: {
      png: "/image-juliusomo.png",
      webp: "/image-juliusomo.webp",
    },
    username: "juliusomo",
  };
  const initialComments: Comment[] = [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 0,
      user: {
        image: {
          png: "/image-amyrobson.png",
          webp: "/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 0,
      user: {
        image: {
          png: "/image-maxblagun.png",
          webp: "/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [],
    },
    {
      id: 3,
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      createdAt: "1 week ago",
      score: 0,
      user: {
        image: {
          png: "/image-ramsesmiron.png",
          webp: "/image-ramsesmiron.webp",
        },
        username: "ramsesmiron",
      },
      replies: [],
    },
    {
      id: 4,
      content:
        "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      createdAt: "2 days ago",
      score: 0,
      user: {
        image: {
          png: "/image-juliusomo.png",
          webp: "/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    },
  ];
  useEffect(() => {
    setComments(initialComments);
  }, []);
  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
    const element = document.getElementById(`comment-${commentId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const handleDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };
  const handleDeleteReply = (commentId: number, replyId: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.filter(
          (reply) => reply.id !== replyId
        );
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };
  const handleSendComment = () => {
    if (newCommentText.trim() !== "") {
      const newComment: Comment = {
        id: comments.length + 1,
        content: newCommentText,
        createdAt: "Just now",
        score: 0,
        user: {
          image: currentUser.image,
          username: currentUser.username,
        },
        replies: [],
      };
      setComments([...comments, newComment]);
      setNewCommentText("");
    }
  };
  const handleSendReply = () => {
    if (replyText.trim() !== "" && replyingTo !== null) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === replyingTo) {
          const newReply: Reply = {
            id: comment.replies.length + 1,
            content: replyText,
            createdAt: "Just now",
            score: 0,
            replyingTo: currentUser.username,
            user: {
              image: currentUser.image,
              username: currentUser.username,
            },
          };
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText("");
      setReplyingTo(null);
    }
  };
  const handleIncrement = (commentId: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, score: comment.score + 1 }
        : comment
    );
    setComments(updatedComments);
  };
  const handleDecrement = (commentId: number) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId && comment.score > 0
        ? { ...comment, score: comment.score - 1 }
        : comment
    );
    setComments(updatedComments);
  };
  return (
    <div className="max-w-md mx-auto">
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          id={`comment-${comment.id}`}
          className={`bg-white shadow-lg rounded-lg overflow-hidden mb-4 ${
            index < 2 ? "mx-auto" : "ml-12"
          }`}
        >
          <div className="px-6 py-4">
            <div className="flex items-center mb-2">
              <img
                src={comment.user.image.webp}
                alt={comment.user.username}
                className="h-10 w-10 rounded-full mr-2"
              />
              <p className="text-gray-800 font-semibold">
                {comment.user.username}
              </p>
              <p className="text-gray-600 ml-auto">{comment.createdAt}</p>
            </div>
            <p className="text-gray-800 text-base">{comment.content}</p>
            <div className="flex mt-2 items-center justify-between">
              <div className="flex items-center">
                <button
                  className="text-sm rounded-full border border-red-600 py-2 px-4 focus:outline-none hover:bg-red-600 hover:border-red-700"
                  onClick={() => handleDecrement(comment.id)}
                >
                  -
                </button>
                <span className="mx-2 text-gray-600">{comment.score}</span>
                <button
                  className="text-sm rounded-full border border-green-600 py-2 px-4 focus:outline-none hover:bg-green-600 hover:border-green-700"
                  onClick={() => handleIncrement(comment.id)}
                >
                  +
                </button>
              </div>
              <div className="flex items-center">
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
                  onClick={() => handleReply(comment.id)}
                >
                  Reply
                </button>
                <button
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            {replyingTo === comment.id && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Write a reply"
                  className="py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  className="ml-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={handleSendReply}
                >
                  Send
                </button>
              </div>
            )}
            {comment.replies.length > 0 && (
              <div className="mt-2">
                <p className="text-gray-600 text-sm font-medium">Replies:</p>
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex items-center mt-2">
                    <img
                      src={reply.user.image.webp}
                      alt={reply.user.username}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">
                        {reply.user.username}
                      </p>
                      <p className="text-gray-600">{reply.content}</p>
                      <button
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2"
                        onClick={() => handleDeleteReply(comment.id, reply.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
        <div className="px-6 py-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Add a comment"
              className="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button
              className="ml-2 py-2 px-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 text-center me-2 mb-2"
              onClick={handleSendComment}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentComponent;
