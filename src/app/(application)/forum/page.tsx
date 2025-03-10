import QuestionInput from "@/components/question-input";
import QuestionDisplayCard from "@/components/question-display-card";
import ReplyCard from "@/components/reply-card";
import connectdb from "@/lib/connectdb";
import Questions from "@/schemas/server/questions-server-schema";
import BuildInput from "@/components/build-input";
import ShareBuilds from "@/schemas/server/share-build-server-schema";
import User from "@/schemas/server/user-server-schema";
import { currentUser } from "@clerk/nextjs";
import BuildDisplayCard from "@/components/build-display-card";
import GradientText from "@/components/gradient-text";
import SwitchForumTabBtn from "@/components/switch-forum-tab-btn";
import QuestionWrapper from "@/components/wrappers/questions-wrapper";
import ShareBuildsWrapper from "@/components/wrappers/share-builds-wrapper";
import { nanoid } from "nanoid";
export const metadata = {
  title: "forum",
};
export default async function Forum() {
  await connectdb();
  const user = await currentUser();
  const questionsData = await Questions.find({});
  const sharedBuilds = await ShareBuilds.find({});
  const userInfo = await User.find({
    userEmail: user?.emailAddresses[0].emailAddress,
  });

  return (
    <div className="w-full py-24 px-8 max-w-[1440px]">
      <GradientText className="text-5xl">Forum</GradientText>
      <div className="flex sm:flex-row  w-full  py-12 mb-6 flex-col justify-start ">
        <QuestionInput />
        <BuildInput userInfo={JSON.parse(JSON.stringify(userInfo))} />
      </div>
      <SwitchForumTabBtn />
      <ShareBuildsWrapper>
        <div className="w-full   flex flex-col gap-6 mt-4">
          {sharedBuilds
            ?.slice()
            .reverse()
            .map((build: any) => {
              return (
                <BuildDisplayCard
                  key={build._id.toString()}
                  name={build.name}
                  parts={build.parts}
                  sharedBuildID={build._id.toString()}
                  buildName={build.buildName}
                  email={build.email}
                  image={build.image}
                  buildID={build.buildID.toString()}
                >
                  <div className="flex flex-col w-full  justify-end items-end">
                    {build?.reactions?.map((reaction: any) => {
                      return (
                        <ReplyCard
                          key={nanoid()}
                          name={reaction.name}
                          reaction={reaction.reaction}
                          image={reaction.image}
                          email={reaction.email}
                          replyID={reaction._id}
                        />
                      );
                    })}
                  </div>
                </BuildDisplayCard>
              );
            })}
        </div>
      </ShareBuildsWrapper>
      <QuestionWrapper>
        <div className="w-full   flex flex-col gap-6 mt-4">
          {questionsData
            ?.slice()
            .reverse()
            .map((question) => {
              return (
                <QuestionDisplayCard
                  key={question._id.toString()}
                  name={question.name}
                  question={question.question}
                  image={question.image}
                  email={question.email}
                  questionID={question._id.toString()}
                >
                  <div className="flex flex-col w-full  justify-end items-end">
                    {question.answers.map((answer: any) => {
                      return (
                        <ReplyCard
                          key={nanoid()}
                          name={answer.name}
                          answer={answer.answer}
                          image={answer.image}
                          email={answer.email}
                          replyID={answer._id}
                        />
                      );
                    })}
                  </div>
                </QuestionDisplayCard>
              );
            })}
        </div>
      </QuestionWrapper>
    </div>
  );
}
