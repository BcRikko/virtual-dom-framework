import { View, h } from "./view";
import { App } from "./app";
import { ActionTree } from "./action";

type State = typeof state;
type Actions = typeof actions;

const state = {
  tasks: ["virtual dom", "完全に理解する"],
  form: {
    input: "",
    hasError: false
  }
};

const actions: ActionTree<State> = {
  validate: (state, input: string) => {
    if (!input || input.length < 3 || input.length > 20) {
      state.form.hasError = true;
    } else {
      state.form.hasError = false;
    }

    return !state.form.hasError;
  },
  createTask: (state, title: string) => {
    state.tasks.push(title);
    state.form.input = "";
  },
  removeTask: (state, index: number) => {
    state.tasks.splice(index, 1);
  }
};

const view: View<State, Actions> = (state, actions) => {
  return h(
    "div",
    { style: "padding: 20px;" },
    h("h1", { class: "title" }, "仮想DOM完全に理解したTODOアプリ"),
    h(
      "div",
      { class: "field" },
      h("label", { class: "label" }, "タスクタイトル"),
      h("input", {
        type: "text",
        class: "input",
        style: "width: 200px;",
        value: state.form.input,
        oninput: (ev: Event) => {
          const target = ev.target as HTMLInputElement;
          state.form.input = target.value;
          actions.validate(state, state.form.input);
        }
      }),
      h(
        "button",
        {
          type: "button",
          class: "button is-primary",
          style: "margin-left: 10px;",
          onclick: () => {
            if (actions.validate(state, state.form.input)) {
              actions.createTask(state, state.form.input);
            }
          }
        },
        "create"
      ),
      h(
        "p",
        {
          class: "notification",
          style: `display: ${state.form.hasError ? "display" : "none"}`
        },
        "3〜20文字で入力してください"
      )
    ),
    h(
      "ul",
      { class: "panel" },
      ...state.tasks.map((task, i) => {
        return h(
          "li",
          { class: "panel-block" },
          h(
            "button",
            {
              type: "button",
              class: "delete",
              style: "margin-right: 10px;",
              onclick: () => actions.removeTask(state, i)
            },
            "remove"
          ),
          task
        );
      })
    )
  );
};

new App<State, Actions>({ el: "#app", state, view, actions });
