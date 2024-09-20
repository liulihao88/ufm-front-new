const octAlert = (type, text, className) => {
  if (type == 'open') {
    window.parent.postMessage(
      {
        message: { type: 'open', text: text, class: className },
      },
      '*',
    )
  } else if (type == 'close') {
    window.parent.postMessage(
      {
        message: { type: 'close', text: text, class: className },
      },
      '*',
    )
  } else if (type == 'message') {
    window.parent.postMessage(
      {
        message: { type: 'message', text: text },
      },
      '*',
    )
  }
}

export { octAlert }
