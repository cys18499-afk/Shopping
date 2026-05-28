export function Spinner() {
  return (
    <div className="w-5 h-5 border-4 border-t-white border-transparent rounded-full animate-spin">
      로딩중입니다..
    </div>
  );
}

export function SmallSpinner() {
  return (
    <div className="w-3 h-3 border-2 border-t-white border-transparent rounded-full animate-spin"></div>
  );
}
