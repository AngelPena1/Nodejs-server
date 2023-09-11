function firstFormatDate(currentDate) {
  const date = new Date(currentDate);
  const month =
    date.getUTCMonth() + 1 > 9
      ? `${date.getUTCMonth() + 1}`
      : `0${date.getUTCMonth() + 1}`;
  const day =
    date.getUTCDate() > 9 ? `${date.getUTCDate()}` : `0${date.getUTCDate()}`;
  return `${date.getFullYear()}-${month}-${day}T00:00:00.000Z`;
}

function secondFormatDate(currentDate) {
  const date = new Date(currentDate);
  const month =
    date.getUTCMonth() + 1 > 9
      ? `${date.getUTCMonth() + 1}`
      : `0${date.getUTCMonth() + 1}`;
  const day =
    date.getUTCDate() > 9 ? `${date.getUTCDate()}` : `0${date.getUTCDate()}`;
  return `${date.getFullYear()}-${month}-${day}T23:59:59.999Z`;
}

module.exports = { firstFormatDate, secondFormatDate };
