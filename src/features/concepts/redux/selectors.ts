import {IConcept} from '../../../app/models/concept/models';
import {ConceptOption} from './types';
import {RootState} from '../../../redux/rootState';

function conceptToOption(concept: IConcept): ConceptOption {
    return {
        title:   concept.title,
        value:   concept.title,
        payload: concept,
    };
}

export const selectConceptFeature              = (state: RootState) => state.features.concept;
export const selectPossibleConceptsList        = (state: RootState) => selectConceptFeature(state).data.concepts.list?.map(conceptToOption);
export const selectPossibleConceptsLastFetched = (state: RootState) => selectConceptFeature(state).data.concepts.lastFetched;
export const selectConceptStateKey             = (state: RootState) => selectConceptFeature(state).state.key;