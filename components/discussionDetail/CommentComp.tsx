import React, { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";
import { useAppDispatch } from "@/store/hook";
import { makeCommentDiscussion } from "@/slices/makeACommentSlice";
import { discussionComments } from "@/slices/commentsFromDiscussion";
import { replyAComment } from "@/slices/replyACommentSlice";

interface CommentComp {
  closeComment: () => void;
  isComment: boolean;
  isReplyToComment: boolean;
  discussion_id: number | null;
  groupId: number | null;
}

const CommentComp: React.FC<CommentComp> = ({
  closeComment,
  isComment,
  isReplyToComment,
  discussion_id,
  groupId,
}) => {
  const dispatch = useAppDispatch();
  const { setHoverButton, hoverButton, buttonVariants } = Reusables();
  const [content, setContent] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const discussionData = {
      groupId,
      discussionId: discussion_id,
    };
    const data = {
      data: {
        content,
        discussion_id,
      },
    };
    await dispatch(makeCommentDiscussion(data));
    await dispatch(discussionComments(discussionData));
    setContent("");
  };

  const handleSubmitReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const discussionData = {
      groupId,
      discussionId: discussion_id,
    };
    const data = {
      data: {
        content,
        comment_id: discussion_id,
      },
    };
    await dispatch(replyAComment(data));
    await dispatch(discussionComments(discussionData));
    setContent("");
  };
  return (
    <form
      onSubmit={isComment ? handleSubmitComment : isReplyToComment ? handleSubmitReply : undefined}
      className="flex flex-col w-full rounded-lg mt-2 p-2"
    >
      <textarea
        className="rounded-lg p-2 text-xs text-black"
        rows={5}
        name="content"
        value={content}
        onChange={handleChange}
      ></textarea>
      <div className="flex space-x-3">
        <motion.button
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          // onClick={
          //   isComment
          //     ? () => {
          //         handleSubmitComment();
          //       }
          //     : undefined
          // }
          onMouseEnter={() => setHoverButton("Comment")}
          onMouseLeave={() => setHoverButton(null)}
          className={`bg-blue-500 p-2 sm:w-1/4 w-1/2 mt-2 rounded-lg shadow-lg text-white text-xs ${hoverButton === "Comment" ? "hover:bg-pink-500" : ""
            }`}
        >
          {"Comment"}
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={(e) => {
            e.preventDefault();
            closeComment();
          }}
          onMouseEnter={() => setHoverButton("Cancel")}
          onMouseLeave={() => setHoverButton(null)}
          className={`bg-teal-500 p-2 sm:w-1/4 w-1/2 mt-2 rounded-lg shadow-lg text-white text-xs ${hoverButton === "Cancel" ? "hover:bg-pink-500" : ""
            }`}
        >
          {"Cancel"}
        </motion.button>
      </div>
    </form>
  );
};

export default CommentComp;
