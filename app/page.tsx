export default function Home() {
  return (
    <div className="bg-green-500 w-full h-screen">
      <div className="bg-amber-400 h-1/2 w-full flex items-center justify-center">
        <div>
        <h1 className="text-6xl font-bold">SerenQA</h1>
        <p className="text-lg">This is a Next.js project with Tailwind CSS</p>
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
