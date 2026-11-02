import { createContext, useState, useContext, useEffect } from 'react';

// Global project data fetched from json-server (http://localhost:3001/projects)
const ProjectsContext = createContext();

// Custom hook for using projects
export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch once on mount (empty dependency array)
  useEffect(() => {
    // Set by the cleanup; stops a finished request from updating an unmounted provider
    let isCancelled = false;

    // The effect callback itself can't be async, so the async work lives in an inner function
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/projects');
        // fetch does not throw on 404/500, so throw ourselves and let catch handle it
        if (!response.ok) {
          throw new Error(`HTTP error, status ${response.status}`);
        }
        const data = await response.json();
        if (!isCancelled) {
          setProjects(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchProjects();

    // Cleanup: runs on unmount (and in StrictMode's dev double-mount)
    return () => {
      isCancelled = true;
    };
  }, []);

  const value = { projects, loading, error };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
