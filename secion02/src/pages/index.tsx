// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  // 오직 서버 측에서만 발생한다.
  // 브라우저에서는 확인할 수 없고 터미널에서만 확인 가능하다.
  console.log("서버사이드 프롭스입니다.");

  const data = "Hello";
  return {
    props: {
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 아래 코드는 에러가 뜬다. 서버에서 먼저 실행되기 때문에 window가 undefined가 됨.
  // undefined.location 과 같은 형태로 작성되어 에러가 발생.
  // window.location
  console.log(data);

  useEffect(() => {
    // 마운트 이후 발생하는 함수이기 때문에 서버가 아닌 브라우저에서 동작해서 에러가 발생하지 않음.
    console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
