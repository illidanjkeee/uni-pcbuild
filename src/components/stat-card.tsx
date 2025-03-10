type StatCardPropsT = {
  title: string;
  value: string;
  look?: string;
};
export default function StatCard({ title, value, look }: StatCardPropsT) {
  return (
    <>
      <div
        className={` ${look} hover:opacity-80 hover:scale-95 transition-all rounded-md  p-4 w-[250px] `}
      >
        <div className=" font-bold border-b-2 pb-2 text-2xl text-black mb-6">
          {title}
        </div>
        <div className="flex justify-start gap-2 ">
          <div className="text-black font-black text-5xl">{value}</div>
          <div className=" text-black flex items-end">orders</div>
        </div>
      </div>
    </>
  );
}
