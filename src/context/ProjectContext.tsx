import React, { createContext, useContext, useState } from 'react';

type Project = { id: string; name: string; blocks: any[] };
type ProjectContextType = {
  projects: Project[];
  addProject: (name: string) => void;
};

const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  addProject: () => {}
});

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const addProject = (name: string) => {
    setProjects(ps => [...ps, { id: String(ps.length + 1), name, blocks: [] }]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);
