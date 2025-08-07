import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || "https://your-backend.onrender.com";

export default function QueryForm() {
  const [url, setUrl] = useState('');
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setReply(null); setErr('');
    setLoading(true);
    try {
      const body = { documents: [url], questions: [question] };
      const res = await axios.post(
        `${API_BASE}/api/v1/hackrx/run`,
        body,
        {
          headers: {
            "Authorization": "Bearer YOUR_JWT_TOKEN",  // Replace/remove as needed
            "Content-Type": "application/json"
          }
        }
      );
      setReply(res.data);
    } catch (e) {
      setErr(e.response?.data?.detail || e.message);
    }
    setLoading(false);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Document URL</label>
        <input
          type="url"
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={url}
          required
          onChange={e => setUrl(e.target.value)}
          placeholder="https://my-bucket.com/policy.pdf"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Your Question</label>
        <input
          type="text"
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={question}
          required
          onChange={e => setQuestion(e.target.value)}
          placeholder="Does this policy cover knee surgery?"
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow disabled:opacity-60"
        >
          {loading ? "Querying…" : "Ask"}
        </button>
        <button
          type="button"
          disabled={loading}
          className="px-4 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-600"
          onClick={() => { setUrl(''); setQuestion(''); setReply(null); setErr(''); }}
        >
          Clear
        </button>
      </div>
      {err && <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">{err}</div>}
      {reply && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Response:</h4>
          <pre className="p-4 rounded bg-gray-100 text-xs shadow-inner overflow-auto">{JSON.stringify(reply, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}