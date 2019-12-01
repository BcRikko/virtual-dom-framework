/** Nodeが取りうる3種の型 */
type NodeType = VNode | string | number
/** 属性の型 */
type AttributeType = string | EventListener
type Attributes = {
  [attr: string]: AttributeType
}

/**
 * 仮想DOMのひとつのオブジェクトを表す型
 */
export type VNode = {
  nodeName: keyof ElementTagNameMap
  attributes: Attributes
  children: NodeType[]
}

/**
 * Nodeを受け取り、VNodeなのかTextなのかを判定する
 */
const isVNode = (node: NodeType): node is VNode => {
  return typeof node !== 'string' && typeof node !== 'number'
}

/**
 * 受け取った属性がイベントかどうか判定する
 * @param attribute 属性
 */
const isEventAttr = (attribute: string): boolean => {
  // onからはじまる属性名はイベントとして扱う
  return /^on/.test(attribute)
}

/**
 * View層の型定義
 */
export interface View<State, Actions> {
  (state: State, actions: Actions): VNode
}

/**
 * 仮想DOMを作成する
 * @param nodeName Nodeの名前（HTMLのタグ名）
 * @param attributes Nodeの属性（width/heightやstyleなど）
 * @param children Nodeの子要素のリスト
 */
export function h(nodeName: VNode['nodeName'], attributes: VNode['attributes'], ...children: VNode['children']): VNode {
  return {
    nodeName,
    attributes,
    children
  }
}

/**
 * 属性を設定する
 * @param target 操作対象のElement
 * @param attributes Elementに追加したい属性のリスト
 */
const setAttributes = (target: HTMLElement, attributes: Attributes): void => {
  for (const attr in attributes) {
    if (isEventAttr(attr)) {
      // onclickなどはイベントリスナーに登録する
      // onclickやoninput、onchangeなどのonを除いたイベント名を取得する
      const eventName = attr.slice(2)
      target.addEventListener(eventName, attributes[attr] as EventListener)
    } else {
      // イベントリスナ−以外はそのまま属性に設定する
      target.setAttribute(attr, attributes[attr] as string)
    }
  }
}

/**
 * 属性を更新する
 * @param target 操作対象のElement
 * @param oldAttrs 古い属性
 * @param newAttrs 新しい属性
 */
const updateAttributes = (target: HTMLElement, oldAttrs: Attributes, newAttrs: Attributes): void => {
  // 処理をシンプルにするためoldAttrsを削除後、newAttrsで再設定する
  for (const attr in oldAttrs) {
    if (!isEventAttr(attr)) {
      target.removeAttribute(attr)
    }
  }

  for (const attr in newAttrs) {
    if (!isEventAttr(attr)) {
      target.setAttribute(attr, newAttrs[attr] as string)
    }
  }
}

/**
 * input要素のvalueを更新する
 * @param target 操作対象のinput要素
 * @param newValue inputのvalueに設定する値
 */
const updateValue = (target: HTMLInputElement, newValue: string): void => {
  target.value = newValue
}

/** 差分のタイプ */
enum ChangedType {
  /** 差分なし */
  None,
  /** NodeTypeが異なる */
  Type,
  /** テキストNodeが異なる */
  Text,
  /** 要素名が異なる */
  Node,
  /** value属性が異なる（input要素用） */
  Value,
  /** 属性が異なる */
  Attr
}
/**
 * 差分検知を行う
 * @param a
 * @param b
 */
const hasChanged = (a: NodeType, b: NodeType): ChangedType => {
  if (typeof a !== typeof b) {
    return ChangedType.Type
  }

  if (!isVNode(a) && a !== b) {
    return ChangedType.Text
  }

  if (isVNode(a) && isVNode(b)) {
    if (a.nodeName !== b.nodeName) {
      return ChangedType.Node
    }

    if (a.attributes.value !== b.attributes.value) {
      return ChangedType.Value
    }

    if (JSON.stringify(a.attributes) !== JSON.stringify(b.attributes)) {
      // 本来ならオブジェクトひとつひとつを比較すべきなのですが、シンプルな実装にするためにJSON.stringifyを使っています
      // JSON.stringifyを使ったオブジェクトの比較は罠が多いので、できるだけ使わないほうが良いです
      return ChangedType.Attr
    }
  }

  return ChangedType.None
}

/**
 * リアルDOMを作成する
 * @param node 作成するNode
 */
export function createElement(node: NodeType): HTMLElement | Text {
  if (!isVNode(node)) {
    return document.createTextNode(node.toString())
  }

  const el = document.createElement(node.nodeName)
  setAttributes(el, node.attributes)
  node.children.forEach(child => el.appendChild(createElement(child)))

  return el
}

/**
 * 仮想DOMの差分を検知し、リアルDOMに反映する
 * @param parent 親要素
 * @param oldNode 古いNode情報
 * @param newNode 新しいNode情報
 * @param index 子要素の順番
 */
export function updateElement(parent: HTMLElement, oldNode: NodeType, newNode: NodeType, index = 0): void {
  // oldNodeがない場合は新しいNodeを作成する
  if (!oldNode) {
    parent.appendChild(createElement(newNode))
    return
  }

  // newNodeがない場合は削除されたと判断し、そのNodeを削除する
  const target = parent.childNodes[index]
  if (!newNode) {
    parent.removeChild(target)
    return
  }

  // 差分検知し、パッチ処理（変更箇所だけ反映）を行う
  const changeType = hasChanged(oldNode, newNode)
  switch (changeType) {
    case ChangedType.Type:
    case ChangedType.Text:
    case ChangedType.Node:
      parent.replaceChild(createElement(newNode), target)
      return
    case ChangedType.Value:
      updateValue(target as HTMLInputElement, (newNode as VNode).attributes.value as string)
      return
    case ChangedType.Attr:
      updateAttributes(target as HTMLInputElement, (oldNode as VNode).attributes, (newNode as VNode).attributes)
      return
  }

  // 子要素の差分検知・リアルDOM反映を再帰的に実行する
  if (isVNode(oldNode) && isVNode(newNode)) {
    for (let i = 0; i < newNode.children.length || i < oldNode.children.length; i++) {
      updateElement(target as HTMLElement, oldNode.children[i], newNode.children[i], i)
    }
  }
}
