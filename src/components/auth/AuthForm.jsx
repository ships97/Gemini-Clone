import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { showToast } from '../../features/ui/uiSlice';
import OtpInput from './OtpInput';
import { fetchCountries } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  country: z.string().nonempty('Select a country'),
  phone: z.string().min(7, 'Phone number must be at least 7 digits').max(17, 'Phone number cannot exceed 17 digits'),
});

const AuthForm = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Remove any non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    // Limit to maximum 17 digits
    const limitedDigits = digitsOnly.slice(0, 17);
    setValue('phone', limitedDigits);
  };

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(loginStart());
    setTimeout(() => {
      setLoading(false);
      const generatedOtp = '123456';
      setSentOtp(generatedOtp);
      setStep(2);
      dispatch(showToast('OTP sent!'));
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === sentOtp) {
        dispatch(loginSuccess({
          phone: watch('phone'),
          country: watch('country'),
        }));
        dispatch(showToast({ message: 'Login successful!', type: 'success' }));
        navigate('/dashboard');
      } else {
        dispatch(loginFailure('Invalid OTP'));
        dispatch(showToast({ message: 'Invalid OTP', type: 'error' }));
      }
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-full sm:max-w-[480px] border border-gray-200 dark:border-gray-700 transition-all mx-2 overflow-x-hidden">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400 tracking-tight">Sign In / Sign Up</h2>
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Country</label>
            <select {...register('country')} className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 p-2 rounded-lg focus:ring-2 focus:ring-blue-400">
              <option value="">Select</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.dial_code})
                </option>
              ))}
            </select>
            {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
          </div>
          <div className="mb-5">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Phone</label>
            <input 
              {...register('phone')} 
              className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 p-2 rounded-lg focus:ring-2 focus:ring-blue-400" 
              type='tel'
              inputMode='numeric'
              pattern='[0-9]*'
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
              maxLength="17"
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 rounded-lg font-semibold shadow transition-all duration-200" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200 text-center">Enter OTP</label>
            <OtpInput value={otp} onChange={setOtp} length={6} />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 rounded-lg font-semibold shadow transition-all duration-200" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthForm;