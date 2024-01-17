type calendarDay = {
    date: string | undefined,
    dayOfWeek: number,
    items: calendarDayItem[]
}
type calendarDayItem = {
    tooltip: string,
    text: string,
    begin: string,
    end: string
}
type workWeekDay = {
    dayOfWeek: number,
    begin: string,
    end: string
}

type doctor = {
    id: number,
    name: string,
    specialization: string,
    workWeekDays: workWeekDay[]
}
type appointment = {
    begin: string,
    createdDate: string,
    description: string,
    end: string,
    id: number,
    patientId: number,
    subject: string,
    workDayId: number
}

type workDay = {
    appointments: appointment[],
    begin: string,
    date: string,
    doctorId: number,
    end: string,
    id: number
}

function getWeeklySchedule(doctor: doctor): calendarDay[] {
    return doctor.workWeekDays.map(
        wwd => {
            const cd: calendarDay = {
                date: undefined,
                dayOfWeek: wwd.dayOfWeek,
                items: [
                    { tooltip: '', text: '', begin: wwd.begin, end: wwd.end }
                ]
            };
            return cd;
        }
    )
}
export {
    calendarDay, calendarDayItem, workWeekDay, doctor, getWeeklySchedule, workDay
}