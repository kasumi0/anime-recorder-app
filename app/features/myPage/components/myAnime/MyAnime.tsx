"use client";

import { useCallback, useState, useTransition } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getSeason } from "@/app/hooks/getSeason";
import { getStatus } from "@/app/hooks/getStatus";
import { Thumbnail } from "@/app/components/Thumbnail";
import { MyAnimeType, StatusType } from "@/app/types/types";
import { deleteAnime } from "@/app/lib/actions/deleteAnime";
import { EditModal } from "../editModal/EditModal";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import styles from "./myAnime.module.css";
import { Portal } from "@/app/components/Portal";
const { body, row, commentBox, noReview, buttons, toolTip } = styles;

export type UpdateFields = {
    status?: StatusType;
    rating?: number;
    comment?: string;
    imageUrl?: string | null;
  };

export const MyAnime = ({
  id,
  title,
  userId,
  customImage,
  defaultImage,
  seasonYear,
  seasonName,
  status,
  rating,
  comment,
}: MyAnimeType) => {
  const [isPending, startTransition] = useTransition();
  const [isRegistered, setIsRegistered] = useState(true);
  const imageUrl = customImage ?? defaultImage;

  const handleDelete = () => {
    startTransition(async () => {
      const promise = deleteAnime(userId, id);
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

  const [reviewState, setReviewState] = useState({
    status,
    rating,
    comment,
    imageUrl,
  });
  const handleUpdate = useCallback((fields: UpdateFields) => {
    setReviewState((prev) => ({ ...prev, ...fields }));
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStyle, setIsOpenStyle] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setIsOpenStyle(true), 10)
  }
  const closeModal = useCallback(() => {
     setIsOpenStyle(false);
     setTimeout(() => setIsOpen(false), 400);
   }, [])

  if (isRegistered) {
    return (
      <li key={id} className={body}>
        <Thumbnail imageUrl={reviewState.imageUrl} title={title} />
        <h3>{title}</h3>
        <div className={row}>
          <span>{getStatus(reviewState.status)}</span>
          <div>
            {seasonYear && <span>{`${seasonYear}年`}</span>}
            {seasonName && <span>{getSeason(seasonName)}</span>}
          </div>
        </div>
        <h4>レビュー</h4>
        {reviewState.comment ? (
          <p className={commentBox}>{reviewState.comment}</p>
        ) : (
          <p className={noReview}>レビューはまだ書かれていません。</p>
        )}
        <StarRatings
          rating={reviewState.rating}
          starRatedColor="gold"
          numberOfStars={5}
          starDimension="25px"
          starSpacing="2px"
        />
        <div className={buttons}>
          <button type="button" onClick={openModal}>
            <FaRegEdit />
            <span className={toolTip}>登録情報を編集</span>
          </button>
          <button type="button" onClick={handleDelete} disabled={isPending}>
            <RiDeleteBin6Line />
            <span className={toolTip}>My Pageから削除</span>
          </button>
        </div>
        {isOpen && (
          <Portal>
            <EditModal
              isOpenStyle={isOpenStyle}
              closeModal={closeModal}
              id={id}
              userId={userId}
              title={title}
              imageUrl={reviewState.imageUrl ?? imageUrl}
              status={reviewState.status}
              rating={reviewState.rating}
              comment={reviewState.comment}
              onUpdate={handleUpdate}
            />
          </Portal>
        )}
      </li>
    );
  }
};
