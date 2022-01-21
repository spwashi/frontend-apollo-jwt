import React, {useState} from 'react';
import {FormContextProvider} from '../../../../components/form/context/FormContext';
import {Concept} from '../graphql/one';
import {ConceptSelect} from '../Select';
import {FeatureRequirement} from '../../../_util';

export function ConceptDisplayForm({}) {
    const [state, setState] = useState<any | null>();
    const title             = state?.data?.concept?.title;
    return (
        <FeatureRequirement name="concepts.display">
            <section>
                <header>Concept Display</header>

                <FormContextProvider onSubmit={setState}>
                    <ConceptSelect formKey="concept"/>
                </FormContextProvider>

                {title && <Concept title={title}/>}
            </section>
        </FeatureRequirement>
    )
}