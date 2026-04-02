import { Router, Request, Response } from 'express';
import router from './index';

// Mock express response
const mockJson = jest.fn();
const mockStatus = jest.fn().mockReturnThis();
const mockRes = {
  json: mockJson,
  status: mockStatus,
} as unknown as Response;

const mockReq = {} as Request;

describe('Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(router).toBeDefined();
    expect(typeof router).toBe('function');
  });

  it('should have a /hello route', () => {
    // Get the stack from the router
    const stack = (router as any).stack;
    expect(stack).toBeDefined();
    expect(stack.length).toBeGreaterThan(0);
  });
});

describe('GET /hello', () => {
  it('should return Hello, World! message', () => {
    // Find the route handler for /hello
    const stack = (router as any).stack;
    const helloRoute = stack.find(
      (layer: any) => layer.route && layer.route.path === '/hello'
    );

    expect(helloRoute).toBeDefined();

    // Execute the route handler
    const handler = helloRoute.route.stack[0].handle;
    handler(mockReq, mockRes);

    expect(mockJson).toHaveBeenCalledWith({ message: 'Hello, World!' });
  });
});
