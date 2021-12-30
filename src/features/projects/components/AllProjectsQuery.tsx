import {gql, useQuery} from '@apollo/client';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectPossibleProjectsLastFetched} from '../redux/selectors';
import {ACTION_RECEIVE_ALL_PROJECTS} from '../redux/reducer';
import {ProjectInput} from '../../../../types/graphql/typeDefs';

function projectToOption(project: ProjectInput) {
    return {title: project.name, value: project.title};
}

function fetchIsCurrent(lastFetched: number | null) {
    return (Date.now() - (lastFetched ?? 0)) < 1000;
}
export function AllProjectsQuery() {
  const ALL_PROJECTS_QUERY   =
        gql`
            query AllProjects {
                allProjects {
                    name
                }
            }
        `;
    const {data: query = {}} = useQuery(ALL_PROJECTS_QUERY);

    const dispatch    = useDispatch();
    const lastFetched = useSelector(selectPossibleProjectsLastFetched)
    useEffect(() => {
        const options = query.allProjects ? query.allProjects.map(projectToOption) : [];
        if (fetchIsCurrent(lastFetched) && !options.length) {
            return;
        }
        dispatch({type: ACTION_RECEIVE_ALL_PROJECTS, payload: options})
    }, [query.allProjects]);

    return !fetchIsCurrent(lastFetched) ? <>Loading...</> : null;
}