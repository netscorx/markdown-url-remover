import React from 'react';
import { ClipboardCopy, Eraser, FileText } from 'lucide-react';
import { removeUrls } from './utils/markdownUtils';

function App() {
  const [input, setInput] = React.useState<string>(
    `# Example Markdown with URLs

Check out this [interesting article](https://example.com/article) about markdown!

Here's a bare URL: https://example.com/bare-url

And a [reference-style link][ref] to another page.

![Image of nature](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05)

[ref]: https://example.com/reference`
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(removeUrls(input));
      // We could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Markdown URL Remover</h1>
          <p className="text-gray-600">Clean your Markdown content by removing URLs while preserving text and formatting</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-700">Input</h2>
              </div>
              <button
                onClick={handleClear}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Eraser className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-[500px] p-4 rounded-lg border border-gray-200 bg-white font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              placeholder="Paste your Markdown content here..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-700">Output</h2>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <ClipboardCopy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
            <textarea
              value={removeUrls(input)}
              readOnly
              className="w-full h-[500px] p-4 rounded-lg border border-gray-200 bg-gray-50 font-mono text-sm resize-none"
              placeholder="Cleaned Markdown will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
