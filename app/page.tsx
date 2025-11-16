"use client";

import React, { useState } from "react";
import Link from "next/link";

const citationText = `@inproceedings{wang2026assessing,
  title={Assessing LLMs for Serendipity Discovery in Knowledge Graphs: A Case for Drug Repurposing},
  author={Wang, Mengying and Ma, Chenhui and Jiao, Ao and Liang, Tuo and Lu, Pengjun and Hegde, Shrinidhi and Yin, Yu and Gurkan-Cavusoglu, Evren and Wu, Yinghui},
  booktitle={The Fortieth AAAI Conference on Artificial Intelligence},
  year={2026}
}`;

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy citation", e);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="h-1/2 w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center max-w-3xl">
            <h1 className="text-6xl font-bold">SerenQA</h1>
            <p className="text-lg mt-2">
              Assessing large language models for serendipitous discovery in knowledge graphs,
              with a focus on drug repurposing.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Link href="SerenQA.pdf" target="_blank" rel="noopener noreferrer"
                  className="bg-blue-500 text-white py-2 px-4 rounded">
              Paper(Full Version)
            </Link>
            <Link href="https://github.com/CWRU-DB-Group/DrugKG" className="bg-blue-500 text-white py-2 px-4 rounded">GitHub</Link>
            <Link href="https://drive.google.com/drive/folders/11S_h-izGqnsN_jQkwxXc4D_2NnyzU5H5" className="bg-blue-500 text-white py-2 px-4 rounded">Dataset</Link>
            <Link href="/leaderboard" className="bg-blue-500 text-white py-2 px-4 rounded">Leaderboard</Link>
            <Link href="/questionnaire" className="bg-blue-500 text-white py-2 px-4 rounded">Questionnaire</Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Abstract</h2>
            <p className="text-sm leading-relaxed">
              Large Language Models (LLMs) have greatly advanced knowledge graph question answering (KGQA),
              yet existing systems are typically optimized for returning highly relevant but predictable answers.
              A missing yet desired capacity is to exploit LLMs to suggest surprise and novel (&quot;serendipitious&quot;)
              answers. In this paper, we formally define the serendipity-aware KGQA task and propose the SerenQA
              framework to evaluate LLMs&apos; ability to uncover unexpected insights in scientific KGQA tasks. SerenQA
              includes a rigorous serendipity metric based on relevance, novelty, and surprise, along with an
              expert-annotated benchmark derived from the Clinical Knowledge Graph, focused on drug repurposing.
              Additionally, it features a structured evaluation pipeline encompassing three subtasks: knowledge
              retrieval, subgraph reasoning, and serendipity exploration. Our experiments reveal that while
              state-of-the-art LLMs perform well on retrieval, they still struggle to identify genuinely surprising
              and valuable discoveries, underscoring a significant room for future improvements. Our curated resources
              and extended version are released at:
              {" "}
              <a
                href="https://cwru-db-group.github.io/serenQA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                https://cwru-db-group.github.io/serenQA
              </a>
              .
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold">Citation</h2>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto whitespace-pre">
{citationText}
            </pre>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow flex items-center justify-center">
          <div className="w-full">
            <img
              src="framework.png"
              alt="SerenQA framework / serendipity-aware KGQA pipeline"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
