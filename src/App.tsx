import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

const papiToJapanese: Record<string, string> = {
  'ぱぱ': 'あ', 'ぱぴ': 'い', 'ぱぷ': 'う', 'ぱぺ': 'え', 'ぱぽ': 'お',
  'ぴぱ': 'か', 'ぴぴ': 'き', 'ぴぷ': 'く', 'ぴぺ': 'け', 'ぴぽ': 'こ',
  'ぷぱ': 'さ', 'ぷぴ': 'し', 'ぷぷ': 'す', 'ぷぺ': 'せ', 'ぷぽ': 'そ',
  'ぺぱ': 'た', 'ぺぴ': 'ち', 'ぺぷ': 'つ', 'ぺぺ': 'て', 'ぺぽ': 'と',
  'ぽぱ': 'な', 'ぽぴ': 'に', 'ぽぷ': 'ぬ', 'ぽぺ': 'ね', 'ぽぽ': 'の',
  'ぱぱぱ': 'は', 'ぱぱぴ': 'ひ', 'ぱぱぷ': 'ふ', 'ぱぱぺ': 'へ', 'ぱぱぽ': 'ほ',
  'ぴぱぱ': 'ま', 'ぴぱぴ': 'み', 'ぴぱぷ': 'む', 'ぴぱぺ': 'め', 'ぴぱぽ': 'も',
  'ぷぱぱ': 'や', 'ぷぱぴ': 'ゐ', 'ぷぱぷ': 'ゆ', 'ぷぱぺ': 'ゑ', 'ぷぱぽ': 'よ',
  'ぺぱぱ': 'ら', 'ぺぱぴ': 'り', 'ぺぱぷ': 'る', 'ぺぱぺ': 'れ', 'ぺぱぽ': 'ろ',
  'ぽぱぱ': 'わ', 'ぽぱぽ': 'を', 'ぱぽん': 'ん',
  'ぴぴぱ': 'が', 'ぴぴぴ': 'ぎ', 'ぴぴぷ': 'ぐ', 'ぴぴぺ': 'げ', 'ぴぴぽ': 'ご',
  'ぴぷぱ': 'ざ', 'ぴぷぴ': 'じ', 'ぴぷぷ': 'ず', 'ぴぷぺ': 'ぜ', 'ぴぷぽ': 'ぞ',
  'ぴぺぱ': 'だ', 'ぴぺぴ': 'ぢ', 'ぴぺぷ': 'づ', 'ぴぺぺ': 'で', 'ぴぺぽ': 'ど',
  'ぴぽぱ': 'ば', 'ぴぽぴ': 'び', 'ぴぽぷ': 'ぶ', 'ぴぽぺ': 'べ', 'ぴぽぽ': 'ぼ',
  'ぺぷぅ': 'っ',
  'ぷぱぁ': 'ゃ', 'ぷぷぅ': 'ゅ', 'ぷぽぉ': 'ょ',
  'ぽぺ': 'ね', 'ぷぺ': 'せ'
};

// Match Japanese punctuation and emojis
const nonWordPattern = /([ー、〜。！？「」]|[\p{Emoji}\u{FE0F}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}])/u;

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convertPapiToJapanese = (text: string) => {
    let result = '';
    const segments = text.split(nonWordPattern);
    
    for (const segment of segments) {
      if (segment.match(nonWordPattern)) {
        result += segment;
        continue;
      }
      
      const words = segment.trim().split(' ').filter(word => word.length > 0);
      result += words.map(word => papiToJapanese[word] || word).join('');
    }
    
    setOutput(result);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    convertPapiToJapanese(newInput);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            パピ語変換
          </h1>
          <p className="text-gray-600 text-center mb-6">
            パピ語を日本語に変換します
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
                パピ語入力
              </label>
              <textarea
                id="input"
                value={input}
                onChange={handleInputChange}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="例：ぽぱ ぴぱ ぷぱぽ ぴぷ ぷぴ ぺぺ ぽぺ！(なかよくしてね！)"
              />
            </div>

            <div className="flex justify-center">
              <ArrowDownUp className="text-blue-500 h-6 w-6" />
            </div>

            <div>
              <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-2">
                日本語出力
              </label>
              <textarea
                id="output"
                value={output}
                readOnly
                className="w-full h-32 p-3 bg-gray-50 border border-gray-300 rounded-lg resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
