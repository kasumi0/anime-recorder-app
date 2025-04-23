import { MyPagePerStatus } from "@/app/features/myPage/MyPagePerStatus";
import { StatusType } from "@/app/types/types";

type Props = {
  params: { id: StatusType };
};

export default async function MyPagePerStatusPage({ params }: Props) {
  const status = params.id;

  return <MyPagePerStatus status={status} />;
}
