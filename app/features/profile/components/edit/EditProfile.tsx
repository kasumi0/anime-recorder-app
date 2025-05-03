"use client";

import { useActionState, useEffect, useState } from "react";
import { updateUser } from "@/app/lib/actions/updateUser";
import { useUserStore } from "@/app/store/userStore";
import Image from "next/image";
import toast from "react-hot-toast";
import { ImageEditModal } from "@/app/components/imageEditModal/ImageEditModal";
import { ProfileResult } from "@/app/types/types";
import { DeleteUserButton } from "../deleteUser/DeleteUserButton";
import { FaCircleUser } from "react-icons/fa6";
import style from "../../profile.module.css";
const { iconArea } = style;

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
  const setGlobalIcon = useUserStore((state) => state.setIcon);
  const setGlobalName = useUserStore((state) => state.setName);
  const customName = useUserStore((state) => state.name);

  const handleImageUpdate = (newUrl: string) => {
    setCustomIcon(newUrl);
  };

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
          <h3>eメール</h3>
          {email}
        </label>

        <label>
          <h3>アイコン</h3>
          <div className={iconArea}>
            {customIcon ? (
              <Image
                src={customIcon}
                alt="ユーザー画像"
                height={100}
                width={100}
              />
            ) : (
              <FaCircleUser />
            )}
            <ImageEditModal
              onImageUpdate={handleImageUpdate}
              editImage="アイコン"
            />
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

        <button>変更を保存</button>
      </form>
      <DeleteUserButton />
    </>
  );
};
