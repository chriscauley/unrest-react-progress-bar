import React from 'react'
import globalHook from 'use-global-hook'

const _global = {
  reset(onSuccess) {
    this.results = []
    this.onSuccess = onSuccess
  },
}

const initialState = {
  name: null,
  completed: null,
  total: null,
  start: null,
  ticks: null,
}

const actions = {
  display: (store, { name, promises, onSuccess = () => {} }) => {
    _global.reset(onSuccess)
    store.setState({
      name,
      completed: 0,
      total: promises.length,
      start: new Date().valueOf(),
      ticks: 0,
    })
    Promise.all(
      promises.map((promise) =>
        Promise.resolve(promise).then(store.actions.complete),
      ),
    ).then((results) => {
      clearTimeout(_global.timeout)
      _global.onSuccess(results)
      store.setState(initialState)
    })

    store.actions.tick()
  },
  tick: (store) => {
    clearTimeout(_global.timeout)
    if (store.state.completed < store.state.total) {
      _global.timeout = setTimeout(() => store.actions.tock(), 1000)
    }
  },
  tock: (store) => {
    store.setState({ ticks: store.state.ticks + 1 })
    store.actions.tick()
  },
  complete: (store, result) => {
    store.setState({ completed: store.state.completed + 1 })
    return result
  },
}

const makeHook = globalHook(React, {}, actions)

export default (Component) => {
  return function ProgressProvider(props) {
    const [state, actions] = makeHook()
    return <Component {...props} progress={{ ...state, actions }} />
  }
}