import React from 'react';
import AdCategory from '../packages/shared-ui/src/components/atoms/AdCategory/AdCategory';

export default {
  title: 'Components/AdCategory',
  component: AdCategory,
};

const Template = (args) => <AdCategory {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '카테고리명',
};

export const CustomCategory = Template.bind({});
CustomCategory.args = {
  children: '커스텀 카테고리',
};
