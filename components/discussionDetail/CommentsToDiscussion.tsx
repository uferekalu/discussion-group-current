import Image from "next/image";
import React, { useState, useEffect } from "react";
import CommentComp from "./CommentComp";
import { CommentsFromADiscussion } from "@/utils/interface";
import { calculateDuration } from "@/utils/utility";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { likeAComment } from "@/slices/likeACommentSlice";
import { discussionComments } from "@/slices/commentsFromDiscussion";
import { dislikeAComment } from "@/slices/dislikeACommentSlice";
import { RootState } from "@/store";

interface ICommentToDisc {
  data: CommentsFromADiscussion;
  groupId: number | null
}

const CommentsToDiscussion: React.FC<ICommentToDisc> = ({ data, groupId }) => {
  const [isReplyToComment, setIsReplyToComment] = useState<boolean>(false);
  const [commentMsg, setCommentMsg] = useState<string>("")
  const dispatch = useAppDispatch()
  const commentLike = useAppSelector((state: RootState) => state.likeAComment)
  const commentDislike = useAppSelector((state: RootState) => state.dislikeAComment)

  useEffect(() => {
    if (commentLike.likeACommentError) {
      setCommentMsg(commentLike.likeACommentError)
    }
    if (commentDislike.dislikeACommentError) {
      setCommentMsg(commentDislike.dislikeACommentError)
    }
  }, [])

  const handleIsReplyToComment = () => {
    setIsReplyToComment((prevState) => !prevState);
  };

  const closeComment = () => {
    setIsReplyToComment(false);
  };
  return (
    <>
      {data.data.discussion.Comments.map((comment) => {
        const commentTime = calculateDuration(comment.createdAt);
        const baseUrl = "http://localhost:5000";
        const replyLikes = comment.Replies.filter((reply) => reply.likes === 1);
        const replyDislikes = comment.Replies.filter(
          (reply) => reply.dislikes === 1
        );

        const handleReplyThumbsUp = async () => {
          const discussionDt = {
            groupId,
            discussionId: data.data.discussion.id,
          };
          const discussionData = {
            data: {
              comment_id: comment.id,
            },
          };
          await dispatch(likeAComment(discussionData))
          await dispatch(discussionComments(discussionDt));
        }

        const handleReplyThumbsDown = async () => {
          const discussionDt = {
            groupId,
            discussionId: data.data.discussion.id,
          };
          const discussionData = {
            data: {
              comment_id: comment.id,
            },
          };
          await dispatch(dislikeAComment(discussionData))
          await dispatch(discussionComments(discussionDt));
        }

        const sanitizedImage =
          comment &&
          comment.User.profile_picture !== null &&
          comment.User.profile_picture.replace(/\\/g, "/");

        const profilePictureUrl =
          comment.User.profile_picture === null
            ? "/images/profile_avatar.jpg"
            : `${baseUrl}/${sanitizedImage}`;
        return (
          <div key={comment.id}>
            <div className="flex mt-2 gap-2">
              <div className="flex justify-center items-center">
                <Image
                  className="rounded-full -mt-9"
                  src={profilePictureUrl}
                  height={35}
                  width={35}
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <div className="flex flex-col space-y-1">
                  <div className="flex space-x-1">
                    <span className="flex text-xs text-white">
                      {comment.User.name}
                    </span>
                    <span className="flex text-yellow-500 font-bold italic text-xs">
                      {comment.User.username}
                    </span>
                    <span className="flex text-xs text-white">
                      - {commentTime}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <span className="flex text-xs text-white">Replying to</span>
                    <span className="flex text-xs text-teal-700 bg-white p-1 rounded-lg">
                      {data.data.creator.username}
                    </span>
                  </div>
                </div>
                {comment.content && (
                  <div className="flex flex-col border rounded-lg shadow-lg p-1 mt-2">
                    <div className="flex text-white text-xs mt-2">
                      {comment.content}
                    </div>
                  </div>
                )}
                {commentMsg && (
                  <div className="flex text-center text-xs text-red-500 italic bg-white p-2 rounded-lg mt-2">{commentMsg}</div>
                )}
                <div className="flex sm:justify-start sm:space-x-7 justify-between mt-2">
                  <div className="flex space-x-1 mt-1">
                    <i
                      onClick={handleIsReplyToComment}
                      className="bi bi-chat-dots text-white cursor-pointer"
                    ></i>
                    <span className="text-white text-xs italic">
                      {comment.Replies.map((reply) => reply.content) &&
                        comment.Replies.map((reply) => reply.content).length}
                    </span>
                  </div>
                  <div className="flex space-x-1 mt-1">
                    <i onClick={handleReplyThumbsUp} className="bi bi-hand-thumbs-up text-white cursor-pointer"></i>
                    <span className="text-white text-xs italic">
                      {replyLikes.length}
                    </span>
                  </div>
                  <div className="flex space-x-1 mt-1">
                    <i onClick={handleReplyThumbsDown} className="bi bi-hand-thumbs-down text-white cursor-pointer"></i>
                    <span className="text-white text-xs italic">
                      {replyDislikes.length}
                    </span>
                  </div>
                  <div className="flex space-x-1 mt-1">
                    <i className="bi bi-share text-white cursor-pointer"></i>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-1" />
            <div className={isReplyToComment ? "flex" : "hidden"}>
              <CommentComp
                closeComment={closeComment}
                isComment={false}
                isReplyToComment={isReplyToComment}
                discussion_id={comment.id}
                groupId={groupId}
              // comment_id={comm}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
export default CommentsToDiscussion;
