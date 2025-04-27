import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { RiImageAddFill } from "react-icons/ri";

import styles from "./imageModal.module.css";
const { uploadButton, toolTip } = styles;

type ImageEditModalProps = {
  onImageUpdate: (newUrl: string) => void;
};

export const ImageEditModal = ({ onImageUpdate }: ImageEditModalProps) => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div>
      <CldUploadWidget
        uploadPreset="your_preset"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess={async (result: any) => {
          const url = result?.info?.secure_url;
          setIsUploading(true);
          if (!url) {
            toast.error("画像のアップロードに失敗しました");
            return;
          } else {
            toast.success("画像をアップロードしました");
            onImageUpdate(url);
          }
          setIsUploading(false);
        }}
        options={{
          sources: ["local", "url"],
          multiple: false,
          maxFiles: 1,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
        }}
      >
        {({ open }: { open?: () => void }) => (
          <button
            onClick={() => open?.()}
            type="button"
            className={uploadButton}
          >
            <RiImageAddFill />
            <span className={toolTip}>サムネを編集</span>
          </button>
        )}
      </CldUploadWidget>
      {isUploading && <p>アップロード中...</p>}
    </div>
  );
};
