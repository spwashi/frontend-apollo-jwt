import {useActiveProject} from '../context/hooks/useActiveOne';
import React from 'react';
import {IProject} from '../../../../../../app/models/project/models';

interface ProjectParams {project: IProject;}

export function Project({project}: ProjectParams) {
    const {title, domain, name, description, id} = project as IProject;
    return (
        <>
            <details open>
                <summary>{title}</summary>
                <section>
                    <div>{title}</div>
                    <div>{domain}</div>
                    <div>{description}</div>
                </section>
            </details>
        </>
    )
}
export function ActiveProject() {
    const project = useActiveProject();
    if (!project) return null;
    return <Project project={project}/>;
}