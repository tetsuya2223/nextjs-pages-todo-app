// import { Button } from "./index";

describe("Buttonコンポーネント", () => {
  test.todo("Buttonコンポーネントがレンダリングされていること");
});

describe("Buttonメッセージ", () => {
  describe("childrenが「登録」の場合", () => {
    test.todo("登録と表示されること");
  });
});

describe("buttonColor,buttonType", () => {
  describe("variant=primary, type=submitである場合", () => {
    test.todo("classNameがprimary、属性がsubmitであること");
  });
  describe("variant=secondary, type=submitである場合", () => {
    test.todo("classNameがsecondary、属性がsubmitであること");
  });
  describe("variant=tertiary, type=submitである場合", () => {
    test.todo("classNameがtertiary、属性がsubmitであること");
  });
  describe("variant=primary, typeを指定しない場合", () => {
    test.todo("classNameがprimary、属性がbuttonであること");
  });
  describe("variantを指定しない、typeを指定しない場合", () => {
    test.todo("classNameがtertiary、属性がbuttonであること");
  });
});
