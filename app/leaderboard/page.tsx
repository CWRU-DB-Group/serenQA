"use client";
import {ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid} from "recharts";
import {ChartConfig, ChartContainer} from "@/components/ui/chart";
import {DataTable} from "@/components/datatable/DataTable";
import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/datatable/DataTableColumnHeader";

const Page = () => {
  const chartData = [
    {hour: "12 AM", users: 50},
    {hour: "2 AM", users: 30},
    {hour: "4 AM", users: 20},
    {hour: "6 AM", users: 100},
    {hour: "8 AM", users: 300},
    {hour: "10 AM", users: 500},
    {hour: "12 PM", users: 700},
    {hour: "2 PM", users: 800},
    {hour: "4 PM", users: 750},
    {hour: "6 PM", users: 600},
    {hour: "8 PM", users: 400},
    {hour: "10 PM", users: 200},
  ];

  const chartConfig = {
    users: {
      label: "Active Users",
      color: "#60a5fa", // Blue color for the scatter points
    },
  } satisfies ChartConfig;

  interface Record {
    model: string;
    instruct: number;
    plan: number;
    reason: number;
    retrieve: number;
    understand: number;
    review: number;
    overall: number;
  }

  const columns: ColumnDef<Record>[] = [
    {
      accessorKey: "model",
      header: ({column}) => <DataTableColumnHeader column={column} title="Model"/>,
    },
    {
      accessorKey: "instruct",
      header: ({column}) => <DataTableColumnHeader column={column} title="Instruct"/>,
    },
    {
      accessorKey: "plan",
      header: ({column}) => <DataTableColumnHeader column={column} title="Plan"/>,
    },
    {
      accessorKey: "reason",
      header: ({column}) => <DataTableColumnHeader column={column} title="Reason"/>,
    },
    {
      accessorKey: "retrieve",
      header: ({column}) => <DataTableColumnHeader column={column} title="Retrieve"/>,
    },
    {
      accessorKey: "understand",
      header: ({column}) => <DataTableColumnHeader column={column} title="Understand"/>,
    },
    {
      accessorKey: "review",
      header: ({column}) => <DataTableColumnHeader column={column} title="Review"/>,
    },
    {
      accessorKey: "overall",
      header: ({column}) => <DataTableColumnHeader column={column} title="Overall"/>,
    }
  ]

  const records: Record[] = [
    {
      model: "Model A",
      instruct: 80,
      plan: 70,
      reason: 90,
      retrieve: 85,
      understand: 75,
      review: 95,
      overall: 80,
    },
    {
      model: "Model B",
      instruct: 60,
      plan: 50,
      reason: 70,
      retrieve: 65,
      understand: 55,
      review: 75,
      overall: 60,
    },
    {
      model: "Model C",
      instruct: 90,
      plan: 85,
      reason: 95,
      retrieve: 80,
      understand: 75,
      review: 90,
      overall: 85,
    },
    {
      model: "Model D",
      instruct: 70,
      plan: 60,
      reason: 80,
      retrieve: 75,
      understand: 65,
      review: 85,
      overall: 70,
    },
    {
      model: "Model E",
      instruct: 50,
      plan: 40,
      reason: 60,
      retrieve: 55,
      understand: 45,
      review: 65,
      overall: 50,
    },
    {
      model: "Model F",
      instruct: 85,
      plan: 80,
      reason: 90,
      retrieve: 75,
      understand: 70,
      review: 95,
      overall: 85,
    },
    {
      model: "Model G",
      instruct: 75,
      plan: 70,
      reason: 80,
      retrieve: 65,
      understand: 60,
      review: 85,
      overall: 75,
    },
    {
      model: "Model H",
      instruct: 65,
      plan: 60,
      reason: 70,
      retrieve: 55,
      understand: 50,
      review: 75,
      overall: 65,
    },
    {
      model: "Model I",
      instruct: 95,
      plan: 90,
      reason: 100,
      retrieve: 85,
      understand: 80,
      review: 95,
      overall: 90
    }
  ];

  return (
    <div className=" py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
        <p className="text-lg mt-4">Coming Soon...</p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-3/4 m-auto mt-20">
        <ScatterChart width={500} height={300}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="hour" type="category" name="Hour"/>
          <YAxis type="number" name="Active Users"/>
          <Tooltip cursor={{strokeDasharray: "3 3"}}/>
          <Scatter
            name="Active Users"
            data={chartData}
            fill={chartConfig.users.color}
            dataKey="users" // Data key for the Y-axis values
          />
        </ScatterChart>
      </ChartContainer>

      <div className="mt-10 m-auto w-3/4">
        <DataTable columns={columns} data={records} title="T-Eval Scores"/>
      </div>

      <div className="mt-10 mx-40 w-3/4">
        <h2 className="text-2xl font-bold mb-4">Notes</h2>
        <li>note1.</li>
        <li>note2.</li>
      </div>
    </div>
  );
};

export default Page;