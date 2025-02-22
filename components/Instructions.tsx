export const Instructions = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-bold mb-6">Instructions for Expertise Evaluators</h3>

      <div className="space-y-8">
        <div>
          <h4 className="text-xl font-semibold mb-3">How the Questions are Organized</h4>
          <p className="text-gray-700">
            The questions are grouped into <strong>14 batches</strong> based on drug categories.
            Each batch&apos;s categories are listed below. Please select the batches that best match your expertise or interest for evaluation.
            Additionally, each question is labeled with its category in the format: <span className="text-gray-600">[Category - Category:Subcategory]</span>, displayed after the text question.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3">How the Default Ranks are Generated</h4>
          <p className="text-gray-700">
            To evaluate the serendipity of each answer within a question, we utilize three <strong>Large Language Models (LLMs)</strong>: GPT-4O,
            GPT-4O-mini, and Claude-3.5-Sonnet,
            following a specific <a href="https://cwru-db-group.github.io/serenQA/prompt.txt" target="_blank" className="text-blue-600">prompt</a>.
            We then aggregate the LLM rankings to generate the default ranks, which are provided as the initial rankings for your evaluation.
            The <strong>rank 1</strong> indicates the most serendipitous answer for the question.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3">Your Role</h4>
          <p className="text-gray-700 mb-4">Please complete your evaluation following these steps:</p>

          <div className="space-y-4 ml-4">
            <div>
              <p className="font-semibold">1. Review the Question and Rankings:</p>
              <ul className="list-disc ml-8 space-y-1 text-gray-700">
                <li>Carefully review the <strong>LLM ranks</strong> for each question in your selected batch.</li>
                <li>Assess whether you agree with the provided rank.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">2. Provide Your Input:</p>
              <ul className="list-disc ml-8 space-y-1 text-gray-700">
                <li>If you agree with the ranks, keep them <strong>unchanged</strong>.</li>
                <li>If you find any default ranking disagreeable, please <strong>modify</strong> it to better capture the serendipity based on your expertise.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">3. Confidence Rating:</p>
              <ul className="list-disc ml-8 space-y-1 text-gray-700">
                <li>For each batch, rate your confidence (1–5) in the responses, where <strong>1</strong> indicates the lowest confidence and <strong>5</strong> the highest.</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3">Important Notes</h4>
          <ul className="list-decimal ml-5 space-y-2 text-gray-700">
            <li>To make sure your responses are recorded, please log in before beginning. Your login status is displayed in the side bar.</li>
            <li>If you refresh or reload the page, or return to evaluate more batches, please log in again using the same email.</li>
            <li>Batches submitted successfully will be marked with a {'"✓"'}.</li>
            <li>If you submit a batch multiple times, only the last submission will be recorded.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}