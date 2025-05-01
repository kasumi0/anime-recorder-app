"use client";

import { useActionState, useEffect, useState } from "react";
import { useUserStore } from "@/app/store/userStore";
import { DeleteUserButton } from "../deleteUser/DeleteUserButton";
import { FaCircleUser } from "react-icons/fa6";
import { ImageEditModal } from "@/app/components/imageEditModal/ImageEditModal";
import toast from "react-hot-toast";
import { updateUser } from "@/app/lib/actions/updateUser";
import { ProfileResult } from "@/app/types/types";
import style from "../../profile.module.css";

const { iconArea, buttonArea } = style;

type Props = {
  id: string;
  name: string | null;
  image: string | null;
  email: string | null;
};

export const EditProfile = ({ id, name, image, email }: Props) => {
  const [formState, formAction] = useActionState<
    ProfileResult | null,
    FormData
  >(updateUser, null);

  const [customIcon, setCustomIcon] = useState(image);
  const handleImageUpdate = (newUrl: string) => {
    setCustomIcon(newUrl);
  };

  const setGlobalIcon = useUserStore((state) => state.setIcon);
  const setGlobalName = useUserStore((state) => state.setName);
  const customName = useUserStore((state) => state.name);

  useEffect(() => {
    if (formState?.success) {
      toast.success(formState.message);
      const { newName, newIcon } = formState.newData;
      setGlobalName(newName);
      setGlobalIcon(newIcon);
    } else if (formState?.success === false) {
      toast.error(formState.message);
    }
  }, [formState, setGlobalName, setGlobalIcon]);

  return (
    <>
      <form action={formAction}>
        <label>
          <h3>メール</h3>
          {email}
        </label>
        <label>
          <h3>アイコン</h3>
          <div className={iconArea}>
            {customIcon ? (
              <img
                src={customIcon}
                alt="ユーザー画像"
                height={100}
                width={100}
              />
            ) : (
              <FaCircleUser />
            )}
            <ImageEditModal onImageUpdate={handleImageUpdate} />
          </div>
        </label>
        <label>
          <h3>名前</h3>
          <input
            type="text"
            defaultValue={customName || (name ?? "guest")}
            name="userName"
          />
        </label>

        <input type="hidden" name="userId" value={id} />
        {customIcon && (
          <input type="hidden" name="imageUrl" value={customIcon} />
        )}
        <div className={buttonArea}>
          <button>変更を保存</button>
        </div>
      </form>
      <DeleteUserButton />
    </>
  );
};
