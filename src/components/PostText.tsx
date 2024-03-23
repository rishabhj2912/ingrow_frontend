import { useState } from 'react';

export default function PostText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderPostText = () => {
    const truncatedText = text.replaceAll('*', '').split('\n\n');

    return (
      <div>
        <div
          className={`${
            !expanded && (text.length > 300 || truncatedText.length > 3)
              ? 'h-14 overflow-hidden'
              : 'h-full'
          }`}
        >
          {(expanded ? truncatedText : truncatedText.slice(0, 3)).map(
            (item) => (
              <p key={item}>{item}</p>
            )
          )}
        </div>
        {!expanded && (text.length > 300 || truncatedText.length > 3) && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleExpanded();
            }}
            className='inline-block text-blue-primary mt-1 font-medium relative'
          >
            Read More
          </button>
        )}
      </div>
    );
  };

  return <div>{renderPostText()}</div>;
}
