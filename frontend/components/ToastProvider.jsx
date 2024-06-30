"use client"

import { SnackbarProvider } from "notistack";


const ToastProvider = (props) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >{props.children}</SnackbarProvider>
  )
}

export default ToastProvider