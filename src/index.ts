import { ActionTree } from './framework/action'
import { View, h } from './framework/view'
import { App } from './framework/controller'

/**
 * State: 状態管理
 */
type Task = string
type Form = {
  /** タスクのタイトル */
  title: string
  /** バリデーション結果 */
  hasError: boolean
}
type State = {
  /** タスク一覧 */
  tasks: Task[]
  /** フォームの状態 */
  form: Form
}
const state: State = {
  tasks: ['Learn about Virtual DOM', 'Write a document'],
  form: {
    title: '',
    hasError: false
  }
}

/**
 * Actions: 各種イベント処理
 */
interface Actions extends ActionTree<State> {
  /** タイトルの入力チェックを行う */
  validate: (state: State, title: string) => boolean
  /** 新しいタスクを作成する */
  createTask: (state: State, title: string) => void
  /** indexで指定したタスクを削除する */
  removeTask: (state: State, index: number) => void
}
const actions: Actions = {
  validate(state, title: string) {
    if (!title || title.length < 3 || title.length > 20) {
      state.form.hasError = true
    } else {
      state.form.hasError = false
    }

    return !state.form.hasError
  },

  createTask(state, title = '') {
    state.tasks.push(title)
    state.form.title = ''
  },

  removeTask(state, index: number) {
    state.tasks.splice(index, 1)
  }
}

/**
 * View: 描画関連
 */
const view: View<State, Actions> = (state, actions) => {
  // prettier-ignore
  return h(
    'div',
    {
      class: 'nes-container is-rounded',
      style: 'padding: 2rem;'
    },
    h(
      'h1',
      {
        class: 'title',
        style: 'margin-bottom: 2rem;'
      },
      h('i', { class: 'nes-icon heart is-medium' }),
      'Virtual DOM TODO App '
    ),
    h(
      'form',
      {
        class: 'nes-container',
        style: 'margin-bottom: 2rem;'
      },
      h(
        'div',
        {
          class: 'nes-field',
          style: 'margin-bottom: 1rem;',
        },
        h(
          'label',
          {
            class: 'label',
            for: 'task-title'
          },
          'Title'
        ),
        h('input', {
          type: 'text',
          id: 'task-title',
          class: 'nes-input',
          value: state.form.title,
          oninput: (ev: Event) => {
            const target = ev.target as HTMLInputElement
            state.form.title = target.value
            actions.validate(state, target.value)
          }
        }),
      ),
      h(
        'p',
        {
          class: 'nes-text is-error',
          style: `display: ${state.form.hasError ? 'display' : 'none'}`,
        },
        'Enter a value between 3 and 20 characters'
      ),
      h(
        'button',
        {
          type: 'button',
          class: 'nes-btn is-primary',
          onclick: () => {
            if (state.form.hasError) return
            actions.createTask(state, state.form.title)
          }
        },
        'Create'
      )
    ),
    h(
      'ul',
      { class: 'nes-list is-disc nes-container' },
      ...state.tasks.map((task, i) => {
        return h(
          'li',
          {
            class: 'item',
            style: 'margin-bottom: 1rem;'
          },
          task,
          h(
            'button',
            {
              type: 'button',
              class: 'nes-btn is-error',
              style: 'margin-left: 1rem;',
              onclick: () => actions.removeTask(state, i)
            },
            '×'
          )
        )
      })
    )
  )
}

new App<State, Actions>({
  el: '#app',
  state,
  view,
  actions
})
