"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// server action :
// 1. 코드가 간결
// 2. 서버측에서만 실행되는 함수 - 브라우저는 호출만 할 수 있으며 전달받는 것은 없음, 보안상 민감하거나 중요한 데이터를 다룰 때 유용.

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      }
    );
    // // 1. 특정 주소에 해당하는 페이지만 재검증
    // revalidatePath(`book/${bookId}`);

    // // 2. 특정 경로의 모든 동적 페이지 재검증
    // revalidatePath("book/[id]", "page");

    // // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("/(with-searchbar)", "layout");

    // // 4. 모든 데이터 재검증
    // revalidatePath("/", "layout");

    // // 5. 태그 값을 기준으로 데이터 캐시 재검증
    revalidateTag("tag");
  } catch (err) {
    console.error(err);
  }
}
