import React from "react";
import { Post } from "../types/models/post";
import { User } from "../types/models/member";
import { formatTimeAgo, getAvatar } from "../shared/utils";
import { parseAndReplaceTags } from "../shared/taggingParser";
import Attachment from "../shared/components/Attachments";
import LMCommentsScroller from "./LM-Replies/LMCommentsScroller";

interface PostsProps {
  post: Post;
  user: User | undefined;
}

const Posts: React.FC<PostsProps> = (props) => {
  const { text, createdAt, isEdited, attachments } = props.post;
  const { name, imageUrl, customTitle } = props.user || {};

  // Determine the avatar content based on imageUrl and name
  const avatarContent = getAvatar({ imageUrl, name });

  // Render attachments
  const renderAttachments = () => {
    if (!attachments || attachments.length === 0) {
      return null;
    }

    return (
      <div className="attachments">
        <Attachment attachments={attachments} />
        {/* {attachments.map((attachment, index) => (
          <Attachment key={index} attachment={attachment} />
        ))} */}
      </div>
    );
  };

  return (
    <div className="lm-feed-wrapper__card lm-mb-2">
      <div className="lm-feed-wrapper__card__header">
        <div className="lm-flex-container">
          <div className="lm-avatar lm-mr-5">{avatarContent}</div>
          <div>
            <div className="lm-feed-wrapper__card__header--title">
              {name} {customTitle ? <span>{customTitle}</span> : null}
            </div>
            <div className="lm-feed-wrapper__card__header--text">
              Post
              <span>{formatTimeAgo(createdAt)}</span>
              {isEdited ? (
                <span className="lm-primary-text">Edited</span>
              ) : null}
            </div>
          </div>
        </div>
        <div>{/* right panel */}</div>
      </div>
      <div className="lm-feed-wrapper__card__body">
        <div className="lm-feed-wrapper__card__body__content">
          {parseAndReplaceTags(text)}
        </div>
        <div className="lm-feed-wrapper__card__body__attachment">
          {renderAttachments()}
        </div>
      </div>
      <div className="lm-feed-wrapper__card__footer">
        <LMCommentsScroller />
      </div>
    </div>
  );
};

export default Posts;
