import { Thumbnail } from "@/app/components/Thumbnail";
import { FormResult, ReviewDataType, StatusType } from "@/app/types/types";
import { startTransition, useActionState, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { IoCloseCircle } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import styles from "./editModal.module.css";
import { updateAnime } from "@/app/lib/actions/updateAnime";
import toast from "react-hot-toast";
const { modal, open, selectBox,ratingArea, modalButtons } = styles;

type EditModalProps = ReviewDataType & {
  isOpen: boolean;
  toggleModal: () => void;
  userId: string;
  onUpdate: (status: StatusType, rating: number, comment: string) => void
};

export const EditModal = ({
  isOpen,
  toggleModal,
  userId,
  id,
  title,
  imageUrl,
  status,
  rating,
  comment,
  onUpdate
}: EditModalProps) => {
  const [ratingState, setRating] = useState(rating);
  const [formState, formAction] = useActionState<FormResult | null, FormData>(
    updateAnime,
    null
  );
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (formState?.success !== undefined && !hasShownToast) {
      setHasShownToast(true);
      startTransition(() => {
        if (formState.success) {
          toast.success(formState.message);

          const { status, rating, comment } = formState.newData;
          onUpdate(status, rating, comment);
        } else {
          toast.error(formState.message);
        }
        toggleModal();
      });
    }
  }, [formState, toggleModal, hasShownToast, onUpdate]);

  return (
    <div className={`${modal} ${isOpen ? open : ""}`}>
      <form action={formAction}>
        <Thumbnail imageUrl={imageUrl} title={title} />
        <div>
          <h3>{title}</h3>
          <div className={selectBox}>
            <select name="status" defaultValue={status}>
              <option value="WANT_TO_WATCH">観たい！</option>
              <option value="WATCHING">今観てる</option>
              <option value="COMPLETED">観た！</option>
              <option value="ON_HOLD">保留中</option>
              <option value="DROPPED">途中でやめた</option>
            </select>
          </div>
          <div className={ratingArea}>
            <StarRatings
              rating={ratingState}
              starRatedColor="gold"
              starHoverColor="orange"
              numberOfStars={5}
              changeRating={(newRating) => setRating(newRating)}
              starDimension="25px"
              starSpacing="2px"
            />
            {ratingState !== 0 && <span>星{ratingState}つ</span>}
          </div>
        </div>
        <label>
          レビュー
          <textarea name="review" defaultValue={comment} rows={7}></textarea>
        </label>

        <input type="hidden" name="rating" value={ratingState} />
        <input type="hidden" name="animeId" value={id} />
        <input type="hidden" name="userId" value={userId} />

        <div className={modalButtons}>
          <button type="button" onClick={toggleModal}>
            <IoCloseCircle />
            閉じる
          </button>
          <button>
            <FaCircleCheck />
            更新
          </button>
        </div>
      </form>
    </div>
  );
};
