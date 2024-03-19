import React, { useContext } from "react";
import { CustomAgentProviderContext } from "../contexts/LMFeedCustomAgentProviderContext";
import { LMCommentAction, LMLikeAction } from "../shared/actions";
import like from "../assets/images/like.svg";
import commnent from "../assets/images/comment.svg";
import { FeedPostContext } from "../contexts/LMFeedPostContext";
import {
  COMMNENT,
  COMMNENTS,
  LIKE,
  LIKES,
} from "../shared/constants/lmAppConstant";
import LMCommentsScroller from "./lmReplies/LMFeedCommentsScroller";
import { useNavigate } from "react-router-dom";

const LMFeedPostFooter = () => {
  const { post } = useContext(FeedPostContext);
  const { likesCount, commentsCount, Id } = post!;
  const {
    LMPostFooterStyles,
    CustomComponents = null,
    CustomCallbacks = {},
  } = useContext(CustomAgentProviderContext);
  const {
    likeActionCallback,
    likeTextCountClickCallback,
    commentIconClickCallback,
    commentTextCountClickCallback,
    postFooterClickCallback,
  } = CustomCallbacks;
  const navigation = useNavigate();
  return (
    <>
      <div
        className="lm-feed-wrapper__card__footer"
        onClick={postFooterClickCallback}
      >
        <div className="lm-social-action-bar">
          <div className="lm-social-action-bar__actions">
            <div className="lm-d-flex lm-align-items-center lm-flex-gap lm-cursor-pointer">
              {LMPostFooterStyles?.likeButtonCustom ? (
                <LMPostFooterStyles.likeButtonCustom />
              ) : (
                <img
                  onClick={() => {
                    if (likeActionCallback) {
                      likeActionCallback();
                    } else {
                      LMLikeAction();
                    }
                  }}
                  src={like}
                  className="lm-cursor-pointer"
                  alt="Like"
                />
              )}
              <span
                style={LMPostFooterStyles?.likesCountStyles}
                onClick={likeTextCountClickCallback}
              >
                {" "}
                {`${likesCount ? likesCount.toString().concat(" ") : ""}${likesCount > 1 ? LIKES : LIKE}`}
              </span>
            </div>
            <div
              className="lm-d-flex lm-align-items-center lm-flex-gap lm-cursor-pointer"
              onClick={() => {
                navigation(
                  `/community/post/${`${Id}-${post?.heading}`.substring(0, 59)}`,
                );
              }}
            >
              {LMPostFooterStyles?.commentButtonCustom ? (
                <LMPostFooterStyles.commentButtonCustom />
              ) : (
                <img
                  onClick={() => {
                    if (commentIconClickCallback) {
                      commentIconClickCallback();
                    } else {
                      LMCommentAction();
                    }
                  }}
                  className="lm-cursor-pointer"
                  src={commnent}
                  alt="commnent"
                />
              )}
              <span
                style={LMPostFooterStyles?.commentsCountStyles}
                className="comments"
                onClick={commentTextCountClickCallback}
              >
                {`${commentsCount ? commentsCount.toString().concat(" ") : ""}${commentsCount > 1 ? COMMNENTS : COMMNENT}`}
              </span>
            </div>
          </div>
          <div className="lm-social-action-bar__actions">
            {/* <div className="lm-d-flex lm-align-items-center lm-cursor-pointer">
              <img src={bookmark} alt="bookmark" />
            </div>
            <div className="lm-d-flex lm-align-items-center lm-cursor-pointer">
              <img src={share} alt="share" />
            </div> */}
          </div>
        </div>
        {CustomComponents?.RepliesScroller || <LMCommentsScroller />}
      </div>
    </>
  );
};

export default LMFeedPostFooter;
