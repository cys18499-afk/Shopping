export default function Footer() {
  return (
    <footer className="Sticky left-0 bottom-0 ">
      <div className="bg-[#1a1a1a] text-gray-200 py-12 my-10 border-t border-gray-800">
        <div className="inner max-w-[1280px] mx-auto px-5">
          <div className="flex flex-wrap justify-between gap-10 mb-10">
            <div className="flex gap-12 text-[13px] font-medium">
              <a href="#" className="text-white hover:underline">
                브랜드 소개
              </a>
              <a href="#" className="text-white hover:underline">
                매장안내
              </a>
              <a href="#" className="text-white hover:underline font-bold">
                개인정보처리방침
              </a>
              <a href="#" className="text-white hover:underline">
                이용약관
              </a>
              <a href="#" className="text-white hover:underline">
                고객센터
              </a>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 border border-gray-600 rounded-full flex items-center justify-center text-[10px] text-gray-400">
                FB
              </div>
              <div className="w-6 h-6 border border-gray-600 rounded-full flex items-center justify-center text-[10px] text-gray-400">
                IG
              </div>
            </div>
          </div>

          <div className="text-[12px] leading-[1.8] text-[#777]">
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              <p>
                <span className="text-gray-500">상호명</span> (주)예예에
              </p>
              <p>
                <span className="text-gray-500">대표이사</span> 최예나
              </p>
              <p>
                <span className="text-gray-500">사업자등록번호</span>{" "}
                000-00-11111
              </p>
              <p>
                <span className="text-gray-500">통신판매업신고</span>{" "}
                제2000-서울강남-00000호
              </p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
              <p>
                <span className="text-gray-500">주소</span> 서울특별시 강남구
              </p>
              <p>
                <span className="text-gray-500">고객지원센터</span>{" "}
                000-1234-5678 (수신자 요금부담)
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-600 flex justify-between items-end">
            <div>
              <p className="text-[11px] tracking-wider uppercase text-gray-400">
                Copyright © F&F Co., Ltd. All Rights Reserved.
              </p>
            </div>

            <div className="opacity-30">
              <h2 className="text-2xl font-black italic tracking-tighter text-white">
                MLB
              </h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
