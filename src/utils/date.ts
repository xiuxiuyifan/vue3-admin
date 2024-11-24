import dayjs from "dayjs"

export const formatTime = (str: string) =>
  dayjs(str).format("YYYY-MM-DD HH:mm:ss")
