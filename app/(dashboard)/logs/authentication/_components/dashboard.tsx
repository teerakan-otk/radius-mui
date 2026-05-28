"use client";

import useSWR from "swr";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShieldCheck, ShieldAlert, Activity } from "lucide-react";
import { fetcher } from "@/lib/utils";

export function AuthenticationDashboard() {
  const { data, error, isLoading } = useSWR("/api/postauth", fetcher);

  const radiusData: any[] = data?.data || [];
  const total = radiusData.length;
  const successCount = radiusData.filter(
    (d) => d.reply === "Access-Accept",
  ).length;
  const rejectCount = radiusData.filter(
    (d) => d.reply === "Access-Reject",
  ).length;

  if (error) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-destructive/20 bg-destructive/5 text-destructive">
        Failed to load authentication logs.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center text-muted-foreground animate-pulse">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. KPI Cards Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Attempts
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Access Accept
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {successCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              Access Reject
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Charts (ถ้าใช้ shadcn/ui chart component สามารถแทรกตรงนี้ได้) */}

      {/* 3. Data Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Authentication Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {radiusData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">#{log.id}</TableCell>
                  <TableCell>{log.username}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.reply === "Access-Accept"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {log.reply}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(log.authdate).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
