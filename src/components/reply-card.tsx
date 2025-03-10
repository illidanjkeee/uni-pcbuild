import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type ReplyCardPropsT = {
  name: string;
  answer?: string;
  image: string;
  email: string;
  replyID?: string;
  reaction?: string;
};
export default function ReplyCard({
  name,
  answer,
  image,
  email,
  replyID,
  reaction,
}: ReplyCardPropsT) {
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-start items-start gap-5 sm:gap-10 w-[95%] p-3">
        <div className="flex gap-4 items-center">
          <Avatar className="w-7 h-7 ">
            <AvatarImage src={image} alt="image" className="" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{name}</div>
            <div className="text-[0.75rem]">{email}</div>
          </div>
        </div>
        <div className="text-lg ">
          {reaction && <div>{reaction}</div>}
          {answer && <div>{answer}</div>}
        </div>
      </div>
    </>
  );
}
