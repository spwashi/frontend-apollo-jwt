import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {mainDecorator} from '../../decorators';
import {RestrictedEditConceptForm} from '../../../features/concepts/behaviors/edit';
import {Features} from '../../../features';

export default {
    title:      'Forms/DataTypes/Concept/EditConcept',
    component:  RestrictedEditConceptForm,
    decorators: [
        (Story) =>
            <React.Fragment>
                <Features list={['users', 'concepts']}/>
                <Story/>
            </React.Fragment>,
        mainDecorator,
    ],
} as ComponentMeta<typeof RestrictedEditConceptForm>;

const Template: ComponentStory<typeof RestrictedEditConceptForm> = (args) => <RestrictedEditConceptForm {...args}/>;

export const EditConcept = Template.bind({});
EditConcept.args         = {};