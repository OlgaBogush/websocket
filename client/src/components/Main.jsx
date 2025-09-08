import React, { useState } from "react"
import { Link } from "react-router-dom"

import styles from "../styles/Main.module.css"

const Main = () => {
  const [values, setValues] = useState({ name: "", room: "" })

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((item) => !item)
    if (isDisabled) e.preventDefault()
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>
        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="Username"
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              name="room"
              value={values.room}
              placeholder="Room"
              className={styles.input}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <Link className={styles.group} onClick={handleClick} to={`/chat?name=${values.name}&room=${values.room}`}>
            <button type="submit" className={styles.button}>
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Main
