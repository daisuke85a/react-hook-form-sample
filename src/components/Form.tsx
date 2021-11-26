import React, { FocusEventHandler } from "react";
import { useForm, UseFormReturn, SubmitHandler } from "react-hook-form";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const onFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      // バリデーションエラー発生時にradio/checkboxのinputにしっかりスクロールしない問題のワークアラウンド
      // 【問題詳細】
      // Safari on iOS: 全くスクロールしない, FireFox,IE：スクロールが不十分でエラーメッセージが見えない,
      if (props.type !== "radio" && props.type !== "checkbox") {
        return;
      }

      try {
        const element = event.currentTarget;
        // radio/checkboxをタップしたときはスクロールしない
        if (isInviewAll(element)) return;

        // バリデーションエラー発生時のみスクロールする
        // 注意：本対応はIE対応できていない(scrollIntoViewはIE非対応)
        element.scrollIntoView({
          block: "center",
          behavior: "auto",
        });
      } catch (e) {
        console.error(e);
      }
    };

    return <input ref={ref} onFocus={onFocus} {...props} />;
  }
);
Input.displayName = "Input";

const isInviewAll = (element: HTMLInputElement) => {
  const rect = element.getBoundingClientRect();

  // 1 < rect.top は firefox対応
  return 1 < rect.top && rect.bottom < window.innerHeight;
};

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
Select.displayName = "Select";

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
