import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ItemCardSkeleton = () => {
  return (
    <Card className="w-full max-w-[350px] h-[400px] overflow-hidden backdrop-blur-xl bg-white/80 border border-gray-200/50 shadow-sm rounded-2xl">
      <Skeleton className="h-[250px] w-full" />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </CardFooter>
    </Card>
  );
};

export default ItemCardSkeleton;
