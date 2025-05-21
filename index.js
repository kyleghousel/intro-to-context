const createEmployeeRecord = (array) => {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (array) => {
  const employeeRecords = []

  array.forEach(employee => employeeRecords.push(createEmployeeRecord(employee)))

  return employeeRecords
}

const createTimeInEvent = (employeeRecord, dateStamp) => {

  const stamp = {
    type: "TimeIn",
    hour: Number(dateStamp.slice(11,15)),
    date: dateStamp.slice(0, 10)
  }

  employeeRecord.timeInEvents.push(stamp)

  return employeeRecord
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {

  const stamp = {
    type: "TimeOut",
    hour: Number(dateStamp.slice(11,15)),
    date: dateStamp.slice(0, 10)
  }

  employeeRecord.timeOutEvents.push(stamp)

  return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, formDate) => {
  const timeIn = employeeRecord.timeInEvents.find(e => e.date === formDate)
  const timeOut = employeeRecord.timeOutEvents.find(e => e.date === formDate)

  return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = (employeeRecord, formDate) => {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, formDate)

  return hoursWorked * employeeRecord.payPerHour
}

const allWagesFor = (employeeRecord) => {

  const daysWorked = employeeRecord.timeOutEvents.map(event => event.date)

  const payOwed = daysWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date)
  }, 0)

  return payOwed
}

const calculatePayroll = (employeeRecords) => {
  const totalPayOwed = employeeRecords.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord)
  }, 0)

  return totalPayOwed
}
