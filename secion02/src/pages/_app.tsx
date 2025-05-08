import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test");

    // 뒤로가기를 방지하며 페이지 이동
    // router.replace("/test");
  };

  useEffect(() => {
    // test 페이지에 대한 prefetch
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        <Link href={"/"}>Index</Link>
        &nbsp;
        {/* prefetch를 명시적으로 해제할 수도 있음. */}
        <Link href={"/search"} prefetch={false}>
          Search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>Book1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동합니다.</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
