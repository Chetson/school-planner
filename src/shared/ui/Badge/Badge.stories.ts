import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './Badge';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/Badge',
  component: Badge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    color: {
      description: 'Цвет бейджа',
      options: ['mint', 'orange', 'pink', 'beige', 'yellow'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Учитель'
  },
};

export const MintBadge: Story = {
  args: {
    ...Default.args,
    color: 'mint'
  },
};

export const OrangeBadge: Story = {
  args: {
    children: 'Админ',
    color: 'orange'
  },
};

export const PinkBadge: Story = {
  args: {
    children: 'Ученик',
    color: 'pink'
  },
};

export const BeigeBadge: Story = {
  args: {
    children: 'Куратор',
    color: 'beige'
  },
};

export const YellowBadge: Story = {
  args: {
    children: 'Родитель',
    color: 'yellow'
  },
};