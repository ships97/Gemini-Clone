import React, { useRef } from 'react';

const OtpInput = ({ value, onChange, length = 6 }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/\D/, '');
    const newValue = value.substring(0, i) + val + value.substring(i + 1);
    onChange(newValue);
    if (val && i < length - 1) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const inputs = [];
  for (let i = 0; i < length; i++) {
    inputs.push(
      <input
        key={i}
        type="text"
        maxLength={1}
        className="w-12 h-14 text-center border-2 border-gray-300 dark:border-gray-600 rounded-xl mx-1 text-2xl font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white dark:bg-gray-900 shadow-sm transition-all outline-none"
        value={value[i] || ''}
        onChange={e => handleChange(e, i)}
        onKeyDown={e => handleKeyDown(e, i)}
        ref={el => (inputsRef.current[i] = el)}
        tabIndex={i + 1}
        aria-label={`OTP digit ${i + 1}`}
        autoFocus={i === 0}
      />
    );
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center gap-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl shadow-inner">
        {inputs}
      </div>
    </div>
  );
};

export default OtpInput; 