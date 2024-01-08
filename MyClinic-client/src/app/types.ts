type calendarDay = {
    dayOfWeek: string,
    items: calendarDayItem[]
}
type calendarDayItem = {
    begin: string,
    end: string
}
type workWeekDay = {
    dayOfWeek: string,
    begin: string,
    end: string
}

type doctor = {
    id: number,
    name: string,
    specialization: string,
    workWeekDays: workWeekDay[]
}
function getWeeklySchedule(doctor: doctor): calendarDay[] {
    return doctor.workWeekDays.map(
        wwd => {
            const cd: calendarDay = {
                dayOfWeek: wwd.dayOfWeek,
                items: [
                    { begin: wwd.begin, end: wwd.end }
                ]
            };
            return cd;
        }
    )
}
export {
    calendarDay, calendarDayItem, workWeekDay, doctor, getWeeklySchedule
}