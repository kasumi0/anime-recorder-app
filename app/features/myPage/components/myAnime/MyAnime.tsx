"use client";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getSeason } from "@/app/hooks/getSeason";
import { Thumbnail } from "@/app/components/Thumbnail";
import { MyAnimeType, StatusType } from "@/app/types/types";
import styles from "./myAnime.module.css";
import { useState, useTransition } from "react";
import { deleteAnime } from "@/app/lib/actions/deleteAnime";
import toast from "react-hot-toast";
import { EditModal } from "../editModal/EditModal";
import { ModalPortal } from "../ModalPortal";
import { Rating } from "react-simple-star-rating";
import { getStatus } from "@/app/hooks/getStatus";
const { body, row, commentBox, noReview, buttons, toolTip } = styles;

export const MyAnime = ({
  id,
  title,
  userId,
  imageUrl,
  seasonYear,
  seasonName,
  registerId,
  status,
  rating,
  comment,
}: MyAnimeType) => {
  const [isPending, startTransition] = useTransition();
  const [isRegistered, setIsRegistered] = useState(true);
  const handleDelete = () => {
    startTransition(async () => {
      const promise = deleteAnime(registerId);
      toast.promise(promise, {
        loading: "削除中...",
        success: "My Pageから削除しました",
        error: "削除に失敗しました",
      });
      const result = await promise;
      if (result) {
        setIsRegistered(false);
      }
    });
  };

  const [reviewState, setReviewState] = useState({ status, rating, comment });
  const handleUpdate = (
    newStatus: StatusType,
    newRating: number,
    newComment: string
  ) => {
    setReviewState({
      status: newStatus,
      rating: newRating,
      comment: newComment,
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  if (isRegistered) {
    return (
      <li key={id} className={body}>
        <Thumbnail imageUrl={imageUrl} title={title} />
        <h3>{title}</h3>
        <div className={row}>
          <div>
            {seasonYear && <span>{`${seasonYear}年`}</span>}
            {seasonName && <span>{getSeason(seasonName)}</span>}
          </div>
          {reviewState.status && <span>{getStatus(reviewState.status)}</span>}
        </div>

        <h4>レビュー</h4>
        {reviewState.comment ? (
          <p className={commentBox}>{reviewState.comment}</p>
        ) : (
          <p className={noReview}>レビューはまだ書かれていません。</p>
        )}
        <Rating
          initialValue={reviewState.rating}
          size={25}
          readonly
          allowHover={false}
        />
        <div className={buttons}>
          <button type="button" onClick={toggleModal}>
            <FaRegEdit />
            <span className={toolTip}>登録情報を編集</span>
          </button>
          <button type="button" onClick={handleDelete} disabled={isPending}>
            <RiDeleteBin6Line />
            <span className={toolTip}>My Pageから削除</span>
          </button>
        </div>

        <ModalPortal>
          <EditModal
            isOpen={isOpen}
            toggleModal={toggleModal}
            id={id}
            userId={userId}
            title={title}
            imageUrl={imageUrl}
            status={reviewState.status}
            rating={reviewState.rating}
            comment={reviewState.comment}
            onUpdate={handleUpdate}
          />
        </ModalPortal>
      </li>
    );
  }
};
