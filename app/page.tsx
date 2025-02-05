import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="h-1/2 w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div>
            <h1 className="text-6xl font-bold">SerenQA</h1>
            <p className="text-lg">Add description here</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded">Paper</Link>
            <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded">Code</Link>
            <Link href="/leaderboard" className="bg-blue-500 text-white py-2 px-4 rounded">Leaderboard</Link>
            <Link href="/questionnaire" className="bg-blue-500 text-white py-2 px-4 rounded">Questionnaire</Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-white p-4">
          <h2 className="text-2xl font-semibold">Column 1</h2>
          <p>Content for the first column.</p>
        </div>
        <div className="bg-white p-4">
          <h2 className="text-2xl font-semibold">Column 2</h2>
          <p>Content for the second column.</p>
        </div>
      </div>
    </div>
  );
}
