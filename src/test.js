import React from 'react'
import connect from './connect'

const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(seconds + 'resolved')
    }, seconds * 1000)
  })
}

const Test = connect((props) => {
  const { display } = props.progress.actions
  const click = () =>
    display({
      name: 'Bees!!!!',
      promises: [3, 2, 3, 4, 3, 5, 1, 100].map(wait),
      onSuccess: (results) => console.log(results), // eslint-disable-line
    })
  return <button onClick={click}>Do it!</button>
})

export default {
  Test,
}
