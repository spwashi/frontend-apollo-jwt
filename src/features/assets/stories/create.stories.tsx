import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {mainDecorator} from '../../../stories/_util/decorators';
import {CreateConceptForm} from '../../concepts/behaviors/create';
import {Features} from '../../index';
import {UploadFileForm} from '../behaviors/upload/components/form/Form';

export default {
    title:      'Admin/Forms/Datatypes/File/UploadFile',
    component:  CreateConceptForm,
    decorators: [
        (Story) =>
            <React.Fragment>
                <Features list={['users', 'files']}/>
                <Story/>
            </React.Fragment>,
        mainDecorator,
    ],
} as ComponentMeta<typeof CreateConceptForm>;

const Template: ComponentStory<typeof CreateConceptForm> = (args) => <UploadFileForm {...args}/>;

export const UploadFile = Template.bind({});
UploadFile.args         = {};