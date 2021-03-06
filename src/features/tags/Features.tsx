import {useSelector} from 'react-redux';
import {Feature} from '../_util';
import React from 'react';
import {selectPossibleTagsLastFetched, selectPossibleTagsList} from './redux/selectors';
import {AllTagsQuery} from './components/query/all';

function TagDisplayFeature() {
    const lastFetched = useSelector(selectPossibleTagsLastFetched)
    const list        = useSelector(selectPossibleTagsList)
    return <Feature name="tags.display" enabled={lastFetched ? !!list.length : false}/>;
}
export function TagFeatures() {
    return (
        <Feature name="tags">
            <TagDisplayFeature/>
        </Feature>
    )
}

TagFeatures.dependencies = [AllTagsQuery]