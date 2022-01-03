import React, {useMemo, useState} from 'react';
import {ProjectContext as ProjectContext} from './context';
import {IProject} from '../../../../../../models/project/models/IProject';

export function ProjectContextProvider({children}: { children: any }) {
    const [project, setProject] = useState<IProject | null>(null);
    const context               =
              useMemo(() => ({
                  project: project ?? null,
                  setProject,
              }), [project]);

    return (
        <ProjectContext.Provider value={context}>
            {children}
        </ProjectContext.Provider>
    )
}