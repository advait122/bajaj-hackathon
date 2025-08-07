import QueryForm from "./components/QueryForm";
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto shadow-lg rounded-xl bg-white p-8 mt-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-2 text-center">LLM Query-Retrieval System <span role="img" aria-label="spark">✨</span></h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Paste a PDF/DOCX URL and ask a natural language question. 
        </p>
        <QueryForm />
        <footer className="pt-8 text-xs text-gray-400 text-center">
          Built for your hackathon 🚀
        </footer>
      </div>
    </div>
  );
}