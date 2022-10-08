import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      data-testid="btnCounter"
      onClick={() => setCount((oldCount) => oldCount + 1)}
      type="button"
    >
      count is {count}
    </button>
  );
}

export default Counter;
