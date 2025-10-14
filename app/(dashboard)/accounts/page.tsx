"use client";

import { Loader2, Plus } from "lucide-react";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";

const AccountsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useNewAccount();

  const accountQueries = useGetAccounts();
  const deleteAccounts = useBulkDeleteAccounts();
  const accounts = accountQueries.data || [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = () => {
    onOpen();
  };

  const isDisable = accountQueries.isLoading || deleteAccounts.isPending;

  if (!isMounted) return;

  if (accountQueries.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button onClick={handleOpen} size={"sm"}>
            <Plus /> Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccounts.mutate({ ids });
            }}
            filterKey="name"
            columns={columns}
            data={accounts}
            disabled={isDisable}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
