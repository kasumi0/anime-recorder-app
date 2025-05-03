import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { RiImageAddFill } from "react-icons/ri";
import styles from "./imageModal.module.css";
const { uploadButton, toolTip } = styles;

type ImageEditModalProps = {
  onImageUpdate: (newUrl: string) => void;
  editImage?: string;
};

export const ImageEditModal = ({
  onImageUpdate,
  editImage = "サムネ",
}: ImageEditModalProps) => {
  return (
    <div>
      <CldUploadWidget
        uploadPreset="your_preset"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess={async (result: any) => {
          const url = result?.info?.secure_url;
          if (!url) {
            toast.error("画像のアップロードに失敗しました");
            return;
          } else {
            toast.success("画像をアップロードしました");
            onImageUpdate(url);
          }
        }}
        options={{
          sources: ["local", "url"],
          multiple: false,
          maxFiles: 1,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "svg"],
        }}
      >
        {({ open }: { open?: () => void }) => (
          <button
            onClick={() => open?.()}
            type="button"
            className={uploadButton}
          >
            <RiImageAddFill />
            <span className={toolTip}>{editImage}を編集</span>
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};
