import { ReactNode } from "react";

type LabelProps = {
  Icon?: ReactNode;
  label: string;
};

export function Label({ Icon, label }: LabelProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-indigo-700 rounded">
      {Icon}
      <p className="text-white text-sm">{label}</p>
    </div>
  );
}
