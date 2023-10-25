import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Reusables } from "@/utils/Reusables";
import CommentComp from "./CommentComp";
import { CommentsFromADiscussion } from "@/utils/interface";
import { calculateDuration, formatDate } from "@/utils/utility";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { likeADiscussion } from "@/slices/likeADiscussionSlice";
import { discussionComments } from "@/slices/commentsFromDiscussion";
import { dislikeADiscussion } from "@/slices/dislikeADiscussionSlice";
import { RootState } from "@/store";

interface IDiscussionDet {
  data: CommentsFromADiscussion;
  groupId: number | null
}

const DiscussionDetailComp: React.FC<IDiscussionDet> = ({ data, groupId }) => {
  const [isComment, setIsComment] = useState<boolean>(false);
  const [discussionMsg, setDiscussionMsg] = useState<string>("")
  const dispatch = useAppDispatch()
  const likeADisc = useAppSelector((state: RootState) => state.likeADiscussion)
  const dislikeADisc = useAppSelector((state: RootState) => state.dislikeADiscussion)

  const duration: string = calculateDuration(
    data && data.data.discussion.createdAt
  );

  const formattedDiscussionDate: string = formatDate(
    data && data.data.discussion.createdAt
  );

  const totalLikes = () => {
    let total = 0;
    data.data.discussion.Comments.map((comment) => (total += comment.likes));
    return total;
  };

  const totalDislikes = () => {
    let total = 0;
    data.data.discussion.Comments.map((comment) => (total += comment.dislikes));
    return total;
  };

  const baseUrl = "http://localhost:5000";

  const sanitizedImage =
    data &&
    data.data.creator.profile_picture !== null &&
    data.data.creator.profile_picture.replace(/\\/g, "/");

  const profilePictureUrl =
    data.data.creator.profile_picture === null
      ? "/images/profile_avatar.jpg"
      : `${baseUrl}/${sanitizedImage}`;

  useEffect(() => {
    if (likeADisc.likeADiscussionError) {
      setDiscussionMsg(likeADisc.likeADiscussionError)
    }
    if (dislikeADisc.dislikeADiscussionError) {
      setDiscussionMsg(dislikeADisc.dislikeADiscussionError)
    }
  }, [])

  const handleIsComment = () => {
    setIsComment((prevState) => !prevState);
  };

  const closeComment = () => {
    setIsComment(false);
  };

  const handleThumbsUp = async () => {
    const discussionDt = {
      groupId,
      discussionId: data.data.discussion.id,
    };
    const discussionData = {
      data: {
        discussion_id: data.data.discussion.id,
      },
    };
    await dispatch(likeADiscussion(discussionData))
    await dispatch(discussionComments(discussionDt));
  }

  const handleThumbsDown = async () => {
    const discussionDt = {
      groupId,
      discussionId: data.data.discussion.id,
    };
    const discussionData = {
      data: {
        discussion_id: data.data.discussion.id,
      },
    };
    await dispatch(dislikeADiscussion(discussionData))
    await dispatch(discussionComments(discussionDt));
  }

  return (
    <>
      <div className="flex justify-between gap-3">
        <div className="flex justify-center items-center">
          <Image
            className="rounded-full"
            src={profilePictureUrl}
            height={35}
            width={35}
            alt="avatar"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="flex text-white text-xs">
            {data.data.creator.name}
          </span>
          <span className="flex text-yellow-500 font-bold italic text-xs">
            {data.data.creator.username}
          </span>
          <span className="flex text-orange-200 italic text-xs">
            {duration}
          </span>
        </div>
        <div className="flex justify-center items-center">
          <span className="text-xs text-center text-teal-900 rounded-lg p-2 bg-white cursor-pointer">
            Talk to lushak privately
          </span>
        </div>
      </div>
      <div className="flex flex-col border rounded-lg shadow-lg p-1 mt-2">
        <span className="flex text-white text-xs">
          {data.data.discussion.title}
        </span>
        <div className="flex text-white text-xs mt-2">
          {data.data.discussion.content}
        </div>
      </div>
      <span className="text-xs text-white italic mt-1">
        {formattedDiscussionDate}
      </span>
      <hr className="mt-1" />
      <div className="flex space-x-4">
        <div className="flex space-x-1 mt-1">
          <span className="text-white text-xs italic">
            {data.data.discussion.Comments.length}
          </span>
          <span className="text-white text-xs italic">Comments</span>
        </div>
        <div className="flex space-x-1 mt-1">
          <span className="text-white text-xs italic">{totalLikes()}</span>
          <span className="text-white text-xs italic">Likes</span>
        </div>
        <div className="flex space-x-1 mt-1">
          <span className="text-white text-xs italic">{totalDislikes()}</span>
          <span className="text-white text-xs italic">Dislikes</span>
        </div>
      </div>
      <hr className="mt-1" />

      {discussionMsg && (
        <div className="flex text-center text-xs text-red-500 italic bg-white p-2 rounded-lg mt-2">{discussionMsg}</div>
      )}

      <div className="flex sm:justify-start sm:space-x-7 justify-between mt-2">
        <i
          onClick={handleIsComment}
          className="bi bi-chat-dots text-white cursor-pointer"
        ></i>
        <i onClick={handleThumbsUp} className="bi bi-hand-thumbs-up text-white cursor-pointer"></i>
        <i onClick={handleThumbsDown} className="bi bi-hand-thumbs-down text-white cursor-pointer"></i>
        <i className="bi bi-share text-white cursor-pointer"></i>
      </div>
      <hr className="mt-1" />
      <div className={isComment ? "flex" : "hidden"}>
        <CommentComp
          closeComment={closeComment}
          isComment={isComment}
          isReplyToComment={false}
          discussion_id={data.data.discussion.id}
          groupId={groupId}
        />
      </div>
    </>
  );
};

export default DiscussionDetailComp;
