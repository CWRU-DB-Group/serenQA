"use client";

import { DataTable } from "@/components/datatable/DataTable";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";

interface Table3Row {
  model: string;
  faithfulLLM?: number;
  compreLLM?: number;
  serenCovLLM?: number;
  faithfulExpert?: number;
  compreExpert?: number;
  serenCovExpert?: number;
  faithfulRNS?: number;
  compreRNS?: number;
  serenCovRNS?: number;
  relevanceLLM?: number;
  typeMatchLLM?: number;
  serenHitLLM?: number;
  relevanceExpert?: number;
  typeMatchExpert?: number;
  serenHitExpert?: number;
  relevanceRNS?: number;
  typeMatchRNS?: number;
  serenHitRNS?: number;
}

interface Table2Row {
  model: string;
  oneHopHit?: number;
  oneHopF1?: number;
  oneHopExe?: number;
  twoHopHit?: number;
  twoHopF1?: number;
  twoHopExe?: number;
  multiHit?: number;
  multiF1?: number;
  multiExe?: number;
  interHit?: number;
  interF1?: number;
  interExe?: number;
}

const formatNumber = (val: number | undefined) => {
  if (val === undefined) return "-";
  return val.toFixed(val < 10 ? 3 : 2).replace(/\.?0+$/, "");
};

const HighlightCell = ({ value }: { value: number | undefined }) => {
  if (value === undefined) return <span className="text-muted-foreground">-</span>;
  const str = formatNumber(value);
  return <span className="font-bold">{str}</span>;
};

const UnderlineCell = ({ value }: { value: number | undefined }) => {
  if (value === undefined) return <span className="text-muted-foreground">-</span>;
  const str = formatNumber(value);
  return <span className="underline">{str}</span>;
};

