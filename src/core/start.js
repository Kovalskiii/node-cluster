// ===== START SERVER =====//
const serverStart = app => {
  const PORT = Number(process.env.PORT) || 8000

  return app
    .listen(PORT, () => {
      console.log(`Listening on port ${PORT}. Worker Pid: ${process.pid}`)
    })
    .on('error', err => {
      console.log(err)
      process.exit()
    })
}

export default serverStart
