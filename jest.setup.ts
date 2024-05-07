import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'text-encoding';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

module.exports = {
  preset: 'next/jest',
};