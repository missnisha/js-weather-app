
//este modulo formateará diferentes tipos de información


//función utilitaria universal que servirá para las fechas del proyecto

const defaultDateOptions = {
    day: "numeric",
    weekday: "long",
    month: "long",
}

export function formatDate(date, options = defaultDateOptions) {
  return new Intl.DateTimeFormat("en", options).format(date);
}

//temperatura

export function formatTemp(value) {
    return `${Math.floor(value)}°`
}

