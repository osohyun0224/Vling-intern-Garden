// AdCategory.stories.js

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

export const LargeCategory = Template.bind({});
LargeCategory.args = {
  children: '대형 카테고리',
  style: { fontSize: '16px', padding: '10px 15px' }, 
};

export const ColorfulCategory = Template.bind({});
ColorfulCategory.args = {
  children: '색상 있는 카테고리',
  style: { backgroundColor: '#FFEB3B', color: '#1A237E' },
};
