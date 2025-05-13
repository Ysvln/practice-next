// 서버컴포넌트이기 때문에 async 사용 가능

import ClientComponent from "@/components/client-component";

// 서버 측에서 사전 렌더링을 위해 딱 한번 실행 => 비동기적으로 가능
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return (
    // client 컴포넌트와 server 컴포넌트를 모두 포함
    <div>
      Search : {q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
