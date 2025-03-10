import { Cpu } from "lucide-react";

type SpecRangeProps = {
  title: string;
  children: React.ReactNode;
  range: number;
  color: string;
};

export default function SpecRange({
  title,
  range,
  color,
  children,
}: SpecRangeProps) {
  return (
    <>
      <div className="flex items-center">
        <div className="rounded-full p-1 bg-white">{children}</div>
        <div className="flex flex-col w-full">
          <div className="ml-2">{title}</div>
          <div className="relative w-full h-2 bg-gray-200 rounded ml-2">
            <div
              style={{ width: `${range}%` }}
              className={`absolute left-0 h-2 rounded ${color}`}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
