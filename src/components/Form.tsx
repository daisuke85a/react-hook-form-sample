/* eslint-disable react/display-name */
// TODO:react/display-nameについて調べる
import React, { useEffect } from "react";
import { useForm, UseFormReturn, SubmitHandler } from "react-hook-form";
import { useMergeRefs } from "../hooks/useMergeRefs";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const internalRef = React.useRef<HTMLInputElement>();

    // バリデーションエラー発生時にiOSでradio/checkboxのinputにスクロールしない問題のワークアラウンド
    useEffect(() => {
      if (props.type !== "radio" && props.type !== "checkbox") {
        return;
      }
      if (!/iPad|iPhone/.test(navigator.userAgent)) {
        return;
      }

      internalRef.current?.addEventListener("focus", (e) => {
        try {
          const element = e.target as HTMLInputElement;
          const rect = element.getBoundingClientRect();
          const isInView = 0 < rect.bottom && rect.top < window.innerHeight;
          // radio/checkboxをタップしたときはスクロールしない
          if (isInView) return;

          // バリデーションエラー発生時のみスクロールする
          element.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        } catch (e) {
          console.error(
            "バリデーションエラー発生時にiOSでradio/checkboxのinputにスクロールさせるのに失敗",
            e
          );
        }
      });
    }, []);
    return <input ref={useMergeRefs(internalRef, ref)} {...props} />;
  }
);

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] };

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, ...props }, ref) => (
    <select ref={ref} {...props}>
      {options.map(({ label, value }, i) => (
        <option key={i} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
);

type FormProps<TFormValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
};

export const Form = <
  TFormValues extends Record<string, any> = Record<string, any>
>({
  onSubmit,
  children,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>();
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  );
};

type FormValues = {
  firstName: string;
  lastName: string;
  sex: string;
};
