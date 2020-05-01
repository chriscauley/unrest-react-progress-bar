import React from 'react'

import connect from './connect'

const Bar = connect((props) => {
  const { completed, total, name, start } = props.progress
  if (!total) {
    return null
  }
  const elapsed = new Date().valueOf() - start
  const style = { width: 100 * (completed / total) + '%' }
  const css = {
    frame: 'fixed bottom-0 left-0 w-full',
    wrapper: 'container mx-auto relative',
    text: 'py-2 px-4 z-10 relative flex justify-between',
    bar: 'rounded border h-full w-full bg-gray-400 absolute top-0 z-0',
    done: 'left-0 h-full bg-green-400',
    ...props.css,
  }

  return (
    <div className={css.frame}>
      <div className={css.wrapper}>
        <div className={css.text}>
          <span className={css.name}>{name}</span>
          <span className={css.progress}>
            {completed} / {total}
          </span>
          <span className={css.elapsed}>{parseInt(elapsed / 1000)}s</span>
        </div>
        <div className={css.bar}>
          <div className={css.done} style={style} />
        </div>
      </div>
    </div>
  )
})

export default {
  Bar,
  connect,
}
