// Jest setup file
import '@testing-library/jest-dom';

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock Three.js
jest.mock('three', () => ({
  Scene: jest.fn(),
  PerspectiveCamera: jest.fn(),
  WebGLRenderer: jest.fn().mockImplementation(() => ({
    setPixelRatio: jest.fn(),
    setSize: jest.fn(),
    render: jest.fn(),
    shadowMap: {}
  })),
  Color: jest.fn(),
  AmbientLight: jest.fn(),
  DirectionalLight: jest.fn(),
  BufferGeometry: jest.fn(),
  PointsMaterial: jest.fn(),
  Points: jest.fn(),
  BoxGeometry: jest.fn(),
  MeshStandardMaterial: jest.fn(),
  Mesh: jest.fn(),
  TorusGeometry: jest.fn(),
  DodecahedronGeometry: jest.fn(),
  Float32Array: global.Float32Array,
  BufferAttribute: jest.fn(),
}));
