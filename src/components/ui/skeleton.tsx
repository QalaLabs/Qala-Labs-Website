import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

function BlogFeaturedSkeleton() {
  return (
    <div className="mb-16">
      <div className="relative h-[500px] rounded-[3rem] overflow-hidden bg-slate-200 animate-pulse">
        <div className="absolute bottom-0 left-0 p-10 md:p-16 max-w-3xl space-y-4">
          <Skeleton className="h-5 w-32 rounded-full bg-slate-300" />
          <Skeleton className="h-10 w-3/4 bg-slate-300" />
          <Skeleton className="h-6 w-full bg-slate-300" />
          <Skeleton className="h-14 w-48 rounded-2xl bg-slate-300" />
        </div>
      </div>
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="rounded-[2.5rem] bg-white shadow-xl overflow-hidden border border-slate-100 flex flex-col">
      <Skeleton className="h-56 w-full rounded-none bg-slate-200" />
      <div className="p-8 space-y-4 flex-1">
        <Skeleton className="h-3 w-40 bg-slate-200" />
        <Skeleton className="h-7 w-full bg-slate-200" />
        <Skeleton className="h-7 w-3/4 bg-slate-200" />
        <Skeleton className="h-4 w-full bg-slate-100" />
        <Skeleton className="h-4 w-2/3 bg-slate-100" />
        <Skeleton className="h-5 w-24 bg-slate-200 mt-auto" />
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="rounded-[2.5rem] bg-white shadow-xl overflow-hidden border border-slate-100">
      <Skeleton className="aspect-[4/5] w-full rounded-none bg-slate-200" />
    </div>
  );
}

function CaseStudyCardSkeleton() {
  return (
    <div className="rounded-[2.5rem] bg-white shadow-xl overflow-hidden border border-slate-100">
      <Skeleton className="aspect-[4/5] w-full rounded-none bg-slate-200" />
    </div>
  );
}

export {
  Skeleton,
  BlogFeaturedSkeleton,
  BlogCardSkeleton,
  ProjectCardSkeleton,
  CaseStudyCardSkeleton,
};
