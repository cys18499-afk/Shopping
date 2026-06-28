import DeleteUserButton from "@/src/components/user/DeleteUserButton";
import UserInfoEditForm from "@/src/components/user/UserInfoEditForm";
import { getUserInfo } from "@/src/lib/data/user";
import { formatPhone } from "@/src/lib/utils";
import Link from "next/link";

export default async function UserInfoEditPage() {
  const userInfo = await getUserInfo();

  return (
    <div className="mx-auto text-[14px]">
      <div className="mb-12">
        <h4 className="text-lg font-bold mb-2">로그인 정보</h4>
        <hr className="border-black mb-6" />
        <UserInfoEditForm initialUserInfo={userInfo} />
      </div>

      <div className="mb-12">
        <h4 className="text-lg font-bold mb-2">회원 정보</h4>
        <hr className="border-black mb-6" />
        <div className="flex flex-col gap-6 px-4">
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-600">이름</span>
            <span className="text-gray-900 font-semibold">
              {userInfo?.userName || "이름이뭐에요"}
            </span>
          </div>
          <div className="flex items-start">
            <span className="w-32 font-medium text-gray-600 mt-1">연락처</span>
            <div className="flex flex-col gap-3">
              <span className="text-gray-400">
                {formatPhone(userInfo?.phoneNumber ?? "")}
              </span>
              <button className="px-6 py-2 bg-black text-white font-bold cursor-pointer">
                본인인증하고 정보 수정하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-40 flex flex-col gap-8 items-center justify-center">
        <Link
          href="/mypage"
          className="border px-5 py-2 text-[14px] cursor-pointer bg-black text-white border-gray-200 hover:text-gray-200"
        >
          확인
        </Link>
        <DeleteUserButton />
      </div>
    </div>
  );
}
