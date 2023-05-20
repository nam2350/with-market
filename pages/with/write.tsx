import type { NextPage } from "next";
import Layout from "@/components/layout";
import Button from "@/components/button";
import TextArea from "@/components/textarea";
import { useForm } from "react-hook-form";

const Write: NextPage = () => {
  const { register, handleSubmit } = useForm();
  return (
    <Layout canGoBack>
      <form className="px-4 py-10">
        <TextArea
          register={register("question", { required: true })}
          name="question"
          placeholder="✏️우리동네 궁금한 점을 질문 해보세요!"
        />
        <Button text="질문하기" />
      </form>
    </Layout>
  );
};

export default Write;
