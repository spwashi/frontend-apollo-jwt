import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {mainDecorator} from '../../decorators';
import {Features} from '../../../features';
import {ConceptDisplayForm} from '../../../features/concepts/components/display';


export default {
    title:      'Forms/Concept/DisplayConcept',
    component:  ConceptDisplayForm,
    decorators: [
        (Story) => {
            return (
                <React.Fragment>
                    <Features list={['users', 'concepts']}/>
                    <Story/>
                </React.Fragment>
            );
        },
        mainDecorator,
    ],
} as ComponentMeta<typeof ConceptDisplayForm>;

const Template: ComponentStory<typeof ConceptDisplayForm> = (args) => <ConceptDisplayForm {...args}/>;

export const DisplayConcept = Template.bind({});
DisplayConcept.args         = {};
