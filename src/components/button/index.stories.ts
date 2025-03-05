import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  // Storybook の機能やアドオンの振る舞いをコントロールする
  parameters: {
    layout: "centered",
  },
  //コンポーネントが受け取る引数（Props）を指定する
  argTypes: {
    onClick: { action: "onClick" },
    variant: {
      control: "select",
      description: "buttonのvariant",
      options: ["primary", "secondary", "tertiary"],
    },
    type: {
      control: "select",
      description: "buttonのtype",
      options: ["button", "submit"],
    },
    children: { control: "text", description: "buttonのテキスト" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    type: "button",
  },
};
