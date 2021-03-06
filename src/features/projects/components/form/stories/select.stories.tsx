import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {mainDecorator} from '../../../../../stories/_util/decorators';
import {StandardForm} from '../../../../../components/form/Form';
import {ProjectSelect} from '../Select';
import {AllProjectsQuery} from '../../query/all/all';

export default {
    title:      'Demo/Layout/Forms/Components/ProjectSelect',
    component:  ProjectSelect,
    decorators: [(Story) => <StandardForm><AllProjectsQuery/> <Story/> </StandardForm>, mainDecorator],
} as ComponentMeta<typeof ProjectSelect>;

export const Input = ({args: {formKey: 'project'}})