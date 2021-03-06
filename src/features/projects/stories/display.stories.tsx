import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {mainDecorator} from '../../../stories/_util/decorators';
import {Features} from '../../index';
import {ProjectDisplayForm} from '../components/display';


export default {
    title:      'Admin/Forms/Datatypes/Project/DisplayProject',
    component:  ProjectDisplayForm,
    decorators: [
        (Story) => {
            return (
                <React.Fragment>
                    <Features list={['users', 'tags', 'concepts']}/>
                    <Story/>
                </React.Fragment>
            );
        },
        mainDecorator,
    ],
} as ComponentMeta<typeof ProjectDisplayForm>;

const Template: ComponentStory<typeof ProjectDisplayForm> = (args) => <ProjectDisplayForm {...args}/>;

export const DisplayProject = Template.bind({});
DisplayProject.args         = {};
