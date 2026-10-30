import { PostForm } from "@/components/admin/PostForm";
import { PageTitle } from "@/components/admin/ui";

export default function NewPostPage() {
  return (
    <>
      <PageTitle title="새 글 쓰기" />
      <PostForm />
    </>
  );
}
