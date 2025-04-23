// app/features/profile/Profile.tsx
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { prisma } from "@/app/lib/prisma";
import EditName from "./components/edit/EditName";

const Profile = async () => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;

  if (!userId) return <div>ユーザーがログインしていません。</div>;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return <div>ユーザー情報が見つかりません。</div>;

  return (
    <section>
      <h2>プロフィール</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>ID</strong></td>
            <td>{user.id}</td>
          </tr>
          <tr>
            <td><strong>名前</strong></td>
            <td>
              <EditName currentName={user.name || ""} userId={user.id} />
            </td>
          </tr>
          <tr>
            <td><strong>メール</strong></td>
            <td>{user.email || "情報なし"}</td>
          </tr>
          <tr>
            <td><strong>画像</strong></td>
            <td>
              <img
                src={user.image ?? "/no-img.png"}
                alt="ユーザー画像"
                height={50}
                width={50}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Profile;
