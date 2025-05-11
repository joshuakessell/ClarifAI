import { QueryClient, QueryFunction } from "@tanstack/react-query";

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  stack?: string;
}

export class ApiError extends Error {
  public status: number;
  public errors?: Record<string, string[]>;
  
  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
    
    // Set prototype explicitly as TypeScript doesn't do this by default for custom errors
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

async function processErrorResponse(res: Response): Promise<never> {
  let errorData: ApiErrorResponse = {
    message: res.statusText
  };
  
  try {
    // Try to parse the error response as JSON
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      errorData = await res.json();
    } else {
      // If not JSON, get the plain text
      errorData.message = await res.text() || res.statusText;
    }
  } catch (e) {
    // If we can't parse the response, use status text
    console.warn('Could not parse error response:', e);
  }
  
  throw new ApiError(
    res.status,
    errorData.message || `HTTP error ${res.status}`,
    errorData.errors
  );
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });
    
    if (!res.ok) {
      await processErrorResponse(res);
    }
    
    return res;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors (e.g., no internet connection)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(0, 'Network error: Could not connect to the server. Please check your internet connection.', {});
    }
    
    // Other unknown errors
    throw new ApiError(500, error instanceof Error ? error.message : 'Unknown error occurred', {});
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      if (!res.ok) {
        await processErrorResponse(res);
      }

      // For empty responses (like 204 No Content)
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await res.json();
      } else {
        // Handle non-JSON responses appropriately
        return await res.text() || null;
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError(0, 'Network error: Could not connect to the server. Please check your internet connection.', {});
      }
      
      // Other unknown errors
      throw new ApiError(500, error instanceof Error ? error.message : 'Unknown error occurred', {});
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
