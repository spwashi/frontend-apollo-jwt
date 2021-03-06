import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Page} from '../../components/page/Page';
import {Navigation} from '../../components/navigation/Navigation';
import {mainNavigation} from '../../../../app/routes/mainNavigation';

export default {
    title:     'Demo/Layout/Components/Navigation',
    component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Navigation items={mainNavigation}/>;

export const NavBar = Template.bind({});