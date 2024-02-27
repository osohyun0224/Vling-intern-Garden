import React from 'react';
import ProposeAdButton from '../packages/shared-ui/src/components/atoms/ModalButton/ProposeAdButton';

export default {
  title: 'Components/ProposeAdButton',
  component: ProposeAdButton,
  argTypes: {
    buttonText: { control: 'text' },
    disabled: { control: 'boolean' },
    buttonColor: { control: 'color' },
    textColor: { control: 'color' }
  },
};

const Template = (args) => <ProposeAdButton {...args} />;

export const Default = Template.bind({});

// 비활성화 상태 예시
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const CustomTextColor = Template.bind({});
CustomTextColor.args = {
  textColor: '#000000', 
};

export const CustomButtonColor = Template.bind({});
CustomButtonColor.args = {
  buttonColor: '#00FF00',
};
