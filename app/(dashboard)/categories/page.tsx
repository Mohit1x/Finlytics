"use client";

import { Loader2, Plus } from "lucide-react";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";

const CategoriesPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useNewCategory();

  const categoryQueries = useGetCategories();
  const deleteCategories = useBulkDeleteCategories();
  const categories = categoryQueries.data || [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = () => {
    onOpen();
  };

  const isDisable = categoryQueries.isLoading || deleteCategories.isPending;

  if (!isMounted) return;

  if (categoryQueries.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <CardContent>
              <div className="h-[500px] w-full flex items-center justify-center">
                <Loader2 className="size-6 text-slate-400 animate-spin" />
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Categories Page
          </CardTitle>
          <Button onClick={handleOpen} size={"sm"}>
            <Plus /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories.mutate({ ids });
            }}
            filterKey="name"
            columns={columns}
            data={categories}
            disabled={isDisable}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
