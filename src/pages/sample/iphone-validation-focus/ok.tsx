/* eslint-disable react/display-name */
import { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "components/Form";
import { LANGUAGES, JOBS, PHASE } from "data";
import "tailwindcss/tailwind.css";

type FormValues = {
  language: string;
  job: string;
  phase: string;
};

const Home: NextPage = () => {
  const onSubmit = (data: FormValues) => console.log(data);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  あなたについて教えて下さい
                </h3>
                {/* <p className="mt-1 text-sm text-gray-600">
                  最も得意なものを1つずつ選択してください
                </p> */}
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden space-y-6">
                  <div className="px-4 py-5 bg-white rounded-md space-y-2 sm:p-6 shadow">
                    <div className="py-2 text-base font-medium text-gray-900">
                      Q1. 得意な言語はどれですか？
                      {errors?.language && (
                        <p className="text-red-500 py-2 px-2">
                          <span>選択してください</span>
                        </p>
                      )}
                    </div>

                    <div className="mt-4 space-y-4">
                      {LANGUAGES.map((language, i) => (
                        <div key={i} className="flex items-center">
                          {/* <input */}
                          <Input
                            type="radio"
                            value={language}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            {...register("language", { required: true })}
                          />
                          <label className="ml-3 block text-sm font-medium text-gray-700">
                            <span>{language}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-4 py-5 bg-white rounded-md space-y-2 sm:p-6 shadow">
                    <div className="py-2 text-base font-medium text-gray-900">
                      Q2. 得意な職業はどれですか？
                      {errors?.job && (
                        <p className="text-red-500 py-2 px-2">
                          <span>選択してください</span>
                        </p>
                      )}
                    </div>

                    <div className="mt-4 space-y-4">
                      {JOBS.map((item, i) => (
                        <div key={i} className="flex items-center">
                          {/* <input */}
                          <Input
                            type="radio"
                            value={item}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            {...register("job", { required: true })}
                          />
                          <label className="ml-3 block text-sm font-medium text-gray-700">
                            <span>{item}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-4 py-5 bg-white rounded-md space-y-2 sm:p-6 shadow">
                    <div className="py-2 text-base font-medium text-gray-900">
                      Q3. 得意なフェーズはどれですか？
                      {errors?.phase && (
                        <p className="text-red-500 py-2 px-2">
                          <span>選択してください</span>
                        </p>
                      )}
                    </div>

                    <div className="mt-4 space-y-4">
                      {PHASE.map((item, i) => (
                        <div key={i} className="flex items-center">
                          {/* <input */}
                          <Input
                            type="radio"
                            value={item}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            {...register("phase", { required: true })}
                          />
                          <label className="ml-3 block text-sm font-medium text-gray-700">
                            <span>{item}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-4 py-3 text-right">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      送信
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
