import { Skeleton } from "@/components/ui/skeleton";

export const DataTableSkeleton = () => {
	return (
		<div>
			<Skeleton className="w-full h-[32px] mb-3" />
			<Skeleton className="w-full h-[350px]" />
			<Skeleton className="w-full h-[32px] mt-3" />
		</div>
	);
};
