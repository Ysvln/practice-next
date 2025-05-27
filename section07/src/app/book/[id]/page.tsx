import { notFound } from "next/navigation";
import style from "./page.module.css";

// generateStaticParams 으로 내보내진 1,2,3 외에 4번으로 이동하는 경우 not found로 이동함.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor() {
  // server action :
  // 1. 코드가 간결
  // 2. 서버측에서만 실행되는 함수 - 브라우저는 호출만 할 수 있으며 전달받는 것은 없음, 보안상 민감하거나 중요한 데이터를 다룰 때 유용.
  async function createReviewAction(formData: FormData) {
    "use server";

    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();
  }

  return (
    <section>
      <form action={createReviewAction}>
        <input name="content" placeholder="리뷰 내용" />
        <input name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail bookId={params.id} />
      <ReviewEditor />
    </div>
  );
}
