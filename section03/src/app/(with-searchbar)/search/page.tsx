// 서버컴포넌트이기 때문에 async 사용 가능
// 서버 측에서 사전 렌더링을 위해 딱 한번 실행 => 비동기적으로 가능
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return <div>Search : {q}</div>;
}
