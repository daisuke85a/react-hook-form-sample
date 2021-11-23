/* eslint-disable react/display-name */
import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "components/Form";
import { LANGUAGES } from "data";
import "tailwindcss/tailwind.css";

type FormValues = {
  language: string;
};

const Home: NextPage = () => {
  const onSubmit = (data: FormValues) => console.log(data);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>Q1. 好きなプログラミング言語はなんですか？</p>
        {errors?.language && (
          <p className="text-red-500 py-2 px-2">
            <span>選択してください</span>
          </p>
        )}
        {LANGUAGES.map((language, i) => (
          <div key={i}>
            <Input
              type="radio"
              value={language}
              {...register("language", { required: true })}
            />
            <label>{language}</label>
          </div>
        ))}
        <button
          type="submit"
          className="text-white bg-blue-600 py-2 px-4 rounded-md"
        >
          送信
        </button>
      </div>
    </form>
  );
};

export default Home;
