import { Spinner } from "../components/common/ui/Spinner";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-[500px]">
      <Spinner />
      로딩중입니다
    </div>
  );
}
