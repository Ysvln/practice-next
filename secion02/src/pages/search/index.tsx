import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import fetchBooks from "../lib/fetch-books";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   // static 정적 페이지 => 빌드타임에 쿼리스트링을 알 수 없기 때문에 query라는 속성이 존재하지 않음.
//   // 검색 결과를 서버로부터 불러오는 행동은 수행할 수 없다.
//   // const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
