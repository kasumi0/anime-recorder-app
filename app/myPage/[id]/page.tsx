import { MyPagePerStatus } from "@/app/features/myPage/MyPagePerStatus";
import { StatusType } from "@/app/types/types";

type Props = {
  params: Promise<{ id: StatusType }>;
};

export default async function MyPagePerStatusPage({ params }: Props) {
  const {id} = await params;

  return <MyPagePerStatus status={id} />;
}
