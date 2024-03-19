import React, { useContext } from "react";
import { CustomAgentProviderContext } from "../contexts/LMFeedCustomAgentProviderContext";
import { LMCommentAction, LMLikeAction } from "../shared/actions";
import like from "../assets/images/like.svg";
import commnent from "../assets/images/comment.svg";
import { FeedPostContext } from "../contexts/LMFeedPostContext";
import { ROUTES } from "../shared/constants/lmRoutesConstant";
import { Link } from "react-router-dom";
import {
  COMMNENT,
  COMMNENTS,
  LIKE,
  LIKES,
} from "../shared/constants/lmAppConstant";
import LMCommentsScroller from "./lmReplies/LMFeedCommentsScroller";

const LMFeedPostFooter = () => {
  const { post } = useContext(FeedPostContext);
  const { likesCount, commentsCount, Id } = post!;
  const { LMPostFooterStyles, CustomComponents = null } = useContext(
    CustomAgentProviderContext,
  );

  return (
    <>
      <div className="lm-feed-wrapper__card__footer">
        <div className="lm-social-action-bar">
          <div className="lm-social-action-bar__actions">
            <div className="lm-d-flex lm-align-items-center lm-flex-gap lm-cursor-pointer">
              {LMPostFooterStyles?.likeButtonCustom ? (
                <LMPostFooterStyles.likeButtonCustom />
              ) : (
                <img
                  onClick={() => {
                    if (LMPostFooterStyles?.likeActionCallBack) {
                      LMPostFooterStyles.likeActionCallBack();
                    } else {
                      LMLikeAction();
                    }
                  }}
                  src={like}
                  className="lm-cursor-pointer"
                  alt="Like"
                />
              )}
              <span style={LMPostFooterStyles?.likesCountStyles}>
                {" "}
                {`${likesCount ? likesCount.toString().concat(" ") : ""}${likesCount > 1 ? LIKES : LIKE}`}
              </span>
            </div>
            <div className="lm-d-flex lm-align-items-center lm-flex-gap lm-cursor-pointer">
              <Link
                to={ROUTES.POST.concat("/").concat(Id.toString())}
                className="lm-d-flex lm-align-items-center lm-flex-gap lm-cursor-pointer"
              >
                {LMPostFooterStyles?.commentButtonCustom ? (
                  <LMPostFooterStyles.commentButtonCustom />
                ) : (
                  <img
                    onClick={() => {
                      if (LMPostFooterStyles?.commentActionCallBack) {
                        LMPostFooterStyles?.commentActionCallBack();
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
                >
                  {`${commentsCount ? commentsCount.toString().concat(" ") : ""}${commentsCount > 1 ? COMMNENTS : COMMNENT}`}
                </span>
              </Link>
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