// Tooltip content for scatter plots that shows the model name and metric values
const ModelScatterTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  const firstPoint = payload[0];
  const base = (firstPoint && firstPoint.payload) as
    | { label?: string; model?: string }
    | undefined;
  const modelLabel: string = base?.label ?? base?.model ?? "";

  return (
    <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      {modelLabel && <div className="mb-1 font-semibold">{modelLabel}</div>}
      <div className="space-y-0.5">
        {payload.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">{p.name}</span>
            <span className="font-mono tabular-nums">
              {typeof p.value === "number" ? p.value.toFixed(3) : p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Page = () => {
  // === Table 3 Data (Subgraph Reasoning & Serendipity Exploration) ===
  const table3Data: Table3Row[] = [
    {
      model: "DeepSeek-V3",
      faithfulLLM: 2.283,
      compreLLM: 3.341,
      serenCovLLM: 0.101,
      faithfulExpert: 2.306,
      compreExpert: 3.340,
      serenCovExpert: 0.100,
      faithfulRNS: 2.253,
      compreRNS: 3.326,
      serenCovRNS: 0.106,
      relevanceLLM: 2.436,
      typeMatchLLM: 0.482,
      serenHitLLM: 0.048,
      relevanceExpert: 2.494,
      typeMatchExpert: 0.462,
      serenHitExpert: 0.061,
      relevanceRNS: 2.538,
      typeMatchRNS: 0.463,
      serenHitRNS: 0.077,
    },
    {
      model: "Llama-3.3-70B",
      faithfulLLM: 2.519,
      compreLLM: 3.842,
      serenCovLLM: 0.070,
      faithfulExpert: 2.553,
      compreExpert: 3.853,
      serenCovExpert: 0.068,
      faithfulRNS: 2.531,
      compreRNS: 3.829,
      serenCovRNS: 0.075,
      relevanceLLM: 2.537,
      typeMatchLLM: 0.502,
      serenHitLLM: 0.046,
      relevanceExpert: 2.559,
      typeMatchExpert: 0.483,
      serenHitExpert: 0.067,
      relevanceRNS: 2.594,
      typeMatchRNS: 0.478,
      serenHitRNS: 0.106,
    },
    {
      model: "DeepSeek-R1-70B",
      faithfulLLM: 2.573,
      compreLLM: 2.206,
      serenCovLLM: 0.223,
      faithfulExpert: 2.572,
      compreExpert: 2.238,
      serenCovExpert: 0.204,
      faithfulRNS: 2.582,
      compreRNS: 2.202,
      serenCovRNS: 0.217,
      relevanceLLM: 2.544,
      typeMatchLLM: 0.505,
      serenHitLLM: 0.043,
      relevanceExpert: 2.565,
      typeMatchExpert: 0.478,
      serenHitExpert: 0.086,
      relevanceRNS: 2.630,
      typeMatchRNS: 0.483,
      serenHitRNS: 0.127,
    },
    {
      model: "Qwen-2.5-72B",
      faithfulLLM: 2.024,
      compreLLM: 2.683,
      serenCovLLM: 0.153,
      faithfulExpert: 2.093,
      compreExpert: 2.715,
      serenCovExpert: 0.152,
      faithfulRNS: 2.114,
      compreRNS: 2.719,
      serenCovRNS: 0.155,
      relevanceLLM: 1.935,
      typeMatchLLM: 0.424,
      serenHitLLM: 0.030,
      relevanceExpert: 2.000,
      typeMatchExpert: 0.409,
      serenHitExpert: 0.034,
      relevanceRNS: 2.033,
      typeMatchRNS: 0.418,
      serenHitRNS: 0.049,
    },
    {
      model: "Mixtral-8x7B",
      faithfulLLM: 2.271,
      compreLLM: 2.963,
      serenCovLLM: 0.642,
      faithfulExpert: 2.272,
      compreExpert: 2.958,
      serenCovExpert: 0.610,
      faithfulRNS: 2.347,
      compreRNS: 2.924,
      serenCovRNS: 0.632,
      relevanceLLM: 2.269,
      typeMatchLLM: 0.428,
      serenHitLLM: 0.028,
      relevanceExpert: 2.337,
      typeMatchExpert: 0.416,
      serenHitExpert: 0.050,
      relevanceRNS: 2.409,
      typeMatchRNS: 0.412,
      serenHitRNS: 0.070,
    },
    {
      model: "Qwen-2.5-32B",
      faithfulLLM: 2.243,
      compreLLM: 2.929,
      serenCovLLM: 0.148,
      faithfulExpert: 2.255,
      compreExpert: 2.910,
      serenCovExpert: 0.146,
      faithfulRNS: 2.260,
      compreRNS: 2.886,
      serenCovRNS: 0.152,
      relevanceLLM: 2.158,
      typeMatchLLM: 0.324,
      serenHitLLM: 0.016,
      relevanceExpert: 2.250,
      typeMatchExpert: 0.312,
      serenHitExpert: 0.022,
      relevanceRNS: 2.220,
      typeMatchRNS: 0.306,
      serenHitRNS: 0.042,
    },
    {
      model: "Gamma-2-27B",
      faithfulLLM: 2.365,
      compreLLM: 3.410,
      serenCovLLM: 0.088,
      faithfulExpert: 2.381,
      compreExpert: 3.439,
      serenCovExpert: 0.084,
      faithfulRNS: 2.385,
      compreRNS: 3.415,
      serenCovRNS: 0.089,
      relevanceLLM: 2.357,
      typeMatchLLM: 0.450,
      serenHitLLM: 0.033,
      relevanceExpert: 2.379,
      typeMatchExpert: 0.414,
      serenHitExpert: 0.057,
      relevanceRNS: 2.443,
      typeMatchRNS: 0.431,
      serenHitRNS: 0.080,
    },
    {
      model: "Mistral-24B",
      faithfulLLM: 2.114,
      compreLLM: 3.016,
      serenCovLLM: 0.141,
      faithfulExpert: 2.114,
      compreExpert: 3.048,
      serenCovExpert: 0.136,
      faithfulRNS: 2.134,
      compreRNS: 3.049,
      serenCovRNS: 0.141,
      relevanceLLM: 1.903,
      typeMatchLLM: 0.212,
      serenHitLLM: 0.011,
      relevanceExpert: 1.962,
      typeMatchExpert: 0.204,
      serenHitExpert: 0.023,
      relevanceRNS: 2.006,
      typeMatchRNS: 0.213,
      serenHitRNS: 0.035,
    },
    {
      model: "Qwen-2.5-7B",
      faithfulLLM: 1.920,
      compreLLM: 1.817,
      serenCovLLM: 0.592,
      faithfulExpert: 1.900,
      compreExpert: 1.848,
      serenCovExpert: 0.580,
      faithfulRNS: 1.955,
      compreRNS: 1.832,
      serenCovRNS: 0.593,
      relevanceLLM: 1.636,
      typeMatchLLM: 0.221,
      serenHitLLM: 0.022,
      relevanceExpert: 1.721,
      typeMatchExpert: 0.229,
      serenHitExpert: 0.026,
      relevanceRNS: 1.708,
      typeMatchRNS: 0.215,
      serenHitRNS: 0.041,
    },
    // Additional rows from lower part (with → wo. summary)
    {
      model: "→ wo. summary",
      relevanceLLM: 2.447,
      typeMatchLLM: 0.482,
      serenHitLLM: 0.050,
      relevanceExpert: 2.482,
      typeMatchExpert: 0.463,
      serenHitExpert: 0.095,
      relevanceRNS: 2.510,
      typeMatchRNS: 0.468,
      serenHitRNS: 0.134,
    },
    {
      model: "→ wo. summary",
      relevanceLLM: 1.972,
      typeMatchLLM: 0.438,
      serenHitLLM: 0.035,
      relevanceExpert: 1.987,
      typeMatchExpert: 0.413,
      serenHitExpert: 0.037,
      relevanceRNS: 2.052,
      typeMatchRNS: 0.419,
      serenHitRNS: 0.053,
    },
    {
      model: "→ wo. summary",
      relevanceLLM: 2.264,
      typeMatchLLM: 0.415,
      serenHitLLM: 0.023,
      relevanceExpert: 2.345,
      typeMatchExpert: 0.406,
      serenHitExpert: 0.041,
      relevanceRNS: 2.405,
      typeMatchRNS: 0.400,
      serenHitRNS: 0.059,
    },
    {
      model: "→ wo. summary",
      relevanceLLM: 2.158,
      typeMatchLLM: 0.324,
      serenHitLLM: 0.016,
      relevanceExpert: 2.250,
      typeMatchExpert: 0.312,
      serenHitExpert: 0.022,
      relevanceRNS: 2.220,
      typeMatchRNS: 0.306,
      serenHitRNS: 0.042,
    },
    {
      model: "→ wo. summary",
      relevanceLLM: 2.304,
      typeMatchLLM: 0.453,
      serenHitLLM: 0.037,
      relevanceExpert: 2.328,
      typeMatchExpert: 0.431,
      serenHitExpert: 0.068,
      relevanceRNS: 2.390,
      typeMatchRNS: 0.438,
      serenHitRNS: 0.105,
    },
    {
      model: "→ wo. summary",
      relevanceLLM: 1.903,
      typeMatchLLM: 0.212,
      serenHitLLM: 0.011,
      relevanceExpert: 1.962,
      typeMatchExpert: 0.204,
      serenHitExpert: 0.023,
      relevanceRNS: 2.006,
      typeMatchRNS: 0.213,
      serenHitRNS: 0.035,
    },
    {
      model: "→ wo. summary",
      relevanceLLM: 1.487,
      typeMatchLLM: 0.160,
      serenHitLLM: 0.018,
      relevanceExpert: 1.550,
      typeMatchExpert: 0.175,
      serenHitExpert: 0.018,
      relevanceRNS: 1.547,
      typeMatchRNS: 0.158,
      serenHitRNS: 0.027,
    },
  ];

  // === Table 2 Data (Knowledge Retrieval) ===
  const table2Data: Table2Row[] = [
    {
      model: "DeepSeek-V3",
      oneHopHit: 20.45,
      oneHopF1: 78.71,
      oneHopExe: 72.88,
      twoHopHit: 3.46,
      twoHopF1: 10.71,
      twoHopExe: 9.86,
      multiHit: 1.97,
      multiF1: 6.22,
      multiExe: 6.55,
      interHit: 2.64,
      interF1: 7.15,
      interExe: 8.03,
    },
    {
      model: "GPT-4o",
      oneHopHit: 19.71,
      oneHopF1: 77.16,
      oneHopExe: 60.17,
      twoHopHit: 2.08,
      twoHopF1: 6.36,
      twoHopExe: 7.89,
      multiHit: 1.40,
      multiF1: 4.20,
      multiExe: 4.85,
      interHit: 1.56,
      interF1: 4.65,
      interExe: 5.21,
    },
    {
      model: "Claude-3.5-Haiku",
      oneHopHit: 13.28,
      oneHopF1: 48.54,
      oneHopExe: 48.73,
      twoHopHit: 9.78,
      twoHopF1: 39.01,
      twoHopExe: 32.89,
      multiHit: 4.43,
      multiF1: 8.64,
      multiExe: 14.08,
      interHit: 1.38,
      interF1: 3.90,
      interExe: 4.66,
    },
    {
      model: "Llama-3.3-70B",
      oneHopHit: 19.28,
      oneHopF1: 70.67,
      oneHopExe: 74.58,
      twoHopHit: 16.63,
      twoHopF1: 44.34,
      twoHopExe: 56.57,
      multiHit: 2.98,
      multiF1: 10.16,
      multiExe: 11.89,
      interHit: 4.80,
      interF1: 9.60,
      interExe: 16.05,
    },
    {
      model: "DeepSeek-R1-70B",
      oneHopHit: 19.87,
      oneHopF1: 69.07,
      oneHopExe: 80.08,
      twoHopHit: 12.03,
      twoHopF1: 37.00,
      twoHopExe: 43.42,
      multiHit: 2.97,
      multiF1: 8.06,
      multiExe: 13.11,
      interHit: 3.49,
      interF1: 6.16,
      interExe: 16.46,
    },
    {
      model: "Med42-V2-70B",
      oneHopHit: 18.34,
      oneHopF1: 69.43,
      oneHopExe: 69.92,
      twoHopHit: 5.92,
      twoHopF1: 19.12,
      twoHopExe: 19.74,
      multiHit: 0.23,
      multiF1: 0.51,
      multiExe: 1.21,
      interHit: 0.08,
      interF1: 0.13,
      interExe: 0.68,
    },
    {
      model: "Qwen3-32B",
      oneHopHit: 0.37,
      oneHopF1: 1.27,
      oneHopExe: 1.27,
      twoHopHit: 0.16,
      twoHopF1: 0.65,
      twoHopExe: 0.65,
      multiHit: 0.24,
      multiF1: 0.36,
      multiExe: 0.48,
      interHit: 0.00,
      interF1: 0.00,
      interExe: 0.00,
    },
    {
      model: "Qwen3-8B",
      oneHopHit: 10.07,
      oneHopF1: 37.24,
      oneHopExe: 39.83,
      twoHopHit: 0.98,
      twoHopF1: 2.87,
      twoHopExe: 3.95,
      multiHit: 0.90,
      multiF1: 2.01,
      multiExe: 4.85,
      interHit: 1.58,
      interF1: 1.91,
      interExe: 5.62,
    },
    {
      model: "DeepSeek-R1-8B",
      oneHopHit: 1.27,
      oneHopF1: 3.41,
      oneHopExe: 5.51,
      twoHopHit: 0.00,
      twoHopF1: 0.00,
      twoHopExe: 0.00,
      multiHit: 0.04,
      multiF1: 0.24,
      multiExe: 0.24,
      interHit: 0.00,
      interF1: 0.00,
      interExe: 0.00,
    },
    {
      model: "Med42-V2-8B",
      oneHopHit: 8.11,
      oneHopF1: 23.90,
      oneHopExe: 49.15,
      twoHopHit: 1.05,
      twoHopF1: 3.31,
      twoHopExe: 3.97,
      multiHit: 1.71,
      multiF1: 4.07,
      multiExe: 4.12,
      interHit: 0.04,
      interF1: 0.13,
      interExe: 0.14,
    },
    {
      model: "Qwen3-1.7B",
      oneHopHit: 0.84,
      oneHopF1: 3.72,
      oneHopExe: 11.86,
      twoHopHit: 0.65,
      twoHopF1: 1.98,
      twoHopExe: 3.29,
      multiHit: 0.00,
      multiF1: 0.00,
      multiExe: 0.24,
      interHit: 1.08,
      interF1: 1.56,
      interExe: 2.74,
    },
    {
      model: "DeepSeek-R1-1.5B",
      oneHopHit: 0.00,
      oneHopF1: 0.00,
      oneHopExe: 0.00,
      twoHopHit: 0.00,
      twoHopF1: 0.00,
      twoHopExe: 0.00,
      multiHit: 0.00,
      multiF1: 0.00,
      multiExe: 0.00,
      interHit: 0.00,
      interF1: 0.00,
      interExe: 0.00,
    },
  ];

  // Chart-specific data with numeric indices to avoid cluttered category labels
  const table2ChartData = table2Data.map((row, index) => ({
    ...row,
    index,
    label: row.model,
  }));

  const table3ChartData = table3Data.map((row, index) => ({
    ...row,
    index,
    label: row.model,
  }));

  // === Chart Configs ===
  const t1ChartConfig: ChartConfig = {
    oneHopHit: { label: "One-Hop Hit(%)", color: "#1f77b4" },
    twoHopHit: { label: "Two-Hop Hit(%)", color: "#ff7f0e" },
    multiHit: { label: "Multiple(3+) Hop Hit(%)", color: "#2ca02c" },
    interHit: { label: "Intersection Hit(%)", color: "#d62728" },
  };

  const t3ChartConfig: ChartConfig = {
    relevanceLLM: { label: "LLM Relevance", color: "#1f77b4" },
    relevanceExpert: { label: "Expert Relevance", color: "#ff7f0e" },
    relevanceRNS: { label: "RNS Relevance", color: "#2ca02c" },
    serenHitLLM: { label: "LLM SerenHit", color: "#9467bd" },
    serenHitExpert: { label: "Expert SerenHit", color: "#8c564b" },
    serenHitRNS: { label: "RNS SerenHit", color: "#e377c2" },
  };

  // === Column Definitions for Table 3 ===
  const table3Columns: ColumnDef<Table3Row>[] = [
    {
      accessorKey: "model",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Models" />,
      cell: ({ row }) => {
        const model = row.getValue("model") as string;
        return model.includes("→") ? <span className="italic">{model}</span> : model;
      },
    },
    // LLM Ensemble
    {
      id: "llm-ensemble-upper",
      header: () => <div className="text-center font-semibold">LLM Ensemble</div>,
      columns: [
        {
          accessorKey: "faithfulLLM",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Faithful." />,
          cell: ({ row }) => <HighlightCell value={row.original.faithfulLLM} />,
        },
        {
          accessorKey: "compreLLM",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Compre." />,
          cell: ({ row }) => <HighlightCell value={row.original.compreLLM} />,
        },
        {
          accessorKey: "serenCovLLM",
          header: ({ column }) => <DataTableColumnHeader column={column} title="SerenCov" />,
          cell: ({ row }) => <UnderlineCell value={row.original.serenCovLLM} />,
        },
      ],
    },
    // Expert Crowdsourced
    {
      id: "expert-crowdsourced-upper",
      header: () => <div className="text-center font-semibold">Expert Crowdsourced</div>,
      columns: [
        {
          accessorKey: "faithfulExpert",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Faithful." />,
          cell: ({ row }) => <HighlightCell value={row.original.faithfulExpert} />,
        },
        {
          accessorKey: "compreExpert",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Compre." />,
          cell: ({ row }) => <HighlightCell value={row.original.compreExpert} />,
        },
        {
          accessorKey: "serenCovExpert",
          header: ({ column }) => <DataTableColumnHeader column={column} title="SerenCov" />,
          cell: ({ row }) => <UnderlineCell value={row.original.serenCovExpert} />,
        },
      ],
    },
    // RNS Guided
    {
      id: "rns-guided-upper",
      header: () => <div className="text-center font-semibold">RNS Guided</div>,
      columns: [
        {
          accessorKey: "faithfulRNS",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Faithful." />,
          cell: ({ row }) => <HighlightCell value={row.original.faithfulRNS} />,
        },
        {
          accessorKey: "compreRNS",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Compre." />,
          cell: ({ row }) => <HighlightCell value={row.original.compreRNS} />,
        },
        {
          accessorKey: "serenCovRNS",
          header: ({ column }) => <DataTableColumnHeader column={column} title="SerenCov" />,
          cell: ({ row }) => <UnderlineCell value={row.original.serenCovRNS} />,
        },
      ],
    },
    // LLM Ensemble (TypeMatch, etc.)
    {
      id: "llm-ensemble-lower",
      header: () => <div className="text-center font-semibold">LLM Ensemble</div>,
      columns: [
        {
          accessorKey: "relevanceLLM",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Relevance" />,
          cell: ({ row }) => <HighlightCell value={row.original.relevanceLLM} />,
        },
        {
          accessorKey: "typeMatchLLM",
          header: ({ column }) => <DataTableColumnHeader column={column} title="TypeMatch" />,
          cell: ({ row }) => <HighlightCell value={row.original.typeMatchLLM} />,
        },
        {
          accessorKey: "serenHitLLM",
          header: ({ column }) => <DataTableColumnHeader column={column} title="SerenHit" />,
          cell: ({ row }) => <UnderlineCell value={row.original.serenHitLLM} />,
        },
      ],
    },
    // Expert Crowdsourced
    {
      id: "expert-crowdsourced-lower",
      header: () => <div className="text-center font-semibold">Expert Crowdsourced</div>,
      columns: [
        {
          accessorKey: "relevanceExpert",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Relevance" />,
          cell: ({ row }) => <HighlightCell value={row.original.relevanceExpert} />,
        },
        {
          accessorKey: "typeMatchExpert",
          header: ({ column }) => <DataTableColumnHeader column={column} title="TypeMatch" />,
          cell: ({ row }) => <HighlightCell value={row.original.typeMatchExpert} />,
        },
        {
          accessorKey: "serenHitExpert",
          header: ({ column }) => <DataTableColumnHeader column={column} title="SerenHit" />,
          cell: ({ row }) => <UnderlineCell value={row.original.serenHitExpert} />,
        },
      ],
    },
    // RNS Guided
    {
      id: "rns-guided-lower",
      header: () => <div className="text-center font-semibold">RNS Guided</div>,
      columns: [
        {
          accessorKey: "relevanceRNS",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Relevance" />,
          cell: ({ row }) => <HighlightCell value={row.original.relevanceRNS} />,
        },
        {
          accessorKey: "typeMatchRNS",
          header: ({ column }) => <DataTableColumnHeader column={column} title="TypeMatch" />,
          cell: ({ row }) => <HighlightCell value={row.original.typeMatchRNS} />,
        },
        {
          accessorKey: "serenHitRNS",
          header: ({ column }) => <DataTableColumnHeader column={column} title="SerenHit" />,
          cell: ({ row }) => <UnderlineCell value={row.original.serenHitRNS} />,
        },
      ],
    },
  ];

  // === Column Definitions for Table 2 ===
  const table2Columns: ColumnDef<Table2Row>[] = [
    {
      accessorKey: "model",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Model" />,
    },
    {
      id: "one-hop",
      header: () => <div className="text-center font-semibold">One-Hop</div>,
      columns: [
        {
          accessorKey: "oneHopHit",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Hit(%)" />,
          cell: ({ row }) => <HighlightCell value={row.original.oneHopHit} />,
        },
        {
          accessorKey: "oneHopF1",
          header: ({ column }) => <DataTableColumnHeader column={column} title="F1(%)" />,
          cell: ({ row }) => <UnderlineCell value={row.original.oneHopF1} />,
        },
        {
          accessorKey: "oneHopExe",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Exe.(%)" />,
          cell: ({ row }) => <span>{formatNumber(row.original.oneHopExe)}</span>,
        },
      ],
    },
    {
      id: "two-hop",
      header: () => <div className="text-center font-semibold">Two-Hop</div>,
      columns: [
        {
          accessorKey: "twoHopHit",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Hit(%)" />,
          cell: ({ row }) => <HighlightCell value={row.original.twoHopHit} />,
        },
        {
          accessorKey: "twoHopF1",
          header: ({ column }) => <DataTableColumnHeader column={column} title="F1(%)" />,
          cell: ({ row }) => <UnderlineCell value={row.original.twoHopF1} />,
        },
        {
          accessorKey: "twoHopExe",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Exe.(%)" />,
          cell: ({ row }) => <span>{formatNumber(row.original.twoHopExe)}</span>,
        },
      ],
    },
    {
      id: "multi-hop",
      header: () => <div className="text-center font-semibold">Multiple(3+)Hop</div>,
      columns: [
        {
          accessorKey: "multiHit",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Hit(%)" />,
          cell: ({ row }) => <HighlightCell value={row.original.multiHit} />,
        },
        {
          accessorKey: "multiF1",
          header: ({ column }) => <DataTableColumnHeader column={column} title="F1(%)" />,
          cell: ({ row }) => <UnderlineCell value={row.original.multiF1} />,
        },
        {
          accessorKey: "multiExe",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Exe.(%)" />,
          cell: ({ row }) => <span>{formatNumber(row.original.multiExe)}</span>,
        },
      ],
    },
    {
      id: "intersection",
      header: () => <div className="text-center font-semibold">Intersection</div>,
      columns: [
        {
          accessorKey: "interHit",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Hit(%)" />,
          cell: ({ row }) => <HighlightCell value={row.original.interHit} />,
        },
        {
          accessorKey: "interF1",
          header: ({ column }) => <DataTableColumnHeader column={column} title="F1(%)" />,
          cell: ({ row }) => <UnderlineCell value={row.original.interF1} />,
        },
        {
          accessorKey: "interExe",
          header: ({ column }) => <DataTableColumnHeader column={column} title="Exe.(%)" />,
          cell: ({ row }) => <span>{formatNumber(row.original.interExe)}</span>,
        },
      ],
    },
  ];

  return (
    <div className="py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Model Evaluation Leaderboard</h1>
        <p className="text-lg mt-4">Performance on Knowledge Retrieval and Reasoning Tasks</p>
      </div>

      {/* Table 2: Knowledge Retrieval (T1) */}
      <div className="mt-16 mx-auto w-11/12 space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Knowledge Retrieval (T1)</h2>
          <Badge variant="outline">Best scores bolded, 2nd best underlined</Badge>
        </div>
        <DataTable
          title=""
          columns={table2Columns}
          data={table2Data}
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Scatter Plot: Hit(%) across Hops
          </h3>
          <ChartContainer
            config={t1ChartConfig}
            className="h-[360px] w-full"
          >
            <ScatterChart margin={{ top: 16, right: 24, bottom: 40, left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                type="number"
                name="Model"
                tick={false}
              />
              <YAxis
                type="number"
                name="Hit(%)"
                tick={{ fontSize: 10 }}
              />
              <ChartTooltip content={<ModelScatterTooltip />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Scatter
                name="One-Hop Hit(%)"
                data={table2ChartData}
                dataKey="oneHopHit"
                fill="var(--color-oneHopHit)"
              />
              <Scatter
                name="Two-Hop Hit(%)"
                data={table2ChartData}
                dataKey="twoHopHit"
                fill="var(--color-twoHopHit)"
              />
              <Scatter
                name="Multiple(3+) Hop Hit(%)"
                data={table2ChartData}
                dataKey="multiHit"
                fill="var(--color-multiHit)"
              />
              <Scatter
                name="Intersection Hit(%)"
                data={table2ChartData}
                dataKey="interHit"
                fill="var(--color-interHit)"
              />
            </ScatterChart>
          </ChartContainer>
        </div>
      </div>

      {/* Table 3: Subgraph Reasoning & Serendipity Exploration */}
      <div className="mt-16 mx-auto w-11/12 space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">
            Subgraph Reasoning (T2, upper), Serendipity Exploration (T3, lower)
          </h2>
          <Badge variant="outline">Best scores bolded, 2nd best underlined</Badge>
        </div>
        <DataTable
          title=""
          columns={table3Columns}
          data={table3Data}
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Scatter Plot: Relevance & SerenHit
          </h3>
          <ChartContainer
            config={t3ChartConfig}
            className="h-[360px] w-full"
          >
            <ScatterChart margin={{ top: 16, right: 24, bottom: 40, left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                type="number"
                name="Model"
                tick={false}
              />
              <YAxis
                type="number"
                name="Score"
                tick={{ fontSize: 10 }}
              />
              <ChartTooltip content={<ModelScatterTooltip />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Scatter
                name="LLM Relevance"
                data={table3ChartData}
                dataKey="relevanceLLM"
                fill="var(--color-relevanceLLM)"
              />
              <Scatter
                name="Expert Relevance"
                data={table3ChartData}
                dataKey="relevanceExpert"
                fill="var(--color-relevanceExpert)"
              />
              <Scatter
                name="RNS Relevance"
                data={table3ChartData}
                dataKey="relevanceRNS"
                fill="var(--color-relevanceRNS)"
              />
              <Scatter
                name="LLM SerenHit"
                data={table3ChartData}
                dataKey="serenHitLLM"
                fill="var(--color-serenHitLLM)"
              />
              <Scatter
                name="Expert SerenHit"
                data={table3ChartData}
                dataKey="serenHitExpert"
                fill="var(--color-serenHitExpert)"
              />
              <Scatter
                name="RNS SerenHit"
                data={table3ChartData}
                dataKey="serenHitRNS"
                fill="var(--color-serenHitRNS)"
              />
            </ScatterChart>
          </ChartContainer>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-12 mx-40">
        <h2 className="text-2xl font-bold mb-4">Notes</h2>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>
            <strong>Bold</strong> indicates the best score in each column.
          </li>
          <li>
            <strong>Underline</strong> indicates the second-best score.
          </li>
          <li>
            <code>→ wo. summary</code> rows show ablation results without summary input.
          </li>
          <li>
            All metrics are averaged across multiple tasks and datasets.
          </li>
          <li>
            Higher is better for all reported metrics.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Page;