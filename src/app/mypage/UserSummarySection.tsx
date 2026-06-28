import { getUserInfo } from "@/src/lib/data/user";
import UserSummary from "../../components/UserSummary";

export default async function UserSummarySection() {
  const user = await getUserInfo();

  return <UserSummary availableCredit={user?.availableCredit} />;
}
