import { Button } from "./index";

//buttonコンポーネントがレンダリングされる
describe("button", () => {
  test.todo("ボタンがレンダリングされていること");
});

//childrenが表示されること
describe("button", () => {
  test.todo("登録と表示されること");
});

//variantが反映されること
describe("button", () => {
  test.todo("variant=primaryであること");
  test.todo("variant=secondaryであること");
  test.todo("variant=tertiaryであること");
  //何も指定しなければ
  test.todo("variant=tertiaryであること");
});

//typeが反映されること
describe("button", () => {
  test.todo("type=submitであること");
  //何も指定しなければ
  test.todo("type=buttonであること");
});

//variantとtypeが反映されること
describe("button", () => {
  test.todo("variant=primary, type=submitであること");
  test.todo("variant=secondary, type=submitであること");
  test.todo("variant=tertiary, type=submitであること");
  //何も指定しなければ
  test.todo("variant=tertiary, type=buttonであること");
});
