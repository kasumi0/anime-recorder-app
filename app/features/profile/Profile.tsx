// app/features/profile/Profile.tsx
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";
import { prisma } from "@/app/lib/prisma";
import { EditProfile } from "./components/edit/EditProfile";
import style from "./profile.module.css";

const { editCard } = style;

const Profile = async () => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return;

  return (
    <div className={editCard}>
      <h2>Edit Profile</h2>
      <EditProfile {...user} />
    </div>
  );
};

export default Profile;
