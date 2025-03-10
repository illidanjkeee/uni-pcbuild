import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import showAllBuildsOfAUser from "@/lib/showAllBuildsOfAUser";
import UserSelectCategoryWrapper from "@/components/user-select-category-wrapper";
import BrowseCardWrapper from "@/components/browse-card-wrapper";
import GradientTextL from "@/components/gradient-text";
export const metadata = {
  title: "browse",
};
export default async function Browse({ searchParams }: { searchParams: any }) {
  const currentPage = parseInt(searchParams.page) || 1;
  const allBuilds = await showAllBuildsOfAUser();
  return (
    <>
      <div className="pt-24 w-full px-8 max-w-[1440px] ">
        <div className="w-full flex sm:flex-row-reverse flex-col-reverse sm:justify-between mb-8  justify-center items-start sm:items-start">
          <UserSelectCategoryWrapper />
          <GradientTextL className="text-5xl md:text-6xl">Browse</GradientTextL>
        </div>

        <BrowseCardWrapper
          currentPage={currentPage}
          allbuids={JSON.parse(JSON.stringify(allBuilds))}
          allowAddToBuild={true}
          allowDelete={false}
        />

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/browse?page=${currentPage > 1 ? currentPage - 1 : 1}`}
              />
            </PaginationItem>

            <div className="sm:flex hidden ">
              <PaginationItem>
                <PaginationLink href="/browse?page=1">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="/browse?page=2">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="/browse?page=3">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="/browse?page=4">4</PaginationLink>
              </PaginationItem>
            </div>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`/browse?page=${currentPage + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
