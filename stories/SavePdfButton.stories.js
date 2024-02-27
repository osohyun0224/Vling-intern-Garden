import React from 'react';
import SavePdfButton from '../packages/shared-ui/src/components/atoms/ModalButton/SavePdfButton'

export default {
  title: 'Components/SavePdfButton',
  component: SavePdfButton,
  argTypes: {
    buttonText: { control: 'text' },
    disabled: { control: 'boolean' },
    buttonColor: { control: 'color' },
    textColor: { control: 'color' },
    onClick: { action: 'clicked' }, // 스토리북에서 액션 로거를 통해 클릭 이벤트 로깅
  },
};

const Template = (args) => <SavePdfButton {...args} />;

export const Default = Template.bind({});

export const CustomColor = Template.bind({});
CustomColor.args = {
  buttonColor: '#0000FF', // 사용자 지정 버튼 색상 (파란색)
  textColor: '#FFFFFF', // 사용자 지정 텍스트 색상 (흰색)
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
