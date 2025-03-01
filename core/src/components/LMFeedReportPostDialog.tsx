import React, { useContext, useEffect, useState } from "react";
import LMFeedGlobalClientProviderContext from "../contexts/LMFeedGlobalClientProviderContext";
import {
  GetReportTagsRequest,
  PostReportRequest,
} from "@likeminds.community/feed-js";
import { GetReportTagsResponse } from "../shared/types/api-responses/getReportTagsResponse";
import { ReportObject } from "../shared/types/models/reportTags";
import closeIcon from "../assets/images/cancel-model-icon.svg";
import LMFeedUserProviderContext from "../contexts/LMFeedUserProviderContext";
import { LMFeedEntityType } from "../shared/constants/lmEntityType";
import { Reply } from "../shared/types/models/replies";
import { Post } from "../shared/types/models/post";
import { changePostCase } from "../shared/utils";
import { WordAction } from "../shared/enums/wordAction";

interface LMFeedReportPostDialogProps {
  closeReportDialog: () => void;
  entityId: string;
  entityType: number;
  post?: Post;
  comment?: Reply;
  reply?: Reply;
}
// eslint-disable-next-line no-empty-pattern
const LMFeedReportPostDialog = ({
  closeReportDialog,
  entityId,
  entityType,
  post,
  comment,
  reply,
}: LMFeedReportPostDialogProps) => {
  const { lmFeedclient, lmfeedAnalyticsClient } = useContext(
    LMFeedGlobalClientProviderContext,
  );
  const { currentUser } = useContext(LMFeedUserProviderContext);
  const [reportTags, setReportTags] = useState<ReportObject[]>([]);
  const [selectedTag, setSelectedTag] = useState<ReportObject | null>(null);
  const [otherReason, setOtherReasons] = useState<string>("");
  async function report() {
    try {
      await lmFeedclient?.postReport(
        PostReportRequest.builder()
          .setUuid(currentUser?.sdkClientInfo.uuid || "")
          .setTagId(selectedTag?.id || 0)
          .setReason(
            selectedTag?.id === 11 ? otherReason : selectedTag?.name || "",
          )
          .setEntityId(entityId)
          .setEntityType(entityType)
          .build(),
      );
      if (entityType === LMFeedEntityType.REPLY) {
        lmfeedAnalyticsClient?.sendReplyReportedEvent(
          post!,
          comment!,
          reply!,
          selectedTag?.name || "",
        );
      } else if (entityType === LMFeedEntityType.COMMENT) {
        lmfeedAnalyticsClient?.sendCommentReportedEvent(
          post!,
          comment!,
          selectedTag?.name || "",
        );
      } else {
        lmfeedAnalyticsClient?.sendPostReportedEvent(
          post!,
          selectedTag?.name || "",
        );
      }
      closeReportDialog();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function getReportTags() {
      try {
        const call: GetReportTagsResponse = (await lmFeedclient?.getReportTags(
          GetReportTagsRequest.builder().setType(0).build(),
        )) as never;
        if (call.success) {
          setReportTags(call.data.reportTags);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getReportTags();
  }, [lmFeedclient]);
  return (
    <div className="lmReportPostWrapper">
      <div className="lmReportPostWrapper__header">
        Report {changePostCase(WordAction.FIRST_LETTER_CAPITAL_SINGULAR)}
      </div>
      <img
        src={closeIcon}
        className="lmReportPostWrapper__header__closeIcon"
        alt="close-icon"
        onClick={closeReportDialog}
      />
      <div className="lmReportPostWrapper__body">
        <div className="lmReportPostWrapper__body__content">
          <div className="lmReportPostWrapper__body__content--texted">
            <span>Please specify the problem to continue </span> <br />
            You would be able to report this{" "}
            {changePostCase(WordAction.FIRST_LETTER_CAPITAL_SINGULAR)} after
            selecting a problem.
          </div>
          <div className="lmReportPostWrapper__body__content__types">
            {reportTags.map((tag) => {
              return (
                <span
                  lm-feed-component-id={`lm-feed-report-tag-vwxyz`}
                  className={`${selectedTag?.id === tag.id ? "active" : ""}`}
                  key={tag.id}
                  onClick={() => {
                    setSelectedTag(tag);
                  }}
                >
                  {tag.name}
                </span>
              );
            })}
          </div>

          <div className="lmReportPostWrapper__body__content__actions">
            {selectedTag?.id === 11 ? (
              <input
                value={otherReason}
                onChange={(e) => {
                  setOtherReasons(e.target.value);
                }}
                placeholder="Enter the reason here..."
                type="text"
                lm-feed-component-id={`lm-feed-report-input-fghij`}
                className="lmReportPostWrapper__body__content__actions--input"
              />
            ) : null}
            <button
              onClick={report}
              disabled={!selectedTag}
              className="lmReportPostWrapper__body__content__actions--btnReport"
              lm-feed-component-id={`lm-feed-report-submit-klmno`}
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMFeedReportPostDialog;
